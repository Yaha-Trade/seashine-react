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

const DataToolbarSelect = ({
  onEdit,
  onDelete,
  customToolbarSelect = null,
  useEdit,
  useDelete,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.iconContainer}>
      {useEdit && (
        <Tooltip title={t("edit")}>
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
        </Tooltip>
      )}
      {useDelete && (
        <Tooltip title={t("delete")}>
          <IconButton onClick={onDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
      {customToolbarSelect}
    </div>
  );
};

export default DataToolbarSelect;
