import { getLanguage } from "../services/StorageManager";
import { LanguageEnum } from "../enums/LanguageEnum";

const isEnglishLanguage = getLanguage() === LanguageEnum.ENGLISH;

export const extractId = (location) => {
  let position = location.lastIndexOf("/");
  return location.substring(position + 1, location.length);
};

export const convertDate = (inputFormat) => {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  if (isEnglishLanguage) {
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
  } else {
    return [pad(d.getFullYear()), pad(d.getMonth() + 1), d.getDate()].join("-");
  }
};
