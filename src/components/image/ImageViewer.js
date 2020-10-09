import React from "react";
import Lightbox from "react-image-lightbox";

const customStyles = {
  overlay: {
    zIndex: "1000000",
  },
};

const ImageViewer = ({
  images,
  onUpdateIndex,
  imageIndex,
  isOpen,
  onClose,
}) => {
  return (
    <div>
      {isOpen && (
        <Lightbox
          reactModalStyle={customStyles}
          mainSrc={images[imageIndex]}
          nextSrc={images[(imageIndex + 1) % images.length]}
          prevSrc={images[(imageIndex + images.length - 1) % images.length]}
          onCloseRequest={onClose}
          onMovePrevRequest={() =>
            onUpdateIndex((imageIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            onUpdateIndex((imageIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default ImageViewer;
