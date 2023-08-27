import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Products.css";
import "../style/ViewOrderDetails.css";
import LandingPage_Background from "../Images/BookWanderer_LandingPageBackground.png";

const NewCart = ({ itemCount, setItemCount }) => {
  const userId = sessionStorage.getItem("BWUSERID");
  const [currentOrder, setCurrentOrder] = useState([]);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    async function fetchCurrentOrder() {
      try {
        const response = await fetch(`api/orders/status/current/${userId}`);
        const result = await response.json();
        const orderData = result.userOrders;
        // orderData is an array of CURRENT orders, and there should only ever be ONE order in it
        console.log("NewCart > result:", result);
        if (orderData?.length > 0) {
          setCurrentOrder(orderData[0]);
          setItemCount(currentOrder.totalitemcount);
        } else {
          setCurrentOrder([]);
        }
      } catch (error) {
        console.error("failed to fetch CURRENT order");
      }
    }
    fetchCurrentOrder();
    setForceRender(false);
  }, [forceRender]);

  async function adjustCart(strAddSub, orderid, productid, curQty) {
    console.log("NewCart > parm:", strAddSub, orderid, productid, curQty);
    try {
      // get product record for productid
      const prodFetch = await fetch(`api/products/${productid}`);
      const prodResponse = await prodFetch.json();
      let response = {};

      // verify the product isactive, that there is at least one available, and that the number in the cart doesn't exceed the curQty  in cart
      if (
        prodResponse?.isactive &&
        prodResponse?.qtyavailable > 0 &&
        prodResponse?.qtyavailable > curQty
      ) {
        // if removing detail item, and it is the last item, then run DELETE to remove the orderdetail record from the order
        if (strAddSub == "DEL") {
          console.log("NewCart > DELETE");
          response = await fetch(`api/orderdetails/${orderid}/${productid}`, {
            method: "DELETE",
          });
        } else {
          // else change the orderdetail quantity for this item
          let newQty = strAddSub == "ADD" ? curQty + 1 : curQty - 1;
          console.log("NewCart > PATCH > newQty:", newQty);
          response = await fetch(`api/orderdetails/${orderid}/${productid}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: newQty }),
          });
        }
        const result = await response.json();
        console.log("NewCart > result:", result);
        setForceRender(true);
        return result;
      } else {
        alert("Sorry - there no more of this item available.");
      }
    } catch (error) {
      console.error(`An error occured when adjusting cart item.`);
    }
  }

  // generate info for single orderdetail item
  function writeOneItem(pOneItem) {
    return (
      <>
        <div className="productCard">{pOneItem.title}</div>
        <div id="imgSection">
          <img id="productImg" src={pOneItem.imageurl} alt={pOneItem.title} />
        </div>
        <div className="productCard">By: {pOneItem.author}</div>
        <div className="productCard">
          {pOneItem.format}, {pOneItem.category}
        </div>
        <div className="productCard">Item Price: ${pOneItem.itemprice}</div>
        <div className="productCard">Quantity: {pOneItem.quantity}</div>
      </>
    );
  }

  // if there is no order for BWUSERID, then the currentOrder is an empty ARRAY
  if (Array.isArray(currentOrder)) {
    return (
      <section id="textCenter">
        <h2>There are no items in your shopping cart.</h2>
        <h2>Select PRODUCTS to start adding items to your cart.</h2>
        <img className="background" src={LandingPage_Background}></img>
      </section>
    );
  }
  // otherwise, currentOrder is an OBJECT
  return (
    <>
      <section id="orderHeader">
        <button id="addPadding">
          <Link to="/checkout">Procced to Checkout</Link>
        </button>
        <button id="addPadding">
          <Link to="/products">Continue Shopping</Link>
        </button>
        <div>CURRENT cart items for Order ID: {currentOrder.id}</div>
        <div>Number of Items: {currentOrder.totalitemcount}</div>
        <div>Order Total: ${currentOrder.ordertotal}</div>
        <div>
          {" "}
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -{" "}
        </div>
        <div>Items included in this order . . .</div>
      </section>
      <div id="productsBody">
        {currentOrder.orderdetails.map((orderDetail) => (
          <div className="row" key={orderDetail.productid}>
            <div id="productsContainer">
              {writeOneItem(orderDetail)}
              <div className="cardButtonSection">
                <button
                  className="cardButtons"
                  id="cartButton"
                  onClick={() => {
                    // console.log(product);
                    adjustCart(
                      "ADD",
                      currentOrder.id,
                      orderDetail.productid,
                      orderDetail.quantity
                    );
                  }}
                >
                  <Link className="cardButtons" to="/newcart">
                    Add One
                  </Link>
                </button>
                <button
                  className="cardButtons"
                  id="cartButton"
                  onClick={() => {
                    adjustCart(
                      orderDetail.quantity > 1 ? "SUB" : "DEL",
                      currentOrder.id,
                      orderDetail.productid,
                      orderDetail.quantity
                    );
                  }}
                >
                  {orderDetail.quantity > 1 ? (
                    <Link className="cardButtons" to="/newcart">
                      Remove One
                    </Link>
                  ) : (
                    <Link className="cardButtons" to="/newcart">
                      Delete Item
                    </Link>
                  )}
                </button>

                {orderDetail.quantity > 1 && (
                  <button
                    className="cardButtons"
                    id="cartButton"
                    onClick={() => {
                      adjustCart(
                        "DEL",
                        currentOrder.id,
                        orderDetail.productid,
                        orderDetail.quantity
                      );
                    }}
                  >
                    <Link className="cardButtons" to="/newcart">
                      Delete Item
                    </Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewCart;
