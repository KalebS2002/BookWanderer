import React from "react";
import { useEffect } from "react";
//getOrderByOrderId (w/details) http://localhost:4000/api/orders/id/14
//order confirmation:  set CURRENT order to PURCHASED => PATCH => PARAMS :id (orderid) => curl http://localhost:4000/api/orders/3 -X PATCH
//display current order => order total => Confirm purchase button => API call line 33 (order confirmation) => Thanks for shopping with us

//figure out how and what to fetch
const Checkout = () => {
  //   useEffect(() => {
  //     async function getTestOrder() {
  //       console.log("attempting to fectch order....");
  //       try {
  //         const response = await fetch(`http://localhost:4000/api/orders/id/14`);
  //         const result = await response.json();

  //         console.log(result);
  //         return result;
  //       } catch (error) {
  //         console.error("failed to fetch order");
  //       }
  //     }
  //     getTestOrder();
  //   }, []);

  return (
    //replace values with values recived from order that was passed through. ex: {order.toatal}
    <>
      <div id="checkoutPage">
        <section className="component">
          <div className="total">
            <h3>TOTAL</h3>
            <p>$12.67</p>
          </div>
          <div className="credit-card">
            <h2>Checkout</h2>
            <form>
              <input type="text" placeholder="Name" />
              <div className="line">
                <input type="text" placeholder="Card Number" />
              </div>
              <div className="line">
                <input
                  className="litle"
                  type="text"
                  placeholder="Experation Date"
                />
                <input className="tall" type="text" placeholder="CCV" />
              </div>
              <button type="submit" className="valid-button">
                PLACE ORDER
              </button>
              <div className="total">
                <h3>TOTAL</h3>
                <p>$1.00</p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Checkout;
