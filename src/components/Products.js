import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Products = ({ currentProduct, setCurrentProduct }) => {
  const [products, SetProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      console.log("attempting to fectch products....");
      try {
        const response = await fetch(`http://localhost:4000/api/products`);
        const result = await response.json();
        const productData = result.products;
        // console.log(result);
        SetProducts(productData);
      } catch (error) {
        console.error("failed to fetch products");
      }
    }
    fetchProducts();
  }, []);

  async function addItemToCart(product) {
    console.log(product);
    try {
      const response = await fetch(`api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: 1,
          userid: sessionStorage.getItem("BWUSERID"),
          productid: product.id,
          quantity: 1,
          itemprice: product.price,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(`An error occured when adding item to cart.`);
    }
  }

  return (
    <>
      <label htmlFor="searchInput" id="searchLabel">
        Search
      </label>
      <input
        placeholder="search..."
        type="search"
        id="searchInput"
        onChange={(e) => setQuery(e.target.value)}
      ></input>

      <div id="productsBody">
        {products
          .filter((product) => product.title.startsWith(query))
          .map((product) => (
            <div className="row" key={product.id}>
              <div id="productsContainer" key={product.id}>
                <div className="productCard">{product.title}</div>
                <div className="productCard">{product.format}</div>
                <div id="imgSection">
                  <img
                    id="productImg"
                    src={product.imageurl}
                    alt={product.title}
                  />
                </div>
                <div className="productCard">${product.price}</div>
                <div className="cardButtonSection">
                  <button
                    className="cardButtons"
                    id="detailsButton"
                    onClick={() => {
                      setCurrentProduct(product);
                    }}
                  >
                    <Link className="cardButtons" to="/viewProduct">
                      See Details
                    </Link>
                  </button>
                  <button
                    className="cardButtons"
                    id="cartButton"
                    onClick={addItemToCart}
                  >
                    <Link className="cardButtons" to="/">
                      Add to Cart
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Products;
