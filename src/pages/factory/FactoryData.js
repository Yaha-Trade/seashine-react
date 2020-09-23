import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import callServer from "../../services/callServer";
import { useTranslation } from "react-i18next";
import { useInput } from "../../hooks/useInput";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#3f51b5",
    color: "#FFF",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#FFF",
  },
});

const CloseTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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
        <CloseTitle id="close-title" onClose={onClose}>
          {t("factorydata")}
        </CloseTitle>
        <DialogContent>
          <Fade in={isOpen}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="name"
                label={t("name")}
                variant="outlined"
                value={name}
                required={true}
                size="small"
                fullWidth
                {...bindName}
              />

              <TextField
                id="contact"
                label={t("contact")}
                variant="outlined"
                value={contact}
                required={true}
                size="small"
                {...bindContact}
              />

              <TextField
                id="address"
                label={t("address")}
                variant="outlined"
                value={address}
                required={true}
                size="small"
                {...bindAddress}
              />

              <TextField
                id="bankAccountNumber"
                label={t("bankaccount")}
                variant="outlined"
                value={bankAccountNumber}
                required={true}
                size="small"
                {...bindBankAccountNumber}
              />
            </form>
          </Fade>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t("cancel")}
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
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FactoryData;
