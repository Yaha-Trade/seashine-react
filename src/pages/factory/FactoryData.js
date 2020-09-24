import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
import callServer from "../../services/callServer";
import { useTranslation } from "react-i18next";
import { useInput } from "../../hooks/useInput";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

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
  const errorMessage = t("requiredfield");

  const {
    value: name,
    bind: bindName,
    setValue: setName,
    hasErrors: errorsName,
    setHasErrors: setHasErrorsName,
  } = useInput("");

  const {
    value: address,
    bind: bindAddress,
    setValue: setAddress,
    hasErrors: errorsAddress,
    setHasErrors: setHasErrorsAddress,
  } = useInput("");

  const {
    value: contact,
    bind: bindContact,
    setValue: setContact,
    hasErrors: errorsContact,
    setHasErrors: setHasErrorsContact,
  } = useInput("");

  const {
    value: bankAccountNumber,
    bind: bindBankAccountNumber,
    setValue: setBankAccountNumber,
    hasErrors: errorsBankAccountNumber,
    setHasErrors: setHasErrorsBankAccountNumber,
  } = useInput("");

  const saveData = () => {
    let hasErrors = false;

    if (name === "") {
      setHasErrorsName(true);
      hasErrors = true;
    }

    if (address === "") {
      setHasErrorsAddress(true);
      hasErrors = true;
    }

    if (contact === "") {
      setHasErrorsContact(true);
      hasErrors = true;
    }

    if (bankAccountNumber === "") {
      setHasErrorsBankAccountNumber(true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    onSave({
      name,
      address,
      contact,
      bankAccountNumber,
      telephone1,
      telephone2,
      telephone3,
      mobilePhone1,
      mobilePhone2,
      mobilePhone3,
      qqNumber1,
      qqNumber2,
      qqNumber3,
    });

    onClose();
  };

  const {
    value: telephone1,
    bind: bindTelephone1,
    setValue: setTelephone1,
  } = useInput("");

  const {
    value: telephone2,
    bind: bindTelephone2,
    setValue: setTelephone2,
  } = useInput("");

  const {
    value: telephone3,
    bind: bindTelephone3,
    setValue: setTelephone3,
  } = useInput("");

  const {
    value: mobilePhone1,
    bind: bindMobilePhone1,
    setValue: setMobilePhone1,
  } = useInput("");

  const {
    value: mobilePhone2,
    bind: bindMobilePhone2,
    setValue: setMobilePhone2,
  } = useInput("");

  const {
    value: mobilePhone3,
    bind: bindMobilePhone3,
    setValue: setMobilePhone3,
  } = useInput("");

  const {
    value: qqNumber1,
    bind: bindQqNumber1,
    setValue: setQqNumber1,
  } = useInput("");

  const {
    value: qqNumber2,
    bind: bindQqNumber2,
    setValue: setQqNumber2,
  } = useInput("");

  const {
    value: qqNumber3,
    bind: bindQqNumber3,
    setValue: setQqNumber3,
  } = useInput("");

  useEffect(() => {
    const fetchData = async (idFactory) => {
      const response = await callServer.get(`factories/${idFactory}`);

      setName(response.data.name);
      setAddress(response.data.address);
      setContact(response.data.contact);
      setBankAccountNumber(response.data.bankAccountNumber);
      setTelephone1(response.data.telephone1);
      setTelephone2(response.data.telephone2);
      setTelephone3(response.data.telephone3);
      setMobilePhone1(response.data.mobilePhone1);
      setMobilePhone2(response.data.mobilePhone2);
      setMobilePhone3(response.data.mobilePhone3);
      setQqNumber1(response.data.qqNumber1);
      setQqNumber2(response.data.qqNumber2);
      setQqNumber3(response.data.qqNumber3);
    };

    if (isOpen && idFactory && idFactory !== -1) {
      fetchData(idFactory);
    } else {
      setName("");
      setAddress("");
      setContact("");
      setBankAccountNumber("");
      setTelephone1("");
      setTelephone2("");
      setTelephone3("");
      setMobilePhone1("");
      setMobilePhone2("");
      setMobilePhone3("");
      setQqNumber1("");
      setQqNumber2("");
      setQqNumber3("");
    }
  }, [
    setName,
    setAddress,
    setContact,
    setBankAccountNumber,
    setTelephone1,
    setTelephone2,
    setTelephone3,
    setMobilePhone1,
    setMobilePhone2,
    setMobilePhone3,
    setQqNumber1,
    setQqNumber2,
    setQqNumber3,
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
            <main className={classes.layout}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="contact"
                    label={t("contact")}
                    variant="outlined"
                    value={contact}
                    required={true}
                    fullWidth
                    size="small"
                    {...bindContact}
                    error={errorsContact}
                    helperText={errorsContact && errorMessage}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="bankAccountNumber"
                    label={t("bankaccount")}
                    variant="outlined"
                    value={bankAccountNumber}
                    required={true}
                    fullWidth
                    size="small"
                    {...bindBankAccountNumber}
                    error={errorsBankAccountNumber}
                    helperText={errorsBankAccountNumber && errorMessage}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="address"
                    label={t("address")}
                    variant="outlined"
                    value={address}
                    required={true}
                    fullWidth
                    size="small"
                    {...bindAddress}
                    error={errorsAddress}
                    helperText={errorsAddress && errorMessage}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="telephone1"
                    label={t("telephone")}
                    variant="outlined"
                    value={telephone1}
                    fullWidth
                    size="small"
                    {...bindTelephone1}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="telephone2"
                    label={t("telephone")}
                    variant="outlined"
                    value={telephone2}
                    fullWidth
                    size="small"
                    {...bindTelephone2}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="telephone3"
                    label={t("telephone")}
                    variant="outlined"
                    value={telephone3}
                    fullWidth
                    size="small"
                    {...bindTelephone3}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="mobilephone1"
                    label={t("mobilephone")}
                    variant="outlined"
                    value={mobilePhone1}
                    fullWidth
                    size="small"
                    {...bindMobilePhone1}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="mobilephone2"
                    label={t("mobilephone")}
                    variant="outlined"
                    value={mobilePhone2}
                    fullWidth
                    size="small"
                    {...bindMobilePhone2}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="mobilephone3"
                    label={t("mobilephone")}
                    variant="outlined"
                    value={mobilePhone3}
                    fullWidth
                    size="small"
                    {...bindMobilePhone3}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="qqnumber1"
                    label={t("qqnumber")}
                    variant="outlined"
                    value={qqNumber1}
                    fullWidth
                    size="small"
                    {...bindQqNumber1}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="qqnumber2"
                    label={t("qqnumber")}
                    variant="outlined"
                    value={qqNumber2}
                    fullWidth
                    size="small"
                    {...bindQqNumber2}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="qqnumber3"
                    label={t("qqnumber")}
                    variant="outlined"
                    value={qqNumber3}
                    fullWidth
                    size="small"
                    {...bindQqNumber3}
                  />
                </Grid>
              </Grid>
            </main>
          </Fade>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              saveData();
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
