import React, { useEffect } from "react";
import { refreshToken } from "../services/Auth";

const App = () => {
  useEffect(() => {
    refreshToken();
  }, []);

  return <div>Welcome to Seashine!</div>;
};

export default App;
