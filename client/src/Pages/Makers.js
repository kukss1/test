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
    const fetchData = async () => {
      try {
        const res = await getAllMakers(page, currentMake, "");
        setProducts((prevProducts) => [...prevProducts, ...res.products]);
        setLoading(false);
        setPage((prevPage) => (res.products.length > 0 ? prevPage + 1 : prevPage));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentMake, page]);
  
  return (
    <div>
      <Link to="/makers/BMW">BMW</Link>
      {products.map((x) => (
        <div className="product_card_container" key={x._id.toString()}>
          <ProductCard params={x} />
        </div>
      ))}
      {loading && <div>Loading...</div>} {/* Отображаем индикатор загрузки, пока идет запрос */}
    </div>
  );
};

export default Makers;
