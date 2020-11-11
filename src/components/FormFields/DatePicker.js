import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useTranslation } from "react-i18next";
import enLocale from "date-fns/locale/en-US";
import zhLocale from "date-fns/locale/zh-CN";
import { getLanguage } from "../../services/StorageManager";
import { LanguageEnum } from "../../enums/LanguageEnum";
import { DateEnum } from "../../enums/DateEnum";
import { formatDateToUTC, isValidDate } from "../../services/Utils";

const DatePicker = ({ id, label, date, onChange, disabled = false }) => {
  const { t } = useTranslation();
  const isEnglishLanguage = getLanguage() === LanguageEnum.ENGLISH;

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={isEnglishLanguage ? enLocale : zhLocale}
    >
      <KeyboardDatePicker
        id={id}
        label={t(label)}
        format={DateEnum.DATEFORMAT}
        value={date}
        size="small"
        inputVariant="outlined"
        cancelLabel={t("cancel")}
        okLabel={t("ok")}
        fullWidth={true}
        onChange={(value) => {
          if (isValidDate(value)) {
            onChange(formatDateToUTC(value));
          } else {
            onChange("");
          }
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        invalidDateMessage={t("invaliddate")}
        autoOk={true}
        disabled={disabled}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
