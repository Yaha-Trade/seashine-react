import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import callServer from "../../services/callServer";
import { useTranslation } from "react-i18next";
import { useInput } from "../../hooks/useInput";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";

const PackingData = ({ idPacking, onSave, onClose, isOpen }) => {
  const { t } = useTranslation();
  const errorMessage = t("requiredfield");

  const {
    value: englishName,
    bind: bindEnglishName,
    setValue: setEnglishName,
    hasErrors: errorsEnglishName,
    setHasErrors: setHasErrorsEnglishName,
  } = useInput("");

  const {
    value: chineseName,
    bind: bindChineseName,
    setValue: setChineseName,
    hasErrors: errorsChineseName,
    setHasErrors: setHasErrorsChineseName,
  } = useInput("");

  const saveData = () => {
    let hasErrors = false;

    if (englishName === "") {
      setHasErrorsEnglishName(true);
      hasErrors = true;
    }

    if (chineseName === "") {
      setHasErrorsChineseName(true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    onSave({
      englishName,
      chineseName,
    });

    onClose();
  };

  useEffect(() => {
    const fetchData = async (idPacking) => {
      const response = await callServer.get(`packings/${idPacking}`);

      setEnglishName(response.data.englishName);
      setChineseName(response.data.chineseName);
    };

    if (isOpen && idPacking && idPacking !== -1) {
      fetchData(idPacking);
    } else {
      setEnglishName("");
      setChineseName("");
    }

    setHasErrorsEnglishName(false);
    setHasErrorsChineseName(false);
  }, [
    setEnglishName,
    setChineseName,
    setHasErrorsEnglishName,
    setHasErrorsChineseName,
    idPacking,
    isOpen,
  ]);

  return (
    <div>
      <ModalData
        onSave={saveData}
        isOpen={isOpen}
        onClose={onClose}
        title="packingdata"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="englishName"
              label={t("english")}
              variant="outlined"
              value={englishName}
              fullWidth
              required={true}
              size="small"
              {...bindEnglishName}
              error={errorsEnglishName}
              helperText={errorsEnglishName && errorMessage}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="chineseName"
              label={t("chinese")}
              variant="outlined"
              value={chineseName}
              fullWidth
              required={true}
              size="small"
              {...bindChineseName}
              error={errorsChineseName}
              helperText={errorsChineseName && errorMessage}
            />
          </Grid>
        </Grid>
      </ModalData>
    </div>
  );
};

export default PackingData;
