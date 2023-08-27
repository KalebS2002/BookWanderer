import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Nav.css";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  useEffect(() => {}, [isLoggedIn]);

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
            <Link className="link" to="/cart">
              CART
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
              <Link className="link" to="/profile">
                Profile
              </Link>
            )}
            {isLoggedIn && (
              <Link className="link" to="/orderhistory">
                OrderHistory
              </Link>
            )}
            <Link className="link" to="/checkout">
              Checkout
            </Link>
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
