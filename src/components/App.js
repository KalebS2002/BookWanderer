import React, { useState, useEffect, Component } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import "../style/Login_Signup.css";
import "../style/Products.css";
import "../style/Nav.css";
import "../style/ViewProduct.css";
import "../style/Checkout.css";
import "../style/Footer.css";
import LandingPage from "./LandingPage";
import Footer from "./Footer";
import Nav from "./Nav";
import Login from "./Login";
import Products from "./Products";
import ViewProduct from "./ViewProduct";
import Checkout from "./Checkout";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };
  });

  const [currentProduct, setCurrentProduct] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    //use turnery operators for conditioanl rendering ex: {isLoggedIn ? Products : Login }
    //think of props that need to be passed through each comp ex: <Cart isLoggedIn={isLoggedIn}/>

    <>
      <BrowserRouter>
        <Nav />

        <Route path="/landingPage">
          <LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/products">
          <Products
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
          />
        </Route>
        <Route path="/login-signup">
          <Login />
        </Route>
        <Route path="/viewProduct">
          <ViewProduct
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
          />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
      </BrowserRouter>
      <div id="footerSection">{/* <Footer /> */}</div>
    </>
  );
};

export default App;
