import React, { useEffect, useState } from "react";
import "../style/Checkout.css";

//getOrderByOrderId (w/details) http://localhost:4000/api/orders/id/14
//order confirmation:  set CURRENT order to PURCHASED => PATCH => PARAMS :id (orderid) => curl http://localhost:4000/api/orders/3 -X PATCH
//display current order => order total => Confirm purchase button => API call line 33 (order confirmation) => Thanks for shopping with us

//figure out how and what to fetch
const Checkout = () => {
  const userId = sessionStorage.getItem("BWUSERID");
  const [order, setOrder] = useState([]);
  const [checkOutComplete, setCheckoutComplete] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      console.log("attempting to fetch order....");
      try {
        console.log(userId);
        console.log(sessionStorage.getItem("BWUSERID"));
        const response = await fetch(
          `http://localhost:4000/api/orders/status/current/${userId}`
        );
        const result = await response.json();
        console.log("fetchOrder:", result);

        if (result?.userOrders?.length > 0) {
          // if got a valid response, then setOrder to the first item in the array (there should only be one CURRENT order)
          setOrder(result.userOrders[0]);
        } else {
          // setOrder to an empty array
          setOrder([]);
        }
      } catch (error) {
        console.error("failed to fetch order");
      }
    }
    fetchOrder();
  }, []);

  async function submitOrder(event) {
    event.preventDefault();
    console.log("attempting to submit order....");
    try {
      const response = await fetch(
        `http://localhost:4000/api/orders/${order.id}`,
        {
          method: "PATCH",
        }
      );
      const result = await response.json();
      if (result?.updatedOrder?.status === "PURCHASED") {
        setCheckoutComplete(true);
      }
      console.log("result:", result);
    } catch (error) {
      console.error("failed to submit order");
    }
  }

  if (Array.isArray(order)) {
    return (
      <section>
        <h2>Sorry - there are no items in your cart.</h2>
        <h2>Select PRODUCTS to begin adding items.</h2>
      </section>
    );
  }

  return (
    <>
      <div id="checkoutPage">
        <section className="component">
          <div className="total">
            <h3>TOTAL</h3>
            <p>${order.ordertotal}</p>
          </div>

          <div className="credit-card">
            <h2>
              Checkout - {order.totalitemcount} items - OrderId: {order.id}
            </h2>
            <form>
              <input type="text" placeholder={order.username.toUpperCase()} />
              <input type="text" placeholder="Email Address" />
              <div className="line">
                <input type="text" placeholder="Card Number" />
              </div>
              <div className="line">
                <input
                  className="litle"
                  type="text"
                  placeholder="Expiration Date"
                />
                <input className="tall" type="text" placeholder="CCV" />
              </div>
              {checkOutComplete ? (
                <div className="line">
                  <h3>Your order is complete. Please note the OrderId.</h3>
                </div>
              ) : (
                <button
                  type="submit"
                  className="valid-button"
                  onClick={submitOrder}
                >
                  PLACE ORDER
                </button>
              )}
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Checkout;
