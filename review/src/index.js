import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// Replace ReactDOM.render with createRoot
const root = document.getElementById("root");
const appRoot = ReactDOM.createRoot(root);
appRoot.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);