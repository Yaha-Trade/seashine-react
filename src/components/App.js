import React from "react";
import { useTranslation } from "react-i18next";
import { getLanguage, setLanguage } from "../apis/StorageManager";
import { LanguageEnum } from "../enums/LanguageEnum";

const App = () => {
  const { t, i18n } = useTranslation();

  const handleSelectedLanguage = () => {
    const newLanguage =
      getLanguage() === LanguageEnum.ENGLISH
        ? LanguageEnum.CHINESE
        : LanguageEnum.ENGLISH;
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={() => {
          handleSelectedLanguage();
        }}
      >
        {t("batterytype")}
      </button>
    </div>
  );
};

export default App;
