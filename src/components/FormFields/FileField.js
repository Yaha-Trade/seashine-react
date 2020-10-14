import React from "react";
import PublishIcon from "@material-ui/icons/Publish";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from "react-i18next";

const FileField = ({ id, value, onChangeFile, errors }) => {
  const { t } = useTranslation();
  const errorMessage = t("requiredfield");

  return (
    <div>
      <input
        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        style={{ display: "none" }}
        id="contained-button-filefield"
        type="file"
        onChange={(event) => {
          const file = event.target.files[0];
          onChangeFile(file === undefined ? null : file);
        }}
      />
      <label htmlFor="contained-button-filefield">
        <TextField
          id={id}
          value={value}
          variant="outlined"
          fullWidth={true}
          disabled={true}
          size="small"
          error={errors.includes(id)}
          helperText={errors.includes(id) && errorMessage}
          InputProps={{
            endAdornment: (
              <IconButton
                variant="contained"
                color="primary"
                aria-label="upload picture"
                component="span"
                size="small"
              >
                <PublishIcon />
              </IconButton>
            ),
          }}
        />
      </label>
    </div>
  );
};

export default FileField;
