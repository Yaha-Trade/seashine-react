import { setUser, getUser } from "../apis/StorageManager";
import callServer from "../apis/callServer";

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
      console.log(response);

      setUser({
        login: login,
        token: response.headers.authorization.substring(7),
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

export const refreshToken = () => {};
