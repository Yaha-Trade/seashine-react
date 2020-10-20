import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fade from "@material-ui/core/Fade";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CloseTitle from "../../components/modal/CloseTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const ModalData = ({
  onSave,
  onClose,
  isOpen,
  title,
  children,
  fullWidth = false,
  fullScreen = false,
  minHeight = "auto",
  hasActions = true,
}) => {
  const useStyles = makeStyles((theme) => ({
    dialogPaper: {
      minHeight,
    },
  }));

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={isOpen}
        onClose={onClose}
        maxWidth="md"
        fullScreen={useMediaQuery(theme.breakpoints.down("sm")) || fullScreen}
        fullWidth={fullWidth}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <CloseTitle id="close-title" onClose={onClose}>
          {t(title)}
        </CloseTitle>
        <DialogContent>
          <Fade in={isOpen}>
            <main>
              <form autoComplete="off">{children}</form>
            </main>
          </Fade>
        </DialogContent>
        {hasActions && (
          <DialogActions>
            <Button onClick={onClose} color="primary">
              {t("cancel")}
            </Button>
            <Button onClick={() => onSave(false)} color="primary">
              {t("save")}
            </Button>
            <Button onClick={() => onSave(true)} color="primary">
              {t("saveandexit")}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default ModalData;
