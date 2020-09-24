import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import callServer from "../../services/callServer";
import { useTranslation } from "react-i18next";
import { useInput } from "../../hooks/useInput";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";

const CustomerData = ({ idCustomer, onSave, onClose, isOpen }) => {
  const { t } = useTranslation();
  const errorMessage = t("requiredfield");

  const {
    value: name,
    bind: bindName,
    setValue: setName,
    hasErrors: errorsName,
    setHasErrors: setHasErrorsName,
  } = useInput("");

  const saveData = () => {
    if (name === "") {
      setHasErrorsName(true);
      return;
    }

    onSave({
      name,
    });

    onClose();
  };

  useEffect(() => {
    const fetchData = async (idCustomer) => {
      const response = await callServer.get(`customers/${idCustomer}`);

      setName(response.data.name);
    };

    if (isOpen && idCustomer && idCustomer !== -1) {
      fetchData(idCustomer);
    } else {
      setName("");
    }
  }, [setName, idCustomer, isOpen]);

  return (
    <div>
      <ModalData
        onSave={saveData}
        isOpen={isOpen}
        onClose={onClose}
        title="customerdata"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="name"
              label={t("name")}
              variant="outlined"
              value={name}
              fullWidth
              required={true}
              size="small"
              {...bindName}
              error={errorsName}
              helperText={errorsName && errorMessage}
            />
          </Grid>
        </Grid>
      </ModalData>
    </div>
  );
};

export default CustomerData;
