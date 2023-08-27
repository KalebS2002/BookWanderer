import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  useEffect(() => {
    console.log("Nav > useEffect running");
  }, [isLoggedIn]);

  return (
    <>
      <div id="nav">
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
            <Link className="link" to="/landingPage">
              Home
            </Link>
            <Link className="link" to="/products">
              Products
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
            <Link className="link" to="/checkout">
              Checkout
            </Link>
            <Link className="link" to="/cart">
              Cart
            </Link>
            {isLoggedIn && (
              <Link className="link" to="/profile">
                OrderHistory
              </Link>
            )}
            {isLoggedIn && (
              <Link className="link" to="/logout">
                LOGOUT
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};
export default Nav;
