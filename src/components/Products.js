import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      console.log("attempting to fectch products....");
      try {
        const response = await fetch(`http://localhost:3000/api/products`);
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
        {/* <p>this is the products page</p> */}
        {products.map((product) => (
          <div className="row">
            <div id="productsContainer" key={product.id}>
              <div className="productCard">{product.title}</div>
              <div className="productCard"> {product.imageurl}</div>
              <div className="productCard">${product.price}</div>
              <div className="cardButtonSection">
                <button className="cardButtons" id="detailsButton">
                  See Details
                </button>
                <button className="cardButtons" id="cartButton">
                  Add to Cart
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
