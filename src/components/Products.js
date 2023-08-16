import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Products = () => {
  const [products, SetProducts] = useState([]);

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

  console.log(products);
  return (
    <>
      <body id="productsBody">
        {products.map((product) => (
          <div className="row">
            <div id="productsContainer" key={product.id}>
              <div className="productCard">{product.title}</div>
              <div className="productCard">{product.imageurl}</div>
              <div className="productCard">${product.price}</div>
              <div className="cardButtonSection">
                <button className="cardButtons" id="detailsButton">
                  <Link className="cardButtons" to="/viewPost">
                    See Details
                  </Link>
                </button>
                <button className="cardButtons" id="cartButton">
                  <Link className="cardButtons" to="/">
                    Add to Cart
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </body>
    </>
  );
};

export default Products;
