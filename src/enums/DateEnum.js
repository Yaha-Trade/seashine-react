import { getLanguage } from "../services/StorageManager";
import { LanguageEnum } from "../enums/LanguageEnum";

const isEnglishLanguage = getLanguage() === LanguageEnum.ENGLISH;

export const DateEnum = {
  DATEFORMAT: isEnglishLanguage ? "MM/dd/yyyy" : "yyyy/MM/dd",
  MOMENTFORMAT: isEnglishLanguage ? "MM/DD/yyyy" : "yyyy/MM/DD",
  DATEFORMATHOUR: isEnglishLanguage
    ? "MM/dd/yyyy HH:mm:ss"
    : "yyyy/MM/dd HH:mm:ss",
  MOMENTFORMATHOUR: isEnglishLanguage
    ? "MM/DD/yyyy HH:mm:ss"
    : "yyyy/MM/DD HH:mm:ss",
};
