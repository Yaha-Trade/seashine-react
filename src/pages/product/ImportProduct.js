import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import AutoComplete from "../../components/formfields/AutoComplete";
import FileField from "../../components/formfields/FileField";
import { useTranslation } from "react-i18next";

const ImportProduct = ({ onSave, onClose }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [season, setSeason] = useState(null);
  const [showRoom, setShowRoom] = useState(null);
  const [errors, setErrors] = useState([]);
  const [importFile, setImportFile] = useState(null);

  const onChangeSeasonSelect = (event, value) => {
    setSeason(value);
    if (value !== null) {
      setErrors(
        errors.filter((value) => {
          return value !== "season";
        })
      );
    }
  };

  const onChangeShowRoomSelect = (event, value) => {
    setShowRoom(value);
    if (value !== null) {
      setErrors(
        errors.filter((value) => {
          return value !== "showRoom";
        })
      );
    }
  };

  const onChangeFile = (file) => {
    setImportFile(file);
    if (file !== null) {
      setErrors(
        errors.filter((value) => {
          return value !== "importFile";
        })
      );
    }
  };

  const onImport = async () => {
    const errors = [];

    if (season === null) {
      errors.push("season");
    }

    if (importFile === null) {
      errors.push("importFile");
    }

    if (showRoom === null) {
      errors.push("showRoom");
    }

    setErrors(errors);

    if (errors.length > 0) {
      return;
    }

    setIsLoading(true);
    await onSave();
    setIsLoading(false);
    onClose();
  };

  return (
    <div>
      <ModalData
        onSave={onImport}
        isOpen={true}
        onClose={onClose}
        title="importlist"
      >
        <Loading isOpen={isLoading} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <AutoComplete
              id="season"
              dataSource="seasons"
              idField="id"
              displayField="name"
              onChange={onChangeSeasonSelect}
              selectedValue={season}
              hasErrors={errors.includes("season")}
              label={t("season")}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AutoComplete
              id="showRoom"
              dataSource="showrooms"
              idField="id"
              displayField="name"
              onChange={onChangeShowRoomSelect}
              selectedValue={showRoom}
              hasErrors={errors.includes("showRoom")}
              label={t("showroom")}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FileField
              id="importFile"
              value={importFile ? importFile.name : ""}
              onChangeFile={onChangeFile}
              errors={errors}
            />
          </Grid>
        </Grid>
      </ModalData>
    </div>
  );
};

export default ImportProduct;
