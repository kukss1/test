import React, { useState, useEffect } from "react";
import { getAllMakers } from "../services/productData";
import ProductCard from "../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

const Makers = ({ match }) => {
  let currentMake = match.params.make;
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage(1);
    setLoading(true);
    getAllMakers(1, currentMake, "")
      .then((res) => {
        setProduct(res.products);
        setLoading(false);
        setPage((page) => page + 1);
      })
      .catch((err) => console.log(err));
  }, [currentMake, setProduct]);

  useEffect(() => {
    if (loading) {
      return;
    }
    getAllMakers(2, currentMake, "")
      .then((res) => {
        setProduct((products) => [...products, ...res.products]);
      })
      .catch((err) => console.log(err));
  }, [loading, currentMake]);

  return (
    <div>
      <Link to="/makers/BMW">BMW</Link>
      <Link to="/makers/Audi">Audi</Link>
      <Link to="/makers/Audi">Audi</Link>
      {products.map((x) => (
        <div className="product_card_container" key={x._id.toString()}>
          <ProductCard params={x} />
        </div>
      ))}
    </div>
  );
};

export default Makers;