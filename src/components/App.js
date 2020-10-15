import React from "react";
import Routes from "../Routes";
import { refreshToken, isAuthenticated } from "../services/Auth";

const App = () => {
  if (isAuthenticated()) {
    refreshToken();
  }
  return <Routes />;
};

export default App;
