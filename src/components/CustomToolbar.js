import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Add from "@material-ui/icons/Add";

const CustomToolbar = ({ onAdd }) => {
  return (
    <React.Fragment>
      <Tooltip title="Inserir">
        <IconButton onClick={onAdd}>
          <Add />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default CustomToolbar;
