import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import "./style/index.css";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

ReactDOM.render(<App />, document.getElementById("root"));
ShadowRoot.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
