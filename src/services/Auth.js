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

export const refreshToken = async () => {
  const response = await callServer.post("/auth/refresh_token");
  const token = response.headers.authorization.substring(7);
  const login = jwt_decode(token).sub;

  setUser({
    login: login,
    token: token,
  });
};

export const resetPassword = (email, onSuccess, onError) => {
  callServer
    .post("/auth/forgot", {
      email: email,
    })
    .then((response) => {
      onSuccess();
    })
    .catch((error) => {
      onError();
    });
};
