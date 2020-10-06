import React from "react";
import Fab from "@material-ui/core/Fab";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const ImageUpload = ({ onChangePicture }) => {
  const theme = useTheme();

  const handleUploadClick = (event) => {
    for (let index = 0; index < event.target.files.length; index++) {
      const reader = new FileReader();

      reader.onload = function () {
        onChangePicture(reader.result);
      };

      reader.readAsDataURL(event.target.files[index]);
    }
  };

  const fabStyle = {
    position: "absolute",
    margin: 0,
    top: "auto",
    left: "auto",
    right: useMediaQuery(theme.breakpoints.down("sm")) ? 35 : 40,
    bottom: useMediaQuery(theme.breakpoints.down("sm")) ? 65 : 75,
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleUploadClick}
      />
      <label htmlFor="contained-button-file">
        <Fab
          style={fabStyle}
          color="primary"
          size="large"
          component="span"
          aria-label="add"
        >
          <AddToPhotosIcon />
        </Fab>
      </label>
    </div>
  );
};

export default ImageUpload;
