import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import Checkout from "./Checkout";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const Logout = () => {
    useEffect(() => {
      sessionStorage.clear();
    }, []);
    // return <Redirect to="/landingPage" />;
  };
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

            {/* {isLoggedIn ? <p>this is logged in</p> : <p>this is logged out</p>} */}
            <Link className="link" to="/login">
              Login
            </Link>

            <Link className="link" to="/signup">
              Sign Up
            </Link>

            <Link className="link" to="/checkout">
              Checkout
            </Link>
            <Link className="link" to="/cart">
              Cart
            </Link>
            <button onClick={Logout()}>Logout</button>

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
