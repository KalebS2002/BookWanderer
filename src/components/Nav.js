import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import Checkout from "./Checkout";
const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
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
            <Link className="link" to="/checkout">
              About
            </Link>

            <Link className="link" to="/login-signup">
              {isLoggedIn ? null : "Login/SignUp"}
            </Link>
            <Link className="link" to="/cart">
              {isLoggedIn ? "Cart" : null}
            </Link>
            {/* <button
              onClick={() => {
                console.log(isLoggedIn);
              }}
            >
              Login
            </button> */}
          </div>
        </nav>
      </div>
    </>
  );
};
export default Nav;
