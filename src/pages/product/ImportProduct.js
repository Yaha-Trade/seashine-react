import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import AutoComplete from "../../components/formfields/AutoComplete";
import FileField from "../../components/formfields/FileField";
import TextField from "../../components/formfields/TextField";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";

const ImportProduct = ({ callBack, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [season, setSeason] = useState(null);
  const [showRoom, setShowRoom] = useState(null);
  const [errors, setErrors] = useState([]);
  const [importFile, setImportFile] = useState(null);

  const updateName = (seasonName, showRoomName) => {
    setName(`${seasonName} | ${showRoomName}`);
  };

  const onChangeSeasonSelect = (event, value) => {
    setSeason(value);
    if (value !== null) {
      setErrors(
        errors.filter((value) => {
          return value !== "season";
        })
      );
    }
    updateName(value ? value.name : "", showRoom ? showRoom.name : "");
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
    updateName(season ? season.name : "", value ? value.name : "");
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

    const response = await callServer.post(`productlists`, {
      name,
      season: { id: season.id },
      showRoom: { id: showRoom.id },
    });
    const newId = extractId(response.headers.location);

    const data = new FormData();
    data.append("importFile", importFile);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    await callServer.post(`productlists/import/${newId}`, data, config);

    callBack();

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
            <TextField
              id="name"
              label="name"
              value={name}
              required={true}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AutoComplete
              id="season"
              dataSource="seasons"
              idField="id"
              displayField="name"
              onChange={onChangeSeasonSelect}
              selectedValue={season}
              hasErrors={errors.includes("season")}
              label="season"
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
              label="showroom"
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
