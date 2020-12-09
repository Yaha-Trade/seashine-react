import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useTranslation } from "react-i18next";

const OrderFactoryToolbar = ({ onViewProductData }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Tooltip title={t("viewproductdata")}>
        <IconButton onClick={onViewProductData}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

export default OrderFactoryToolbar;
