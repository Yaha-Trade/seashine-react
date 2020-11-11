import axios from "axios";
import { getToken, logout } from "./Auth";
import { CONFIG } from "../config/Config";

const api = axios.create({
  baseURL: CONFIG.baseURL,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      alert(
        "Your user has been disconnected. Please log in again! \n 您的用戶已斷開連接。請再次登錄！"
      );
      logout();
      setTimeout(() => {
        window.location.reload();
      }, 1);
    }

    return Promise.reject(error);
  }
);

export default api;
