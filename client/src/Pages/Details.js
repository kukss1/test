import { useEffect, useState } from 'react';
import {  Spinner } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import Breadcrumb from '../components/Details/Breadcrumb'
import ProductInfo from '../components/Details/ProductInfo/ProductInfo';
import Aside from '../components/Details/Aside/Aside';
import { getSpecific } from '../services/productData'

import '../components/Details/ProductInfo/ProductInfo.css';
import '../components/Details/Aside/Aside.css';

function Details({ match, history }) {
    let productId = match.params.id;
    let [product, setProduct] = useState([])
    let [loading, setLoading] = useState(true);
   
    useEffect(() => {
        window.scrollTo(0, 0)
        getSpecific(productId)
            .then(res => setProduct(res), setLoading(false))
            .catch(err => console.log(err));
            
    }, [productId, setProduct, setLoading])
    
    return (
        <>
            <SimpleSider />
            <div className="product_card_wrapper">
                {!loading ? (
                    <>
                    <Breadcrumb params={product} />
                    <div className='details_products_wrapper'>
                        <div className="details_product">
                            <ProductInfo params={product} />
                        </div>
                        <div>
                            <Aside params={product} history={history} />
                        </div>
                    </div></>) : (<Spinner animation="border" />)}
            </div>
        </>
    )
}

export default Details;