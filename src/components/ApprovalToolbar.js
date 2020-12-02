import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useTranslation } from "react-i18next";

const ApprovalToolbar = ({ onApproval, onReproval }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Tooltip title={t("approve")}>
        <IconButton onClick={onApproval}>
          <CheckIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("reprove")}>
        <IconButton onClick={onReproval}>
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

export default ApprovalToolbar;
