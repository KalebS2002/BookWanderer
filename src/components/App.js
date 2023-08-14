import React, { useState, useEffect } from "react";
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
import LandingPage from "./LandingPage";
import Footer from "./Footer";
import Nav from "./Nav";

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

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div id="topOfPage">
          <Nav />
        </div>

        <div id="bottomOfPage">{/* <Footer /> */}</div>

        <Route path="/landingPage">
          <LandingPage />
        </Route>
        <Route></Route>
      </BrowserRouter>
    </>
  );
};

export default App;
