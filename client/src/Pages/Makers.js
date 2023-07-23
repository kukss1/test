import { useState, useEffect } from "react";
import { getAllMakers } from "../services/productData";
import ProductCard from "../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

const Makers = ({ match }) => {
  const currentMake = match.params.make;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllMakers(page, currentMake, "")
      .then((res) => {
        setProducts(res.products);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentMake, page]);

  return (
    <div>
      <Link to="/makers/BMW">BMW</Link>
      {products.map((x) => (
        <div className="product_card_container" key={x._id.toString()}>
          <ProductCard params={x} />
        </div>
      ))}
    </div>
  );
};

export default Makers;
