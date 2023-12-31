import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Nav.css";
import "../style/Products.css";

const Nav = ({ isLoggedIn, itemCount, setItemCount }) => {
  const userId = sessionStorage.getItem("BWUSERID");
  const username = sessionStorage.getItem("BWUSERNAME");

  useEffect(() => {
    async function fetchCurrentOrder() {
      console.log("NAV > CURRENT itemCount  ...");
      try {
        const response = await fetch(`api/orders/status/current/${userId}`);
        const result = await response.json();
        if (result?.userOrders?.length > 0) {
          // if got a valid response, then setItemCount from the first array element (should only be 1 CURRENT order)
          setItemCount(result.userOrders[0].totalitemcount);
        } else {
          // setOrder to an empty array
          setItemCount(0);
        }
        console.log("itemCount:", itemCount);
      } catch (error) {
        console.error("failed to fetch CURRENT order");
      }
    }
    fetchCurrentOrder();
  }, [isLoggedIn, itemCount]);

  return (
    <>
      <div id="nav">
        {isLoggedIn && <p id="usernameDisplay">Username: {username}</p>}
        <nav>
          <div id="logoSection">
            <img
              id="websiteLogo"
              src="https://media.istockphoto.com/id/1328167226/vector/open-book.jpg?s=612x612&w=0&k=20&c=yqfKR7Es5IDuM20rtyg4xZihaGTl2waDtvucK1YCTIw="
              alt="logo"
            />

            <h1 id="title">Book Wanderer</h1>
          </div>
          <div id="navSelections">
            <Link className="link" to="/">
              Home
            </Link>
            <Link className="link" to="/products">
              Products
            </Link>
            <Link className="link" to="/newcart">
              Cart {" ("}
              {itemCount}
              {")"}
            </Link>
            {!isLoggedIn && (
              <Link className="link" to="/login">
                Login
              </Link>
            )}
            {!isLoggedIn && (
              <Link className="link" to="/signup">
                SignUp
              </Link>
            )}
            {isLoggedIn && (
              <Link className="link" to="/orderhistory">
                Order History
              </Link>
            )}
            {isLoggedIn && (
              <Link className="link" to="/profile">
                Profile
              </Link>
            )}
            {isLoggedIn && (
              <Link className="link" to="/logout">
                Logout
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};
export default Nav;
