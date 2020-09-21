import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    marginRight: "24px",
  },
}));

const CustomToolbarSelect = ({ onEdit, onDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.iconContainer}>
      <Tooltip title="Editar">
        <IconButton onClick={onEdit}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Excluir">
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CustomToolbarSelect;
