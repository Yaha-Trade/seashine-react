import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SendIcon from "@material-ui/icons/Send";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useTranslation } from "react-i18next";

const OrderToolbar = ({
  useApproval,
  useSendToApproval,
  onApproval,
  onReproval,
  onSendToApproval,
}) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      {useSendToApproval && (
        <Tooltip title={t("sendtoapproval")}>
          <IconButton onClick={onSendToApproval}>
            <SendIcon />
          </IconButton>
        </Tooltip>
      )}
      {useApproval && (
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
      )}
    </Fragment>
  );
};

export default OrderToolbar;
