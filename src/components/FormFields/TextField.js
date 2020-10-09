import React from "react";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";

const CustomTextField = ({
  id,
  label,
  value,
  onChange = () => {},
  errors = [],
  required = false,
  disabled = false,
  multiline = false,
  rows = 1,
}) => {
  const { t } = useTranslation();
  const errorMessage = t("requiredfield");

  return (
    <TextField
      id={id}
      label={t(label)}
      variant="outlined"
      value={value}
      fullWidth
      required={required}
      disabled={disabled}
      size="small"
      multiline={multiline}
      rows={rows}
      onChange={(e) => onChange(id, e.target.value)}
      error={errors.includes(id)}
      helperText={errors.includes(id) && errorMessage}
    />
  );
};

export default CustomTextField;
