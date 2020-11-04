import React from "react";
import ModalData from "../../components/modal/ModalData";
import ImageSelector from "../../components/image/ImageSelector";
import callServer from "../../services/callServer";
import "../../components/image/ImageList.css";

class ImageData extends React.Component {
  state = {
    imagesIds: [],
  };

  fetchImages = () => {
    callServer
      .get(`/products/getimages/${this.props.idProduct}`)
      .then((response) => {
        const images = [-1, -1, -1, -1, -1];
        response.data.forEach((img) => {
          images[img.nrOrder] = img.id;
        });
        this.setState({ imagesIds: images });
      });
  };

  componentDidMount = () => {
    this.fetchImages();
  };

  render() {
    return (
      <div>
        <ModalData
          isOpen={true}
          onClose={this.props.onClose}
          title="picture"
          fullScreen={true}
          hasActions={false}
        >
          <div className="outer-grid">
            <ImageSelector
              id="1"
              imageId={this.state.imagesIds[1]}
              label="picture"
              idProduct={this.props.idProduct}
              onAddPicture={this.fetchImages}
            />
            <ImageSelector
              id="2"
              imageId={this.state.imagesIds[2]}
              label="picturewithpack"
              idProduct={this.props.idProduct}
              onAddPicture={this.fetchImages}
            />
            <ImageSelector
              id="3"
              imageId={this.state.imagesIds[3]}
              label="picturewithoutpack"
              idProduct={this.props.idProduct}
              onAddPicture={this.fetchImages}
            />
            <ImageSelector
              id="4"
              imageId={this.state.imagesIds[4]}
              label="picture4"
              idProduct={this.props.idProduct}
              onAddPicture={this.fetchImages}
            />
            <ImageSelector
              id="5"
              imageId={this.state.imagesIds[5]}
              label="picture5"
              idProduct={this.props.idProduct}
              onAddPicture={this.fetchImages}
            />
            <ImageSelector
              id="6"
              imageId={this.state.imagesIds[6]}
              label="picture6"
              idProduct={this.props.idProduct}
              onAddPicture={this.fetchImages}
            />
          </div>
        </ModalData>
      </div>
    );
  }
}

export default ImageData;
