import React, { useEffect } from "react";
import { refreshToken } from "../services/Auth";

const App = () => {
  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default App;
