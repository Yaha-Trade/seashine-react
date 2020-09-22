import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    marginRight: "24px",
  },
}));

const CustomToolbarSelect = ({ onEdit, onDelete }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.iconContainer}>
      <Tooltip title={t("edit")}>
        <IconButton onClick={onEdit}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("delete")}>
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CustomToolbarSelect;
