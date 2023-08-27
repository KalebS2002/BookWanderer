import React from "react";
import { Link } from "react-router-dom";
import "../style/Products.css";
import "../style/ViewOrderDetails.css";

const ViewOrderDetails = ({ purchasedOrder }) => {
  console.log("single view has", purchasedOrder);

  return (
    <>
      <section id="orderHeader">
        <button>
          <Link to="/orderhistory">Return to OrderHistory</Link>
        </button>

        <div>Order Detail for Order ID: {purchasedOrder.id}</div>
        <div>Purchased on: {purchasedOrder.lastupdate.substring(0, 10)}</div>
        <div>Total for this order was: ${purchasedOrder.ordertotal}</div>
        <div>
          {" "}
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -{" "}
        </div>
        <div>Items included in this order . . .</div>
      </section>
      <div id="productsBody">
        {purchasedOrder.orderdetails.map((orderDetail) => (
          <div className="row" key={orderDetail.productid}>
            <div id="productsContainer">
              <div id="imgSection">
                <img
                  id="productImg"
                  src={orderDetail.imageurl}
                  alt={orderDetail.title}
                />
              </div>
              <div className="productCard">Title: {orderDetail.title}</div>
              <div className="productCard">Author: {orderDetail.author}</div>
              <div className="productCard">
                Item Price: ${orderDetail.itemprice}
              </div>
              <div className="productCard">
                Quantity: {orderDetail.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewOrderDetails;
