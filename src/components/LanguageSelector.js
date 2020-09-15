import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { setLanguage } from "../services/StorageManager";
import { LanguageEnum } from "../enums/LanguageEnum";
import english from "../assets/images/english.png";
import chinese from "../assets/images/chinese.png";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  images: {
    width: "40px",
    cursor: "pointer",
  },
}));

const LanguageSelector = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const setSelectedLanguage = (language) => {
    setLanguage(language);
    window.location.reload();
  };

  return (
    <div>
      <Tooltip title={t("english")}>
        <img
          className={classes.images}
          src={english}
          alt={t("english")}
          onClick={() => {
            setSelectedLanguage(LanguageEnum.ENGLISH);
          }}
        />
      </Tooltip>
      <Tooltip title={t("chinese")}>
        <img
          className={classes.images}
          src={chinese}
          alt={t("chinese")}
          onClick={() => {
            setSelectedLanguage(LanguageEnum.CHINESE);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default LanguageSelector;
