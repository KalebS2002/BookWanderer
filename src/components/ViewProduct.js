import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
//pass currentProduct through this function as prop



import { addToCart } from "./Cart";

const ViewProduct = ({ currentProduct }) => {
  console.log("single view has", currentProduct);
  const stockImg = currentProduct.imageurl;
  console.log(stockImg);
  return (
    <>
      <button>
        <Link to="/products">Return</Link>
      </button>
      <div>Title:{currentProduct.title}</div>
      <div>Author:{currentProduct.author}</div>
      <img src={stockImg} alt={currentProduct.title} />
      <div>Price: ${currentProduct.price}</div>
      <div>Format: {currentProduct.format}</div>
      <div>Qty Available: {currentProduct.qtyavailable}</div>
      <div>Overview: {currentProduct.overview}</div>
      {/* use ternery op ex: if isLoggedIn = true return Cart.js else return Login.js */}

      <button id='AddToCart' onClick={(e) => (addToCart(currentProduct))}>Add to Cart</button>
    </>
  );
};

export default ViewProduct;
