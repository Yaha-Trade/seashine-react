import React from "react";
import { useTranslation } from "react-i18next";
import { NumberEnum } from "../../enums/NumberEnum";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

const DecimalField = ({
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
      thousandSeparator={NumberEnum.DIGITGROUPSEPARATOR}
      decimalSeparator={NumberEnum.DECIMALCHARACTER}
      decimalScale={NumberEnum.DECIMALSCALE}
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

export default DecimalField;
