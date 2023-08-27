import React from "react";
import { Link } from "react-router-dom";
import "../style/Products.css";
import "../style/ViewOrderDetails.css";

const ViewOrderDetails = ({ purchasedOrder }) => {
  return (
    <>
      <section id="orderHeader">
        <button>
          <Link to="/orderhistory">Return to OrderHistory</Link>
        </button>

        <div>
          Details for ORDER ID:{"  "} {purchasedOrder.id}
        </div>
        <div>
          Purchased on:{"  "} {purchasedOrder.lastupdate.substring(0, 10)}
        </div>
        <div>
          Number of Items:{"  "} {purchasedOrder.totalitemcount}
        </div>
        <div>
          Order Total:{"  "} ${purchasedOrder.ordertotal}
        </div>
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
              <div className="productCard">{orderDetail.title}</div>
              <div id="imgSection">
                <img
                  id="productImg"
                  src={orderDetail.imageurl}
                  alt={orderDetail.title}
                />
              </div>
              <div className="productCard">By: {orderDetail.author}</div>
              <div className="productCard">
                {orderDetail.format}, {orderDetail.category}
              </div>
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
