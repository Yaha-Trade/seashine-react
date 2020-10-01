import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ImageViewer from "./ImageViewer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ImageUpload from "./ImageUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    maxHeight: "410px",
  },
}));

const ImageList = ({ images }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const imageOjects = images.map((image) => {
    return {
      img: image,
    };
  });

  return (
    <div className={classes.root}>
      <GridList
        className={
          useMediaQuery(theme.breakpoints.down("sm")) ? null : classes.gridList
        }
        cols={useMediaQuery(theme.breakpoints.down("sm")) ? 1 : 3}
      >
        {imageOjects.map((image, index) => (
          <GridListTile key={image.img} cols={1}>
            <img
              src={image.img}
              alt="Product"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setImageIndex(index);
                setIsGalleryOpen(true);
              }}
            />
          </GridListTile>
        ))}
      </GridList>
      <ImageViewer
        images={images}
        isOpen={isGalleryOpen}
        imageIndex={imageIndex}
        onUpdateIndex={setImageIndex}
        onClose={() => {
          setIsGalleryOpen(false);
          setImageIndex(0);
        }}
      />
      <ImageUpload />
    </div>
  );
};

export default ImageList;
