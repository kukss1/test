import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoriesNav from "../components/Categories/CategoriesNav";
import ProductCard from "../components/ProductCard/ProductCard";
import { getAll } from "../services/productData";
import {
  BiSortDown,
  BiSort,
  BiDownArrowAlt,
  BiUpArrowAlt,
  BiSortUp,
} from "react-icons/bi";
import "../components/Siders/SearchSider.css";
import "../components/Categories/Categories.css";
import "../components/ProductCard/ProductCard.css";


function Categories({ match }) {
  let currentCategory = match.params.category;
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("oldest");



  useEffect(() => {
    setPage(1);
    setLoading(true);
    setQuery("");
    getAll(1, currentCategory,"")
      .then((res) => {
        setProduct(res.products);
        setLoading(false);
        setPage((page) => page + 1);
        setQuery("");
      })
      .catch((err) => console.log(err));
  }, [currentCategory, setProduct]);
  
  useEffect(() => {
    setPage(1);
    setLoading(true);
    getAll(2, currentCategory, query)
      .then((res) => {
        if (query === "") {
          setProduct((products) => [...products, ...res.products]);
        } else {
          setProduct(res.products);
        }
        setLoading(false);
        setPage((page) => page + 1);
      })
      .catch((err) => console.log(err));
  }, [query, currentCategory]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  return (
    <>
      <div className="search_Wrapper">
        <input
          className="col-lg-6"
          type="text"
          placeholder="Search..."
          name="search"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div className="categories_header">
        <CategoriesNav />
      </div>
      <div className="categories_wrapper">
        <div className="dropdown-sort">
          <h2 className="sort">
            Sort <BiSort />
          </h2>
          <div className="categories_btn_wrapper">
            <button
              onClick={() => {
                setSort("oldest");
              }}
            >
              Հին <BiDownArrowAlt />
            </button>
            <button
              onClick={() => {
                setSort("newest");
              }}
            >
              Նոր <BiUpArrowAlt />
            </button>
            <button
              onClick={() => {
                setSort("lowerPrice");
              }}
            >
              Գին <BiSortDown />
            </button>
            <button
              onClick={() => {
                setSort("biggerPrice");
              }}
            >
              Գին <BiSortUp />{" "}
            </button>
          </div>
        </div>
        {!loading ? (
          <InfiniteScroll
  dataLength={products.length}
  next={() => {
    if (query === "") {
      getAll(page, currentCategory).then((res) => {
        if (res.products.length > 0) { // Добавлено условие проверки наличия новых товаров
          setProduct([...products, ...res.products]);
          setPage(page + 1);
        }
      });
    }
  }}
  hasMore={products.length > 0} // Используется условие наличия товаров для hasMore
  className="row"
>
            {products
              .sort((a, b) => {
                if (sort === "oldest") {
                  return a.addedAt.localeCompare(b.addedAt);
                }
                if (sort === "newest") {
                  return b.addedAt.localeCompare(a.addedAt);
                }
                if (sort === "lowerPrice") {
                  return b.price - a.price;
                }
                if (sort === "biggerPrice") {
                  return a.price - b.price;
                }
              })
              .map((x) => (
                <div className="product_card_container" key={x._id.toString()}>
                  <ProductCard params={x} />
                </div>
              ))}
          </InfiniteScroll>
        ) : (
          <div className="spinner">
            <h5>Animation</h5>
          </div>
        )}
      </div>
    </>
  );
}

export default Categories;
