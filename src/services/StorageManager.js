import { STORAGEKEYS } from "../config/Storagekeys";

export const getLanguage = () => {
  return localStorage.getItem(STORAGEKEYS.language);
};

export const setLanguage = (language) => {
  localStorage.setItem(STORAGEKEYS.language, language);
};

export const getUser = () => {
  const user = localStorage.getItem(STORAGEKEYS.user);
  if (user === null) {
    return null;
  }

  return JSON.parse(user);
};

export const setUser = (user) => {
  if (user === null) {
    localStorage.removeItem(STORAGEKEYS.user);
  } else {
    localStorage.setItem(STORAGEKEYS.user, JSON.stringify(user));
  }
};

export const setUserId = (id) => {
  if (id === null) {
    localStorage.removeItem(STORAGEKEYS.userId);
  } else {
    localStorage.setItem(STORAGEKEYS.userId, id);
  }
};

export const getUserId = () => {
  const userId = localStorage.getItem(STORAGEKEYS.userId);
  if (userId === null) {
    return null;
  }

  return userId;
};
