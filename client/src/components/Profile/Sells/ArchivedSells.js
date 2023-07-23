import { useEffect, useState } from 'react';
import DisabledCard from '../../DisabledProductCard/DisabledCard';
import { getUserArchivedSells } from '../../../services/userData';

import './Sells.css';
import '../../DisabledProductCard/DisabledCard.css';

function ArchivedSells({ history }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserArchivedSells()
      .then(res => {
        setProducts(res.sells);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <h1 className="heading">Archive</h1>
          {products ? (
            <div className="row">
              {products
                .filter(x => x.active === false)
                .map(x => (
                  <div className="col-xs-12 col-md-6 col-lg-4" key={x._id.toString()}>
                    <DisabledCard params={x} history={history} />
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

export default ArchivedSells;
