import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

const IntegerField = ({
  id,
  label,
  value,
  onChange = () => {},
  callBack = () => {},
  errors = [],
  required = false,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const errorMessage = t("requiredfield");

  return (
    <NumberFormat
      id={id}
      label={t(label)}
      thousandSeparator={false}
      decimalScale={0}
      allowNegative={false}
      customInput={TextField}
      size="small"
      variant="outlined"
      value={value}
      fullWidth
      required={required}
      disabled={disabled}
      isNumericString={true}
      onValueChange={(value) => {
        onChange(id, value.value, callBack);
      }}
      error={errors.includes(id)}
      helperText={errors.includes(id) && errorMessage}
    />
  );
};

export default IntegerField;
