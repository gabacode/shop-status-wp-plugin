import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("shop-status-root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

