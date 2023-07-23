import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { getUserWishlist } from '../../../services/userData';

function Wishlist() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserWishlist()
            .then(res => {
                setProducts(res.wishlist.filter(x => x.active === true));
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [setProducts ,setLoading]); // Add an empty dependency array here

    return (
        <>
            {!loading ? (
                <>
                    <h1 className="heading">Wishlist</h1>
                    {products.length > 0 ? (
                        <div className="row">
                            {products.map((product) => (
                                <div className="col-lg-4 col-md-6" key={product._id.toString()}>
                                    <ProductCard params={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="nothing-to-show">Nothing to show</p>
                    )}
                </>
            ) : (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </>
    );
}

export default Wishlist;
