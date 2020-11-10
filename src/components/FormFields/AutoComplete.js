import React, { useState, useEffect, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import callServer from "../../services/callServer";
import { useTranslation } from "react-i18next";

const AutoComplete = ({
  id,
  dataSource,
  onChange,
  displayField,
  selectedValue,
  hasErrors,
  label,
  inputVariant = "outlined",
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [noData, setNoData] = useState(false);
  const loading = open && options.length === 0 && !noData;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await callServer.get(dataSource);
      const values = await response.data;

      setNoData(values.length === 0);

      if (active) {
        setOptions(values);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, dataSource]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Fragment>
      <Autocomplete
        id={id}
        fullWidth
        size="small"
        open={open}
        value={selectedValue}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, value) => {
          onChange(event, value);
        }}
        getOptionSelected={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option[displayField]}
        options={options}
        loading={loading}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(label)}
            variant={inputVariant}
            error={hasErrors}
            helperText={hasErrors && t("requiredfield")}
            required
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Fragment>
  );
};

export default AutoComplete;
