import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./apis/i18n";
import "./assets/css/index.css";
import "./assets/css/icons.css";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading">
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
