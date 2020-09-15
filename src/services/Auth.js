import { setUser, getUser } from "../services/StorageManager";
import callServer from "./callServer";
import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
  return getUser() !== null;
};

export const getToken = () => {
  return getUser() !== null ? getUser().token : null;
};

export const login = (login, password, onSuccess, onError) => {
  callServer
    .post("/login", {
      login: login,
      password: password,
    })
    .then((response) => {
      const token = response.headers.authorization.substring(7);
      const login = jwt_decode(token).sub;

      setUser({
        login: login,
        token: token,
      });

      onSuccess();
    })
    .catch((error) => {
      onError();
    });
};

export const logout = () => {
  setUser(null);
};

export const refreshToken = () => {
  callServer.post("/auth/refresh_token").then((response) => {
    const token = response.headers.authorization.substring(7);
    const login = jwt_decode(token).sub;

    setUser({
      login: login,
      token: token,
    });
  });
};
