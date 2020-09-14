import { STORAGEKEYS } from "../config/Storagekeys";

export const getLanguage = () => {
  return localStorage.getItem(STORAGEKEYS.language);
};

export const setLanguage = (language) => {
  localStorage.setItem(STORAGEKEYS.language, language);
};
