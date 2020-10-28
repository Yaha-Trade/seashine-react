import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./services/i18n";
import "./assets/css/index.css";
import "./assets/css/icons.css";
import "react-image-lightbox/style.css";
import Loading from "./components/Loading";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.Suspense fallback={<Loading isOpen={true} />}>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2500}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <App />
    </SnackbarProvider>
  </React.Suspense>,
  document.getElementById("root")
);
