import React from "react";
import Fab from "@material-ui/core/Fab";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const ImageUpload = () => {
  const theme = useTheme();

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    console.log(url);
  };

  const fabStyle = {
    position: "absolute",
    margin: 0,
    top: "auto",
    left: "auto",
    right: useMediaQuery(theme.breakpoints.down("sm")) ? 35 : 50,
    bottom: useMediaQuery(theme.breakpoints.down("sm")) ? 65 : 95,
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
