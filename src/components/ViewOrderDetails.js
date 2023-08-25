import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../style/ViewOrderDetails.css";

const ViewOrderDetails = ({ purchasedOrder }) => {
  console.log("single view has", purchasedOrder);

  return (
    <>
      <button>
        <Link to="/orderhistory">Return to OrderHistory</Link>
      </button>
      {purchasedOrder.orderdetails.map((orderDetail) => (
        <div id="orderDetailBox" key={orderDetail.productid}>
          <div>Title: {orderDetail.title}</div>
          <div>Author: {orderDetail.author}</div>
          <div>ItemPrice: ${orderDetail.itemprice}</div>
          <div>Quantity: {orderDetail.quantity}</div>
        </div>
      ))}
    </>
  );
};

export default ViewOrderDetails;
