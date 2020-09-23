import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import callServer from "../../services/callServer";
import { useTranslation } from "react-i18next";
import { useInput } from "../../hooks/useInput";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const FactoryData = ({ idFactory, onSave, onClose, isOpen }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { value: name, bind: bindName, setValue: setName } = useInput("");
  const { value: address, bind: bindAddress, setValue: setAddress } = useInput(
    ""
  );
  const { value: contact, bind: bindContact, setValue: setContact } = useInput(
    ""
  );

  const {
    value: bankAccountNumber,
    bind: bindBankAccountNumber,
    setValue: setBankAccountNumber,
  } = useInput("");

  const saveData = (factory) => {
    onSave(factory);
    onClose();
  };

  useEffect(() => {
    const fetchData = async (idFactory) => {
      const response = await callServer.get(`factories/${idFactory}`);

      setName(response.data.name);
      setAddress(response.data.address);
      setContact(response.data.contact);
      setBankAccountNumber(response.data.bankAccountNumber);
    };

    if (isOpen && idFactory && idFactory !== -1) {
      fetchData(idFactory);
    } else {
      setName("");
      setAddress("");
      setContact("");
      setBankAccountNumber("");
    }
  }, [
    setName,
    setAddress,
    setContact,
    setBankAccountNumber,
    idFactory,
    isOpen,
  ]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Dados da fábrica</DialogTitle>
        <DialogContent>
          <Fade in={isOpen}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="name"
                label={t("name")}
                variant="outlined"
                value={name}
                {...bindName}
              />

              <TextField
                id="contact"
                label={t("contact")}
                variant="outlined"
                value={contact}
                {...bindContact}
              />

              <TextField
                id="address"
                label={t("address")}
                variant="outlined"
                value={address}
                {...bindAddress}
              />

              <TextField
                id="bankAccountNumber"
                label={t("bankaccount")}
                variant="outlined"
                value={bankAccountNumber}
                {...bindBankAccountNumber}
              />
            </form>
          </Fade>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              saveData({
                name,
                address,
                contact,
                bankAccountNumber,
              });
            }}
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FactoryData;
