import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import BackupIcon from "@material-ui/icons/Backup";
import { useTranslation } from "react-i18next";

const ProductToolbar = ({ onImport }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Tooltip title={t("importlist")}>
        <IconButton onClick={onImport}>
          <BackupIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

export default ProductToolbar;
