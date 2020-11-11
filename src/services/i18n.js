import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import { getLanguage, setLanguage } from "../services/StorageManager";
import { LanguageEnum } from "../enums/LanguageEnum";
import { CONFIG } from "../config/Config";

const language = getLanguage();
const DEFAULT_LOCALE = language == null ? LanguageEnum.ENGLISH : language;

if (language == null) {
  setLanguage(LanguageEnum.ENGLISH);
}

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${CONFIG.baseURL}/locales/all/${DEFAULT_LOCALE}`,
    },
  });

export default i18n;
