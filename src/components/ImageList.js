import React, { useState } from "react";
import ImageViewer from "./ImageViewer";
import ImageUpload from "./ImageUpload";
import "./ImageList.css";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";

const ImageList = ({ images, onChangeImage, removeImage }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const imageOjects = images.map((image) => {
    return {
      img: image,
    };
  });

  return (
    <div>
      <div className="outer-grid">
        {imageOjects.map((image, index) => {
          return (
            <div
              className="inner-grid"
              key={`div-${index}`}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setImageIndex(index);
                setIsGalleryOpen(true);
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
                  setImageIndex(index);
                  setIsGalleryOpen(true);
                }}
                src={image.img}
                alt="Product"
                style={{ cursor: "pointer" }}
              />
            </div>
          );
        })}
      </div>
      <div>
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
        <ImageUpload onChangeImage={onChangeImage} />
      </div>
    </div>
  );
};

export default ImageList;
