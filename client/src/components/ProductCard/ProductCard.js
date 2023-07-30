import { Link } from "react-router-dom";


function ProductCard({ params }) {
  return (
    <div className="home_product_card_wrapper">
      <Link to={`/categories/${params.category}/${params._id}/details`}>
              <div>
            <img className="card_img_top" src={params.image} alt={params.title} />
        </div>
      </Link>
      <div className="product_card_middle">
        <div className="home_product_card_body">
          <div className="product_card_body">
            <h5 className="card-title">{params.title}</h5>
            <div className="params_wrapper">
              <p>Արտադրող։ {params.make}</p>
              <p>Մոդել։ {params.model}</p>
              <p>Տարեթիվ։ {params.year}</p>
            </div>

            
          </div>
        </div>
      
      <div className="card_footer">
      <p className="card_price">{params.price.toFixed(2)}֏</p>
        <Link to={`/categories/${params.category}/${params._id}/details`}>
          Ավելին
        </Link>
      </div>
</div>
    </div>
  );
}

export default ProductCard;
