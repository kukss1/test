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
                    <h1 className="heading">Նախնտրած</h1>
                    {products.length > 0 ? (
                        <div className="profile_sells">
                            {products.map((product) => (
                                <div className="profile_sells_items" key={product._id.toString()}>
                                    <ProductCard params={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="nothing-to-show">Ապրանքներ առկա չեն</p>
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
