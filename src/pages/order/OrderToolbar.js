import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SendIcon from "@material-ui/icons/Send";
import { useTranslation } from "react-i18next";

const OrderToolbar = ({ onSendToApproval }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Tooltip title={t("sendtoapproval")}>
        <IconButton onClick={onSendToApproval}>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

export default OrderToolbar;
