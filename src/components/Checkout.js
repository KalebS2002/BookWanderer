import React from "react";
import { useEffect, useState } from "react";
//getOrderByOrderId (w/details) http://localhost:4000/api/orders/id/14
//order confirmation:  set CURRENT order to PURCHASED => PATCH => PARAMS :id (orderid) => curl http://localhost:4000/api/orders/3 -X PATCH
//display current order => order total => Confirm purchase button => API call line 33 (order confirmation) => Thanks for shopping with us

//figure out how and what to fetch
const Checkout = () => {
  // TO DO: update user id by what is stored in sessionStorage;
  const userId = sessionStorage.getItem("BWUSERID");
  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      console.log("attempting to fectch order....");
      try {
        const response = await fetch(
          `http://localhost:4000/api/orders/status/current/${userId}`
        );
        const result = await response.json();
        console.log(result);
        const userOrders = result.userOrders[0].orderdetails;
        setOrder(userOrders);
        console.log(userOrders);
        console.log(userOrders[0].orderid);
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
        `http://localhost:4000/api/orders/${order[0].orderid}`,
        {
          method: "PATCH",
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("failed to submit order");
    }
  }

  // define total start at 0
  // for each item in the cart multiply itemprice by quantity
  // take that number and add to total

  let total = 0;
  for (const item of order) {
    const itemTotal = +item.itemprice * item.quantity;
    total += itemTotal;
  }

  // console.log(order);

  return (
    //replace values with values recived from order that was passed through. ex: {order.toatal}

    <>
      <div id="checkoutPage">
        <section className="component">
          <div className="total">
            <h3>TOTAL</h3>
            <p>${total}</p>
          </div>

          <div className="credit-card">
            <h2>Checkout</h2>
            <form>
              <input type="text" placeholder="Name" />
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
              <button
                type="submit"
                className="valid-button"
                onClick={submitOrder}
              >
                PLACE ORDER
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Checkout;
