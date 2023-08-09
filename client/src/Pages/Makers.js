import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";
import { getAllMakers } from "../services/productData";
import "../components/Makers/Makers.css";

const Makers = ({ match }) => {
  let currentCategory = match.params.category;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchMakes();
  }, []);

  const fetchMakes = async () => {
    try {
      const response = await axios.get(
        "https://64b3d9690efb99d8626870f6.mockapi.io/CarData"
      );
      const uniqueMakes = [...new Set(response.data.map((car) => car.make))];
      setMakes(uniqueMakes);
    } catch (error) {
      console.error("Error fetching makes: ", error);
    }
  };

  const fetchModelsForMake = async (selectedMake) => {
    try {
      const response = await axios.get(
        "https://64b3d9690efb99d8626870f6.mockapi.io/CarData"
      );
      const makeData = response.data.find((car) => car.make === selectedMake);
      if (makeData) {
        setModels(makeData.model);
      } else {
        setModels([]);
      }
    } catch (error) {
      console.error("Error fetching models for make: ", error);
    }
  };

  const handleMakeChange = (event) => {
    const selectedMake = event.target.value;
    setSelectedMake(selectedMake);
    setSelectedModel("");
    fetchModelsForMake(selectedMake);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMadeChange = (event) => {
    setSelectedModel(event.target.value);
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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    console.log("Selected Category:", event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setProducts([]);
    setPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const res = await getAllMakers(
          page,
          searchQuery,
          selectedMake,
          selectedModel,
          currentCategory,
          year.toString(),
          title
        );
        setProducts((prevProducts) => [...prevProducts, ...res.products]);
        setLoading(false);
        setPage((prevPage) =>
          res.products.length > 0 ? prevPage + 1 : prevPage
        );
        
      } catch (err) {
        console.log(err);
      }
    };
  
    setLoading(true);
    fetchData();
  }, [currentCategory, page, searchQuery, selectedMake, selectedModel, year, title]);



  return (
    <div>
    <h1 className="makers_header">Գտնել ըստ մոդելի</h1>
      <form onSubmit={handleSearchSubmit} className="makers_form_wrapper">
              <select value={selectedMake} onChange={handleMakeChange}>
          <option value="">Արտադրող ընկերություն</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
        <select
          value={selectedModel}
          onChange={handleMadeChange}
          disabled={!selectedMake || models.length === 0}
        >
          <option value="">Մոդել</option>
          {models.map((made) => (
            <option key={made} value={made}>
              {made}
            </option>
          ))}
        </select>
               <select value={category} onChange={handleCategoryChange}>
          <option>Կատեգորիա</option>
          <option>Թափք</option>
          <option>Ընթացքաին մաս</option>
          <option>Շարժիչ</option>
          <option>Փոխ․Տուփ</option>
          <option>Էլեկտրոնիկա</option>
          <option>Ինտերիեր</option>
          <option>Աքսեսուարներ</option>
        </select>
                <input
          type="number"
          value={year}
          onChange={handleYearChange}
          placeholder="Введите год..."
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Введите ключевые слова для поиска..."
        />

        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Введите описание..."
        />

 
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Введите название..."
        />
        <button type="submit">Գտնել</button>

      </form>
      <div className="makers_link">
        <a href="/makers/all">Տեսնել բոլոր հայտարարությունները</a>
      </div>
      
      <div className="makers_card">
         {products.map((x) => (
        <div className="product_card_container" key={x._id.toString()}>
          <ProductCard params={x} />
        </div>
      ))}
      {loading && <div>Loading...</div>}
      </div>
     
    </div>
  );
};

export default Makers;
