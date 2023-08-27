import React, { useState, useEffect, Component } from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
// getAPIHealth is defined in our axios-services directory index.js
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
import Signup from "./Signup";
import Products from "./Products";
import ViewProduct from "./ViewProduct";
import Checkout from "./Checkout";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";
import Profile from "./Profile";
import AdminProducts from "./AdminProducts";

sessionStorage.setItem("BWUSERID", 1);
console.log("BWUSERID init:", sessionStorage.getItem("BWUSERID"));

const Logout = ({ isLoggedIn, setIsLoggedIn }) => {
  useEffect(() => {
    sessionStorage.clear();
    sessionStorage.setItem("BWUSERID", 1);
    setIsLoggedIn(false);
  }, [isLoggedIn]);
  return <Redirect to="/landingPage" />;
};

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [currentProduct, setCurrentProduct] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };
  });

  return (
    //use ternery operators for conditioanl rendering ex: {isLoggedIn ? Products : Login }
    //think of props that need to be passed through each comp ex: <Cart isLoggedIn={isLoggedIn}/>

    <>
      <BrowserRouter>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Route path="/landingPage">
          <LandingPage />
        </Route>
        <Route path="/products">
          <Products
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
          />
        </Route>
        <Route path="/login">
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/signup">
          <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
        <Route path="/orderHistory">
          <OrderHistory />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/logout">
          <Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/profile">
          <Profile isLoggedIn={isLoggedIn}/>
        </Route>
        <Route path="/adminproducts">
          <AdminProducts isLoggedIn={isLoggedIn}/>
        </Route>
      </BrowserRouter>
      <div id="footerSection">{/* <Footer /> */}</div>
    </>
  );
};

export default App;
