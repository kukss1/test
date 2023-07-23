import { Link } from 'react-router-dom';
import Moment from 'react-moment';

function ProductCard({ params }) {
  return (
   <div className="home_product_card_wrapper">
      <Link to={`/categories/${params.category}/${params._id}/details`}>
      <div className='home_product_card_body'>
        <img className="card_img_top" src={params.image} alt={params.title} />
        <div className="product_card_body">
          <h5 className="card-title">{params.title}</h5>
          <p>{params.make}</p>
          <p>{params.model}</p>
          <p>{params.year}</p>
          <p className="card_price">{(params.price).toFixed(2)}֏</p>
          
        </div>
        </div>
      </Link>
      <div className="card_footer">
        <small className="text-muted">
          <Moment format="D MMM YYYY (dddd) HH:mm">
            {params.addedAt}
          </Moment>
          - <strong>{params.city}</strong>
        </small>
        <Link to={`/categories/${params.category}/${params._id}/details`}>Ավելին</Link>
      </div>
    </div>
  );
}

export default ProductCard;
