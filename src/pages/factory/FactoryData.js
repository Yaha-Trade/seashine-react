import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

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

const FactoryData = ({ data, onSave }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(data.id);
  const [name, setName] = useState(data.name);
  const [address, setAddress] = useState(data.address);
  const [contact, setContact] = useState(data.contact);
  const [bankAccountNumber, setBankAccountNumber] = useState(
    data.bankAccountNumber
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveData = () => {
    onSave();
    handleClose();
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Dados da fábrica</DialogTitle>
        <DialogContent>
          <Fade in={open}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="name"
                label="Nome"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <TextField
                id="contact"
                label="Contato"
                variant="outlined"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
              />

              <TextField
                id="address"
                label="Endereço"
                variant="outlined"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />

              <TextField
                id="bankAccountNumber"
                label="Número da conta no banco"
                variant="outlined"
                value={bankAccountNumber}
                onChange={(event) => setBankAccountNumber(event.target.value)}
              />
            </form>
          </Fade>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              saveData();
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
