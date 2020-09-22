import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Add from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";

const CustomToolbar = ({ onAdd }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Tooltip title={t("add")}>
        <IconButton onClick={onAdd}>
          <Add />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default CustomToolbar;
