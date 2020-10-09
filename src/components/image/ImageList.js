import React, { useState } from "react";
import ImageViewer from "./ImageViewer";
import ImageUpload from "./ImageUpload";
import "./ImageList.css";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";

const ImageList = ({ images, onChangeImage, removeImage }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const imageArray = images.map((image) => {
    return image.image;
  });

  const showGallery = (index) => {
    setImageIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div>
      <div className="outer-grid">
        {images.map((image, index) => {
          return (
            <div
              className="inner-grid"
              key={`div-${index}`}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                showGallery(index);
              }}
            >
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
              >
                <Delete />
              </IconButton>

              <img
                key={index}
                onClick={() => {
                  showGallery(index);
                }}
                src={image.image}
                alt="Not Found!"
                style={{ cursor: "pointer" }}
              />
            </div>
          );
        })}
      </div>
      <div>
        <ImageViewer
          images={imageArray}
          isOpen={isGalleryOpen}
          imageIndex={imageIndex}
          onUpdateIndex={setImageIndex}
          onClose={() => {
            setIsGalleryOpen(false);
            setImageIndex(0);
          }}
        />
        <ImageUpload onChangeImage={onChangeImage} />
      </div>
    </div>
  );
};

export default ImageList;
