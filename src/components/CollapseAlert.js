import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import IconButton from "@material-ui/core/IconButton";

const CollapseAlert = ({ title, content, severity, isOpen, closeAction }) => {
  return (
    <Collapse in={isOpen}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={closeAction}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
    </Collapse>
  );
};

export default CollapseAlert;
