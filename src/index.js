import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./services/i18n";
import "./assets/css/index.css";
import "./assets/css/icons.css";

ReactDOM.render(
  <React.Suspense fallback="Loading...">
    <App />
  </React.Suspense>,
  document.getElementById("root")
);
