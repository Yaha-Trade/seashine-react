import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./services/i18n";
import "./assets/css/index.css";
import "./assets/css/icons.css";
import "react-image-lightbox/style.css";
import Loading from "./components/Loading";

ReactDOM.render(
  <React.Suspense fallback={<Loading isOpen={true} />}>
    <App />
  </React.Suspense>,
  document.getElementById("root")
);
