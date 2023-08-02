import { useState, useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { wishProduct } from "../../../services/productData";

function ProductInfo({ params }) {
  const [wish, setWish] = useState(false);

  useEffect(() => {
    setWish(params.isWished);
  }, [params.isWished]);

  const onHeartClick = () => {
    if (!wish) {
      wishProduct(params._id)
        .then((res) => {
          setWish(true);
        })
        .catch((err) => console.log(err));
    } else {
      wishProduct(params._id)
        .then((res) => {
          setWish(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <img className="product_card_img" src={params.image} alt="Product" />
      <div className="like_header">
        <h1 className="product_card_header">{params.title}</h1>
        <span id="heartIconDetails" onClick={onHeartClick}>
          {params.isAuth && (
            <>
              {!wish ? (
                <button className="heart_icon">
                  <BsHeart />
                </button>
              ) : (
                <button className="heart_icon">
                  <BsHeartFill />
                </button>
              )}
            </>
          )}
        </span>
      </div>
      <div id="detailsCardText" className="details_description">
        {/* <div className="tab">
                    <button className="product_card_details_btn">Details</button>
                    <button className="tablinks">About Seller</button>
                </div> */}
        <div className="tab_content">
          <div className="tab_content_item">
            <span className="tab_content_body">
              <p>{params.description}</p>
            </span>

            <p className="text_muted">Product listed at {params.addedAt}</p>
          </div>
          {/* <div id="aboutSeller" className="tabcontent-item">
                        <p>Name: {params.name || "Not specified"}</p>
                        <p>Email: {params.email}</p>
                        <p>Telephone: {params.phone}</p>
                        <p>City: {params.city}</p>
                    </div> */}
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
