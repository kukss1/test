import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { getUserActiveSells } from '../../../services/userData';

import './Sells.css';

function ActiveSells({ params, history }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params._id) {
      getUserActiveSells(params._id)
        .then(res => {
          setProducts(res.sells);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [params._id]);

  return (
    <>
      {!loading ? (
        <>
          <h1 className="heading">Active Sells</h1>
          {products ? (
            <div className="row">
              {products.map(x => (
                <div className="col-xs-12 col-md-6 col-lg-4" key={x._id.toString()}>
                  <ProductCard params={x} />
                </div>
              ))}
            </div>
          ) : (
            <p className="nothing-to-show">Nothing to show</p>
          )}
        </>
      ) : (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
}

export default ActiveSells;
