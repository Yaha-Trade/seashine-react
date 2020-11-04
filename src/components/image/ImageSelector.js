import React, { useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import callServer from "../../services/callServer";
import { getImageFromFile } from "../../services/Utils";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";

const ImageSelector = ({ id, imageId, label, idProduct, onAddPicture }) => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);

  const handleUploadClick = async (event) => {
    const images = event.target.files;
    const order = event.target.id;
    const data = new FormData();
    data.append("images", await getImageFromFile(images[0]));

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    callServer
      .post(`/products/uploadimages/${idProduct}?order=${order}`, data, config)
      .then((response) => {
        onAddPicture(response.data[0]);
      })
      .catch((error) => {});
  };

  const getImageFromServer = async (imageId) => {
    const response = await callServer.get(`/products/getimage/${imageId}`, {
      responseType: "blob",
    });

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(response.data);
  };

  useEffect(() => {
    if (imageId !== undefined && imageId !== -1) {
      getImageFromServer(imageId);
    }
  }, [imageId]);

  const removeImage = () => {
    callServer
      .delete(`products/deleteimage/${idProduct}/${imageId}`)
      .then((response) => {
        setImage(null);
      });
  };

  return (
    <div className="inner-grid" key={`div`} style={{ cursor: "pointer" }}>
      <Typography variant="button" display="block" gutterBottom>
        {t(label)}
      </Typography>
      {image !== null && (
        <Fragment>
          <IconButton
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              removeImage();
            }}
          >
            <Delete />
          </IconButton>
          <img src={image} alt="Not Found!" style={{ cursor: "pointer" }} />
        </Fragment>
      )}

      {image === null && (
        <Fragment>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id={id}
            multiple
            type="file"
            onChange={handleUploadClick}
          />
          <label htmlFor={id}>
            <div
              style={{
                height: "300px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AddAPhotoOutlinedIcon
                style={{
                  height: "200",
                  width: "200",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
          </label>
        </Fragment>
      )}
    </div>
  );
};

export default ImageSelector;
