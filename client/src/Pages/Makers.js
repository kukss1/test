import { useState, useEffect } from "react";
import { getAllMakers } from "../services/productData";
import ProductCard from "../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

const Makers = ({ match }) => {
  const currentMake = match.params.make;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [made, setMade] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [currentMake, page, searchQuery, made, description, year, title]);

  const fetchData = async () => {
    try {
      const res = await getAllMakers(
        page,
        searchQuery,
        made,
        description,
        year,
        title,
        currentMake
      );
      setProducts((prevProducts) => [...prevProducts, ...res.products]);
      setLoading(false);
      setPage((prevPage) => (res.products.length > 0 ? prevPage + 1 : prevPage));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMadeChange = (event) => {
    setMade(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setProducts([]);
    setPage(1);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Введите ключевые слова для поиска..."
        />
        <input
          type="text"
          value={made}
          onChange={handleMadeChange}
          placeholder="Введите производителя..."
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Введите описание..."
        />
        <input
          type="text"
          value={year}
          onChange={handleYearChange}
          placeholder="Введите год..."
        />
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Введите название..."
        />
        <button type="submit">Найти</button>
      </form>
      <Link to="/makers/all">Show all</Link>
      {products.map((x) => (
        <div className="product_card_container" key={x._id.toString()}>
          <ProductCard params={x} />
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Makers;
