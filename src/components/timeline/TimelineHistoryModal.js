import React, { useState } from "react";
import ModalData from "../../components/modal/ModalData";
import Button from "@material-ui/core/Button";
import TextField from "../../components/formfields/TextField";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";

const TimelineHistoryModal = ({ onSave, onClose }) => {
  const [text, setText] = useState("");
  const { t } = useTranslation();

  const onChangeText = (id, newValue) => {
    setText(newValue);
  };

  return (
    <ModalData
      isOpen={true}
      onClose={onClose}
      title="message"
      hasActions={false}
      fullWidth={true}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="text"
            label="message"
            value={text}
            multiline={true}
            rows={5}
            onChange={onChangeText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave(text)}
          >
            {t("add")}
          </Button>
        </Grid>
      </Grid>
    </ModalData>
  );
};

export default TimelineHistoryModal;
