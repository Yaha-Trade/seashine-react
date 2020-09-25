import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import callServer from "../../services/callServer";
import { useTranslation } from "react-i18next";
import { useInput } from "../../hooks/useInput";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";

const ProductData = ({ idProduct, onSave, onClose, isOpen }) => {
  const { t } = useTranslation();
  const errorMessage = t("requiredfield");

  const {
    value: reference,
    bind: bindReference,
    setValue: setReference,
    hasErrors: errorsReference,
    setHasErrors: setHasErrorsReference,
  } = useInput("");

  const saveData = () => {
    let hasErrors = false;

    if (reference === "") {
      setHasErrorsReference(true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    onSave({
      reference,
    });

    onClose();
  };

  useEffect(() => {
    const fetchData = async (idProduct) => {
      const response = await callServer.get(`products/${idProduct}`);

      setReference(response.data.reference);
    };

    if (isOpen && idProduct && idProduct !== -1) {
      fetchData(idProduct);
    } else {
      setReference("");
    }
  }, [setReference, idProduct, isOpen]);

  return (
    <div>
      <ModalData
        onSave={saveData}
        isOpen={isOpen}
        onClose={onClose}
        title="productdata"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="reference"
              label={t("reference")}
              variant="outlined"
              value={reference}
              fullWidth
              required={true}
              size="small"
              {...bindReference}
              error={errorsReference}
              helperText={errorsReference && errorMessage}
            />
          </Grid>
        </Grid>
      </ModalData>
    </div>
  );
};

export default ProductData;
