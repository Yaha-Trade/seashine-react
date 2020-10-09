import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "../../enums/CurrencyEnum";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

const CurrencyField = ({
  id,
  label,
  value,
  onChange = () => {},
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
      thousandSeparator={CurrencyEnum.DIGITGROUPSEPARATOR}
      decimalSeparator={CurrencyEnum.DECIMALCHARACTER}
      decimalScale={CurrencyEnum.DECIMALSCALE}
      allowNegative={false}
      prefix={CurrencyEnum.CURRENCYSYMBOL}
      customInput={TextField}
      size="small"
      variant="outlined"
      value={value}
      fullWidth
      required={required}
      disabled={disabled}
      isNumericString={true}
      fixedDecimalScale={true}
      onValueChange={(value) => {
        onChange(id, value.value);
      }}
      error={errors.includes(id)}
      helperText={errors.includes(id) && errorMessage}
    />
  );
};

export default CurrencyField;
