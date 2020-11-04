import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Add from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";

const DataToolbar = ({ onAdd, customToolbar = null, useAdd }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {useAdd && (
        <Tooltip title={t("add")}>
          <IconButton onClick={onAdd}>
            <Add />
          </IconButton>
        </Tooltip>
      )}
      {customToolbar}
    </React.Fragment>
  );
};

export default DataToolbar;
