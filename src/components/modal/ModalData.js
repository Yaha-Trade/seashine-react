import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fade from "@material-ui/core/Fade";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import CloseTitle from "../../components/modal/CloseTitle";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const ModalData = ({ onSave, onClose, isOpen, children }) => {
  const { t } = useTranslation();
  const classes = useStyles();

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
            <main className={classes.layout}>{children}</main>
          </Fade>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t("cancel")}
          </Button>
          <Button onClick={onSave} color="primary">
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalData;
