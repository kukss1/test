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
    getAll(1, currentCategory, "")
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

  return (
    <>
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
              className="categories_btn"
              onClick={() => {
                setSort("oldest");
              }}
            >
              Հին <BiDownArrowAlt />
            </button>
            <button
              className="categories_btn"
              onClick={() => {
                setSort("newest");
              }}
            >
              Նոր <BiUpArrowAlt />
            </button>
            <button
              className="categories_btn"
              onClick={() => {
                setSort("lowerPrice");
              }}
            >
              Գին <BiSortDown />
            </button>
            <button
              className="categories_btn"
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
                  if (res.products.length > 0) {
                    // Добавлено условие проверки наличия новых товаров
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
                switch (sort) {
                  case "oldest":
                    return a.addedAt.localeCompare(b.addedAt);
                  case "newest":
                    return b.addedAt.localeCompare(a.addedAt);
                  case "lowerPrice":
                    return b.price - a.price;
                  case "biggerPrice":
                    return a.price - b.price;
                  default:
                    return 0;
                }
              })
              .map((product) => (
                <div
                  className="product_card_container"
                  key={product._id.toString()}
                >
                  <ProductCard params={product} />
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
