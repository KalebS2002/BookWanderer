import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Products.css";
import "../style/ViewOrderDetails.css";

const OrderHistory = ({ purchasedOrder, setPurchasedOrder }) => {
  const userId = sessionStorage.getItem("BWUSERID");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchPurchasedOrders() {
      console.log("getting orders ...");
      try {
        const response = await fetch(
          `http://localhost:4000/api/orders/status/purchased/${userId}`
        );
        const result = await response.json();
        const orderData = result.userOrders;
        // console.log(result);
        setOrders(orderData);
      } catch (error) {
        console.error("failed to fetch purchased orders");
      }
    }
    fetchPurchasedOrders();
  }, []);

  if (!orders || orders.length < 1) {
    return (
      <section id="textCenter">
        <h2>You have no previous orders to display.</h2>
      </section>
    );
  }

  return (
    <>
      <div id="productsBody">
        {orders.map((order) => (
          <div className="row" key={order.id}>
            <div id="productsContainer" key={order.id}>
              <div className="productCard">Order Id: {order.id}</div>
              <div className="productCard">
                Order Date: {order.lastupdate.substring(0, 10)}
              </div>
              <div className="productCard">
                Total Items Purchased: {order.totalitemcount}
              </div>
              <div className="productCard">
                Order Total: ${order.ordertotal}
              </div>

              <div className="cardButtonSection">
                <button
                  className="cardButtons"
                  id="detailsButton"
                  onClick={() => {
                    setPurchasedOrder(order);
                  }}
                >
                  <Link className="cardButtons" to="/viewOrderDetails">
                    See Order Details
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

export default OrderHistory;
