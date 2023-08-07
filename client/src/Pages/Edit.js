import { useState, useEffect } from 'react';
import SimpleSider from '../components/Siders/SimpleSider';
import { getSpecific, editProduct } from '../services/productData';

import '../components/Edit/Edit.css'

function Edit({ match, history }) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const productId = match.params.id;

    useEffect(() => {
        window.scrollTo(0, 0);
        getSpecific(productId)
            .then(res => setProduct(res))
            .catch(err => console.log(err));
    }, [productId])

    const onChangeHandler = (e) => {
        e.preventDefault();
        setProduct({ ...product, [e.target.name]: e.target.value });
        if (e.target.files) {
            setProduct({ ...product, image: e.target.files[0] })
        }
    }

    const onSubmitHandler = (e) => {
        //TODO: Rewrite this 
        e.preventDefault();
        let { _id, title, price, description, city, category, image } = product;
        let obj = { title, price, description, city, category }
        setLoading(true);
        if (typeof image == 'object') {
            getBase64(image)
                .then((data) => {
                    obj['image'] = data;
                    editProduct(_id, obj)
                        .then(res => {
                            if (!res.error) {
                                history.push(`/categories/${category}/${_id}/details`)
                            } else {
                                setLoading(false);
                                setError(res.error);
                                setAlertShow(true);
                            }
                        })
                        .catch(err => console.error('edit product err: ', err))
                })
                .catch(err => console.log('base64 error: ', err));
        } else {
            editProduct(_id, obj)
                .then(res => {
                    if (!res.error) {
                        history.push(`/categories/${category}/${_id}/details`)
                    } else {
                        setLoading(false);
                        setError(res.error);
                        setAlertShow(true);
                    }
                })
                .catch(err => console.error('edit product err: ', err))
        }
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <>
            <SimpleSider />
            <div className='container'>
                <h1 className="heading">Փոփոխել</h1>
                <form className='edit_form' onSubmit={onSubmitHandler}>
                    {alertShow &&
                        <div onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </div>
                    }
                    <div>
                        <div className='edit_items'>
                            <label>Անվանում</label>
                            <input type="text" placeholder="Enter title" name="title" value={product.title} onChange={onChangeHandler} required />
                        </div>

                        <div className='edit_items'>
                            <label>Գին</label>
                            <input type="number" step="0.01" placeholder="Price" name="price" value={product.price} onChange={onChangeHandler} required />
                        </div>
                    </div>

                    <div className='edit_items_body'>
                        <label>Նկարագրություն</label>
                        <textarea name="description" defaultValue={product.description} onChange={onChangeHandler} required />
                    </div>

                    <div>
                        <div className='edit_items'>
                            <label>Քաղաք</label>
                            <input name="city" placeholder="Երեւան" value={product.city} onChange={onChangeHandler} required />
                        </div>

                        <div className='edit_items'>
                            <label>Կատեգորիա</label>
                            <select as="select" value={product.category} name="category" onChange={onChangeHandler} required >
                                <option>Ընտրել...</option>
                                <option>Թափք</option>
                                <option>Ընթացքաին Մաս</option>
                                <option>Շարժիչ</option>
                                <option>Փոխ․Տուփ</option>
                                <option>Էլեկտրոնիկա</option>
                                <option>Ինտերիեր</option>
                                <option>Աքսեսուարներ</option>
                            </select>
                        </div>

                        <div className='edit_items'>
                            <label>Նկար</label>
                            <input name="image" type="file" onChange={onChangeHandler} />
                        </div>
                    </div>
                    {loading ?
                        <button className="edit_add_btn"  disabled >
                            Please wait...
                        </button>
                        :
                        <button className="edit_add_btn" type="submit">Ավելացնել</button>
                    }
                </form>
            </div>
        </>
    )
}

export default Edit;