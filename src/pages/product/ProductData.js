import React, { Fragment } from "react";
import callServer from "../../services/callServer";
import { withTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import { getLanguage } from "../../services/StorageManager";
import { LanguageEnum } from "../../enums/LanguageEnum";
import AutoComplete from "../../components/formfields/AutoComplete";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import ImageList from "../../components/image/ImageList";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Loading from "../../components/Loading";
import ImageCarousel from "../../components/image/ImageCarousel";
import TextField from "../../components/formfields/TextField";
import CurrencyField from "../../components/formfields/CurrencyField";
import DecimalField from "../../components/formfields/DecimalField";
import IntegerField from "../../components/formfields/IntegerField";
import { ContainerEnum } from "../../enums/ContainerEnum";
import ProductHistory from "../../pages/product/ProductHistory";
import { getImageFromFile } from "../../services/Utils";

const useStyles = (theme) => ({
  tabPanel: {
    paddingTop: "10px",
    paddingRight: "0px",
    paddingLeft: "0px",
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
  dataDiv: {
    flexGrow: 1,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
});

class ProductData extends React.Component {
  _isMounted = false;

  state = {
    idProduct: this.props.idProduct,
    reference: "",
    price: "",
    description: "",
    quantityInner: "",
    quantityOfPieces: "",
    boxLength: "",
    boxWidth: "",
    boxHeight: "",
    packingLength: "",
    packingWidth: "",
    packingHeight: "",
    productLength: "",
    productWidth: "",
    productHeight: "",
    boxCubage: "",
    boxGrossWeight: "",
    boxNetWeight: "",
    netWeightWithPacking: "",
    netWeightWithoutPacking: "",
    quantityOfBoxesPerContainer: "",
    quantityOfPiecesPerContainer: "",
    factory: null,
    packing: null,
    certificationId: null,
    englishDescription: "",
    quantityOfParts: "",
    model: "",
    composition: "",
    color: "",
    specialRequirements: "",
    sound: 2,
    light: 2,
    motor: 2,
    metalPart: 2,
    clip: 2,
    line: 2,
    batteries: [],
    selectedTab: "1",
    errors: [],
    images: [],
    orderQuantityOfBoxes: "",
    isLoading: false,
    idParentProduct: -1,
    remarks: [],
  };

  onChangeForField = (id, newValue, onChange = () => {}) => {
    this.updateState({
      [id]: newValue,
      errors: this.state.errors.filter((value) => {
        return id !== value;
      }),
    });
    onChange(newValue);
  };

  onChangeFactorySelect = (event, value) => {
    this.updateState({ factory: value });
    if (value !== null) {
      this.updateState({
        errors: this.state.errors.filter((value) => {
          return value !== "factory";
        }),
      });
    }
  };

  onChangePackingSelect = (event, value) => {
    this.updateState({ packing: value });
    if (value !== null) {
      this.updateState({
        errors: this.state.errors.filter((value) => {
          return value !== "packing";
        }),
      });
    }
  };

  handleTabChange = async (event, newValue) => {
    this.updateState({ selectedTab: newValue });
  };

  calculateBoxCubage = (width, height, length) => {
    if (width !== "" && height !== "" && length !== "") {
      const newBoxCubage = (width * height * length) / 1000000;
      const newQuantityOfBoxPerContainer = Math.floor(
        ContainerEnum.CUBAGECONTAINER / newBoxCubage
      );
      const newQuantityOfPiecesPerContainer =
        this.state.quantityOfPieces !== ""
          ? Math.floor(
              this.state.quantityOfPieces * newQuantityOfBoxPerContainer
            )
          : "";

      const errosFields = [
        "boxCubage",
        "boxLength",
        "boxWidth",
        "boxHeight",
        "quantityOfBoxesPerContainer",
      ];

      if (newQuantityOfPiecesPerContainer !== "") {
        errosFields.push("quantityOfPiecesPerContainer");
      }

      this.updateState({
        boxCubage: newBoxCubage,
        quantityOfBoxesPerContainer: newQuantityOfBoxPerContainer,
        quantityOfPiecesPerContainer: newQuantityOfPiecesPerContainer,
        errors: this.state.errors.filter((value) => {
          return !errosFields.includes(value);
        }),
      });
    } else {
      this.updateState({
        boxCubage: "",
        quantityOfBoxesPerContainer: "",
        quantityOfPiecesPerContainer: "",
      });
    }
  };

  onChangeBoxLength = (newValue) => {
    const { boxWidth, boxHeight } = this.state;
    this.calculateBoxCubage(boxWidth, boxHeight, newValue);
  };

  onChangeBoxWidth = (newValue) => {
    const { boxLength, boxHeight } = this.state;
    this.calculateBoxCubage(newValue, boxHeight, boxLength);
  };

  onChangeBoxHeight = (newValue) => {
    const { boxLength, boxWidth } = this.state;
    this.calculateBoxCubage(boxWidth, newValue, boxLength);
  };

  onChangeQuantityOfPieces = (newValue) => {
    const { quantityOfBoxesPerContainer } = this.state;
    if (newValue !== "" && quantityOfBoxesPerContainer !== "") {
      this.updateState({
        quantityOfPiecesPerContainer: newValue * quantityOfBoxesPerContainer,
        errors: this.state.errors.filter((value) => {
          return (
            value !== "quantityOfPiecesPerContainer" &&
            value !== "quantityOfPieces"
          );
        }),
      });
    } else {
      this.updateState({
        quantityOfPiecesPerContainer: "",
      });
    }
  };

  saveData = async (saveExit) => {
    if (!this.checkRequiredFields()) {
      return;
    }

    this.updateState({ isLoading: true });

    await this.props.onSave(this.createProductObject());

    this.updateState({ isLoading: false });

    if (saveExit) {
      this.props.onClose();
    } else {
      const { idProduct } = this.state;
      if (idProduct && idProduct !== -1) {
        this.fetchData(idProduct, -1);
      }
    }
  };

  checkRequiredFields = () => {
    const errors = [];
    const {
      reference,
      description,
      factory,
      packing,
      price,
      quantityInner,
      quantityOfPieces,
      boxLength,
      boxWidth,
      boxHeight,
      packingLength,
      packingWidth,
      packingHeight,
      productLength,
      productWidth,
      productHeight,
      boxCubage,
      boxGrossWeight,
      boxNetWeight,
      netWeightWithPacking,
      netWeightWithoutPacking,
      quantityOfBoxesPerContainer,
      quantityOfPiecesPerContainer,
      englishDescription,
      quantityOfParts,
      composition,
      model,
      color,
      specialRequirements,
      batteries,
      remarks,
      orderQuantityOfBoxes,
    } = this.state;

    if (reference === "") {
      errors.push("reference");
    }

    if (description === "") {
      errors.push("description");
    }

    if (factory === null) {
      errors.push("factory");
    }

    if (packing === null) {
      errors.push("packing");
    }

    if (price === "") {
      errors.push("price");
    }

    if (quantityInner === "") {
      errors.push("quantityInner");
    }

    if (quantityOfPieces === "") {
      errors.push("quantityOfPieces");
    }

    if (boxLength === "") {
      errors.push("boxLength");
    }

    if (boxWidth === "") {
      errors.push("boxWidth");
    }

    if (boxHeight === "") {
      errors.push("boxHeight");
    }

    if (packingLength === "") {
      errors.push("packingLength");
    }

    if (packingWidth === "") {
      errors.push("packingWidth");
    }

    if (packingHeight === "") {
      errors.push("packingHeight");
    }

    if (productLength === "") {
      errors.push("productLength");
    }

    if (productWidth === "") {
      errors.push("productWidth");
    }

    if (productHeight === "") {
      errors.push("productHeight");
    }

    if (boxCubage === "") {
      errors.push("boxCubage");
    }

    if (boxGrossWeight === "") {
      errors.push("boxGrossWeight");
    }

    if (boxNetWeight === "") {
      errors.push("boxNetWeight");
    }

    if (netWeightWithPacking === "") {
      errors.push("netWeightWithPacking");
    }

    if (netWeightWithoutPacking === "") {
      errors.push("netWeightWithoutPacking");
    }

    if (quantityOfBoxesPerContainer === "") {
      errors.push("quantityOfBoxesPerContainer");
    }

    if (quantityOfPiecesPerContainer === "") {
      errors.push("quantityOfPiecesPerContainer");
    }

    if (englishDescription === "") {
      errors.push("englishDescription");
    }

    if (quantityOfParts === "") {
      errors.push("quantityOfParts");
    }

    if (composition === "") {
      errors.push("composition");
    }

    if (model === "") {
      errors.push("model");
    }

    if (color === "") {
      errors.push("color");
    }

    if (specialRequirements === "") {
      errors.push("specialRequirements");
    }

    batteries.forEach((battery, index) => {
      if (battery.quantity === "") {
        errors.push("quantity" + index);
      }

      if (battery.batteryType === null) {
        errors.push("batteryType" + index);
      }

      if (battery.voltage === null) {
        errors.push("voltage" + index);
      }
    });

    remarks.forEach((remark, index) => {
      if (remark.name === "") {
        errors.push("remark" + index);
      }
    });

    if (this.props.isOrder && orderQuantityOfBoxes === "") {
      errors.push("orderQuantityOfBoxes");
    }

    this.updateState({
      errors: errors,
    });

    if (errors.length > 0) {
      return false;
    }

    return true;
  };

  createProductObject = () => {
    const {
      reference,
      description,
      factory,
      packing,
      price,
      quantityInner,
      quantityOfPieces,
      boxLength,
      boxWidth,
      boxHeight,
      packingLength,
      packingWidth,
      packingHeight,
      productLength,
      productWidth,
      productHeight,
      boxCubage,
      boxGrossWeight,
      boxNetWeight,
      netWeightWithPacking,
      netWeightWithoutPacking,
      quantityOfBoxesPerContainer,
      quantityOfPiecesPerContainer,
      englishDescription,
      quantityOfParts,
      composition,
      model,
      color,
      specialRequirements,
      certificationId,
      sound,
      light,
      motor,
      metalPart,
      clip,
      line,
      batteries,
      idProduct,
      remarks,
    } = this.state;

    return {
      id: idProduct,
      reference,
      description,
      factory: { id: factory.id },
      packing: { id: packing.id },
      price,
      quantityInner,
      quantityOfPieces,
      boxLength,
      boxWidth,
      boxHeight,
      packingLength,
      packingWidth,
      packingHeight,
      productLength,
      productWidth,
      productHeight,
      boxCubage,
      boxGrossWeight,
      boxNetWeight,
      netWeightWithPacking,
      netWeightWithoutPacking,
      quantityOfBoxesPerContainer,
      quantityOfPiecesPerContainer,
      certification: {
        id: certificationId,
        englishDescription,
        quantityOfParts,
        composition,
        model,
        color,
        specialRequirements,
        sound,
        light,
        motor,
        metalPart,
        clip,
        line,
        batteries,
      },
      remarks,
    };
  };

  createOrderItemObject = () => {
    const {
      orderQuantityOfBoxes,
      quantityOfPieces,
      price,
      boxCubage,
    } = this.state;

    const { idOrdemItem } = this.props;

    const orderTotalPieces = orderQuantityOfBoxes * quantityOfPieces;

    return {
      id: idOrdemItem && idOrdemItem !== -1 ? idOrdemItem : null,
      quantityOfBoxes: orderQuantityOfBoxes,
      quantityOfPiecesPerBox: quantityOfPieces,
      totalQuantityOfPieces: orderTotalPieces,
      totalPrice: orderTotalPieces * price,
      totalCubage: boxCubage * orderQuantityOfBoxes,
      unitPrice: price,
    };
  };

  fetchData = async (idProduct, idOrdemItem) => {
    if (idOrdemItem && idOrdemItem !== -1) {
      const response = await callServer.get(`orderlistitems/${idOrdemItem}`);
      idProduct = response.data.productId;
      this.updateState({
        orderQuantityOfBoxes: response.data.quantityOfBoxes,
        idProduct,
      });
    }

    const response = await callServer.get(`products/${idProduct}`);

    this.updateState({
      reference: response.data.reference,
      description: response.data.description,
      price: response.data.price,
      quantityInner: response.data.quantityInner,
      quantityOfPieces: response.data.quantityOfPieces,
      boxLength: response.data.boxLength,
      boxWidth: response.data.boxWidth,
      boxHeight: response.data.boxHeight,
      packingLength: response.data.packingLength,
      packingWidth: response.data.packingWidth,
      packingHeight: response.data.packingHeight,
      productLength: response.data.productLength,
      productWidth: response.data.productWidth,
      productHeight: response.data.productHeight,
      boxCubage: response.data.boxCubage,
      boxGrossWeight: response.data.boxGrossWeight,
      boxNetWeight: response.data.boxNetWeight,
      netWeightWithPacking: response.data.netWeightWithPacking,
      netWeightWithoutPacking: response.data.netWeightWithoutPacking,
      quantityOfBoxesPerContainer: response.data.quantityOfBoxesPerContainer,
      quantityOfPiecesPerContainer: response.data.quantityOfPiecesPerContainer,
      factory: {
        id: response.data.factory.id,
        name: response.data.factory.name,
      },
      packing: {
        id: response.data.packing.id,
        englishName: response.data.packing.englishName,
        chineseName: response.data.packing.chineseName,
      },

      certificationId: response.data.certification.id,
      englishDescription: response.data.certification.englishDescription,
      quantityOfParts: response.data.certification.quantityOfParts,
      composition: response.data.certification.composition,
      model: response.data.certification.model,
      color: response.data.certification.color,
      specialRequirements: response.data.certification.specialRequirements,
      sound: response.data.certification.sound,
      light: response.data.certification.light,
      motor: response.data.certification.motor,
      metalPart: response.data.certification.metalPart,
      clip: response.data.certification.clip,
      line: response.data.certification.line,
      batteries: response.data.certification.batteries,
      remarks: response.data.remarks,
      images: response.data.images,
      idParentProduct:
        response.data.parentProduct !== null
          ? response.data.parentProduct.id
          : -1,
    });

    this.fetchImages();

    this.updateState({ isLoading: false });
  };

  fetchImages = () => {
    this.state.images.forEach(async (image, index) => {
      await this.getImageFromServer(image.id, index);
    });
  };

  updateState = (newStateObject) => {
    if (this._isMounted) {
      this.setState(newStateObject);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    const { idOrdemItem } = this.props;
    const { idProduct } = this.state;

    if (
      (idProduct && idProduct !== -1) ||
      (idOrdemItem && idOrdemItem !== -1)
    ) {
      this.updateState({ isLoading: true });
      this.fetchData(idProduct, idOrdemItem);
    }
    this._isMounted = true;
  }

  getImageCarousel = () => {
    const { images } = this.state;
    if (images.length === 0) {
      return null;
    }

    return (
      <Grid item>
        <ImageCarousel images={images} />
      </Grid>
    );
  };

  ProductDataFactory = () => {
    const {
      reference,
      description,
      factory,
      packing,
      price,
      quantityInner,
      quantityOfPieces,
      boxLength,
      boxWidth,
      boxHeight,
      packingLength,
      packingWidth,
      packingHeight,
      productLength,
      productWidth,
      productHeight,
      boxCubage,
      boxGrossWeight,
      boxNetWeight,
      netWeightWithPacking,
      netWeightWithoutPacking,
      quantityOfBoxesPerContainer,
      quantityOfPiecesPerContainer,
      orderQuantityOfBoxes,
      errors,
    } = this.state;
    const { classes, isOrder, isView } = this.props;

    const isEnglishLanguage = getLanguage() === LanguageEnum.ENGLISH;

    return (
      <div className={classes.dataDiv}>
        <Grid container spacing={1}>
          {this.getImageCarousel()}
          <Grid item xs={12} sm container>
            <Grid item xs container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="reference"
                  label="reference"
                  value={reference}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <AutoComplete
                  id="factory"
                  dataSource="factories"
                  idField="id"
                  displayField="name"
                  onChange={this.onChangeFactorySelect}
                  selectedValue={factory}
                  hasErrors={errors.includes("factory")}
                  label="factory"
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={isOrder ? 2 : 3}>
                <AutoComplete
                  id="packing"
                  dataSource="packings"
                  idField="id"
                  displayField={
                    isEnglishLanguage ? "englishName" : "chineseName"
                  }
                  onChange={this.onChangePackingSelect}
                  selectedValue={packing}
                  hasErrors={errors.includes("packing")}
                  label="packing"
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={isOrder ? 2 : 3}>
                <CurrencyField
                  id="price"
                  label="price"
                  value={price}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isView}
                />
              </Grid>
              {isOrder && (
                <Grid item xs={12} sm={2}>
                  <IntegerField
                    id="orderQuantityOfBoxes"
                    label="ordermasterqty"
                    value={orderQuantityOfBoxes}
                    required={true}
                    onChange={this.onChangeForField}
                    errors={errors}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={12}>
                <TextField
                  id="description"
                  label="description"
                  value={description}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="productLength"
                  label="productlength"
                  value={productLength}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="productWidth"
                  label="productwidth"
                  value={productWidth}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="productHeight"
                  label="productheight"
                  value={productHeight}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <IntegerField
                  id="quantityInner"
                  label="quantityinner"
                  value={quantityInner}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="packingLength"
                  label="packinglength"
                  value={packingLength}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="packingWidth"
                  label="packingwidth"
                  value={packingWidth}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="packingHeight"
                  label="packingheight"
                  value={packingHeight}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="boxLength"
                  label="boxlength"
                  value={boxLength}
                  required={true}
                  callBack={this.onChangeBoxLength}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="boxWidth"
                  label="boxwidth"
                  value={boxWidth}
                  required={true}
                  callBack={this.onChangeBoxWidth}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="boxHeight"
                  label="boxheight"
                  value={boxHeight}
                  required={true}
                  callBack={this.onChangeBoxHeight}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="boxCubage"
                  label="boxcubage"
                  value={boxCubage}
                  required={true}
                  disabled={true}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <IntegerField
                  id="quantityOfPieces"
                  label="quantityofpieces"
                  value={quantityOfPieces}
                  required={true}
                  callBack={this.onChangeQuantityOfPieces}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <IntegerField
                  id="quantityOfBoxesPerContainer"
                  label="quantityofboxespercontainer"
                  value={quantityOfBoxesPerContainer}
                  required={true}
                  errors={errors}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <IntegerField
                  id="quantityOfPiecesPerContainer"
                  label="quantityofpiecespercontainer"
                  value={quantityOfPiecesPerContainer}
                  required={true}
                  disabled={true}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="boxGrossWeight"
                  label="boxgrossweight"
                  value={boxGrossWeight}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="boxNetWeight"
                  label="boxnetweight"
                  value={boxNetWeight}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="netWeightWithPacking"
                  label="netweightwithpacking"
                  value={netWeightWithPacking}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="netWeightWithoutPacking"
                  label="netweightwithoutpacking"
                  value={netWeightWithoutPacking}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                  disabled={isOrder || isView}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };

  addNewLineBattery = () => {
    this.updateState({
      batteries: [
        ...this.state.batteries,
        {
          id: null,
          numberOrder: this.state.batteries.length,
          quantity: "",
          batteryType: null,
          included: 2,
          voltage: null,
        },
      ],
    });
  };

  removeLineBattery = (index) => {
    this.updateState({
      batteries: this.state.batteries.filter((value, i) => {
        return index !== i;
      }),
    });
  };

  CertificationData = () => {
    const {
      englishDescription,
      quantityOfParts,
      composition,
      model,
      color,
      specialRequirements,
      sound,
      light,
      motor,
      metalPart,
      clip,
      line,
      batteries,
      errors,
    } = this.state;
    const { t, classes, isOrder, isView } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="englishDescription"
            label="englishdescription"
            value={englishDescription}
            required={true}
            onChange={this.onChangeForField}
            errors={errors}
            disabled={isOrder || isView}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <IntegerField
            id="quantityOfParts"
            label="quantityofparts"
            value={quantityOfParts}
            required={true}
            onChange={this.onChangeForField}
            errors={errors}
            disabled={isOrder || isView}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="composition"
            label="composition"
            value={composition}
            required={true}
            onChange={this.onChangeForField}
            errors={errors}
            disabled={isOrder || isView}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <IntegerField
            id="model"
            label="model"
            value={model}
            required={true}
            onChange={this.onChangeForField}
            errors={errors}
            disabled={isOrder || isView}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="color"
            label="color"
            value={color}
            required={true}
            onChange={this.onChangeForField}
            errors={errors}
            disabled={isOrder || isView}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Switch
                checked={sound === 1}
                onChange={(e) =>
                  this.updateState({ sound: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="sound"
                disabled={isOrder || isView}
              />
            }
            label={t("sound")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={light === 1}
                onChange={(e) =>
                  this.updateState({ light: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="light"
                disabled={isOrder || isView}
              />
            }
            label={t("light")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={motor === 1}
                onChange={(e) =>
                  this.updateState({ motor: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="motor"
                disabled={isOrder || isView}
              />
            }
            label={t("motor")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={metalPart === 1}
                onChange={(e) =>
                  this.updateState({ metalPart: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="metalPart"
                disabled={isOrder || isView}
              />
            }
            label={t("metalpart")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={clip === 1}
                onChange={(e) =>
                  this.updateState({ clip: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="clip"
                disabled={isOrder || isView}
              />
            }
            label={t("clip")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={line === 1}
                onChange={(e) =>
                  this.updateState({ line: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="line"
                disabled={isOrder || isView}
              />
            }
            label={t("line")}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper>
            <Toolbar className={classes.root}>
              <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                {t("battery")}
              </Typography>
              {!isOrder && !isView && (
                <Tooltip title={t("add")}>
                  <IconButton onClick={this.addNewLineBattery}>
                    <Add />
                  </IconButton>
                </Tooltip>
              )}
            </Toolbar>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "20%" }}>
                      {t("quantity")}
                    </TableCell>
                    <TableCell>{t("type")}</TableCell>
                    <TableCell>{t("voltage")}</TableCell>
                    <TableCell>{t("included")}</TableCell>
                    {!isOrder && !isView && (
                      <TableCell>{t("actions")}</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {batteries.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <IntegerField
                          id={"quantity" + index}
                          value={row.quantity}
                          required={true}
                          size="small"
                          onChange={(id, value) => {
                            const batteries = this.state.batteries;
                            batteries[index].quantity = value;
                            this.updateState({
                              batteries: batteries,
                              errors: this.state.errors.filter((value) => {
                                return id !== value;
                              }),
                            });
                          }}
                          errors={errors}
                          disabled={isOrder || isView}
                        />
                      </TableCell>
                      <TableCell>
                        <AutoComplete
                          id={"batteryType" + index}
                          dataSource="batterytypes"
                          idField="id"
                          displayField="name"
                          onChange={(event, value) => {
                            const batteries = this.state.batteries;
                            batteries[index].batteryType = value;
                            this.updateState({
                              batteries: batteries,
                              errors: this.state.errors.filter((value) => {
                                return "batteryType" + index !== value;
                              }),
                            });
                          }}
                          selectedValue={row.batteryType}
                          hasErrors={errors.includes("batteryType" + index)}
                          disabled={isOrder || isView}
                        />
                      </TableCell>
                      <TableCell>
                        <AutoComplete
                          id={"voltage" + index}
                          dataSource="voltages"
                          idField="id"
                          displayField="name"
                          onChange={(event, value) => {
                            const batteries = this.state.batteries;
                            batteries[index].voltage = value;
                            this.updateState({
                              batteries: batteries,
                              errors: this.state.errors.filter((value) => {
                                return "voltage" + index !== value;
                              }),
                            });
                          }}
                          selectedValue={row.voltage}
                          hasErrors={errors.includes("voltage" + index)}
                          disabled={isOrder || isView}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          id={"included" + index}
                          color="primary"
                          name="line"
                          checked={this.state.batteries[index].included === 1}
                          onChange={(e) => {
                            const batteries = this.state.batteries;
                            batteries[index].included = e.target.checked
                              ? 1
                              : 2;

                            this.updateState({ batteries: batteries });
                          }}
                          disabled={isOrder || isView}
                        />
                      </TableCell>
                      {!isOrder && !isView && (
                        <TableCell>
                          <Tooltip title={t("delete")}>
                            <IconButton
                              onClick={() => this.removeLineBattery(index)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="specialRequirements"
            label="specialrequirements"
            value={specialRequirements}
            multiline={true}
            rows={2}
            required={true}
            onChange={this.onChangeForField}
            errors={errors}
            disabled={isOrder || isView}
          />
        </Grid>
      </Grid>
    );
  };

  saveImage = async (images) => {
    this.updateState({ isLoading: true });
    const data = new FormData();
    for (let index = 0; index < images.length; index++) {
      data.append("images", await getImageFromFile(images[index]));
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    callServer
      .post(`/products/uploadimages/${this.state.idProduct}`, data, config)
      .then((response) => {
        const imageIds = response.data;
        imageIds.forEach((id) => {
          this.getImageFromServer(id);
        });
        this.updateState({ isLoading: false });
      })
      .catch((error) => {});
  };

  getImageFromServer = async (imageId, index = undefined) => {
    const response = await callServer.get(`/products/getimage/${imageId}`, {
      responseType: "blob",
    });

    const reader = new FileReader();
    reader.onload = () => {
      if (index !== undefined) {
        const images = this.state.images;
        images[index].image = reader.result;
        this.updateState({
          images: images,
        });
      } else {
        this.updateState({
          images: [
            ...this.state.images,
            {
              id: imageId,
              image: reader.result,
            },
          ],
        });
      }
    };

    reader.readAsDataURL(response.data);
  };

  removeImage = (index) => {
    const imageId = this.state.images[index].id;
    const { idProduct } = this.state;
    callServer
      .delete(`products/deleteimage/${idProduct}/${imageId}`)
      .then((response) => {
        this.updateState({
          images: this.state.images.filter((value, i) => {
            return index !== i;
          }),
        });
      });
  };

  ImageData = () => {
    const { isView } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <ImageList
            images={this.state.images}
            onChangeImage={this.saveImage}
            removeImage={this.removeImage}
            isView={isView}
          />
        </Grid>
      </Grid>
    );
  };

  handleNext = async (saveExit) => {
    if (!this.checkRequiredFields()) {
      return;
    }

    this.updateState({ isLoading: true });

    await this.props.onSave(
      this.createProductObject(),
      this.createOrderItemObject()
    );

    this.updateState({ isLoading: false });

    if (saveExit) {
      this.props.onClose();
    }
  };

  addNewLineRemark = () => {
    this.updateState({
      remarks: [
        ...this.state.remarks,
        {
          id: null,
          name: "",
        },
      ],
    });
  };

  removeLineRemark = (index) => {
    this.updateState({
      remarks: this.state.remarks.filter((value, i) => {
        return index !== i;
      }),
    });
  };

  RemarksData = () => {
    const { remarks, errors } = this.state;
    const { t, classes, isOrder } = this.props;

    return (
      <Grid item xs={12} sm={12}>
        <Paper>
          <Toolbar className={classes.root}>
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {t("remarks")}
            </Typography>
            <Tooltip title={t("add")}>
              <IconButton onClick={this.addNewLineRemark}>
                <Add />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "95%" }}>{t("name")}</TableCell>
                  <TableCell>{t("actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {remarks.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <TextField
                        disabled={!isOrder}
                        id={"remark" + index}
                        value={row.name}
                        required={true}
                        size="small"
                        onChange={(id, value) => {
                          const remarks = this.state.remarks;
                          remarks[index].name = value;
                          this.updateState({
                            remarks: remarks,
                            errors: this.state.errors.filter((value) => {
                              return id !== value;
                            }),
                          });
                        }}
                        errors={errors}
                      />
                    </TableCell>

                    <TableCell>
                      <Tooltip title={t("delete")}>
                        <IconButton
                          onClick={() => this.removeLineRemark(index)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    );
  };

  getContent = () => {
    const { t, classes, isOrder } = this.props;
    const { idProduct, idParentProduct, selectedTab, isLoading } = this.state;

    return (
      <Fragment>
        <Loading isOpen={isLoading} />
        <TabContext value={selectedTab}>
          <TabList onChange={this.handleTabChange} variant="scrollable">
            <Tab label={t("factory")} value="1" />
            <Tab
              label={t("remarks")}
              value="2"
              style={{ display: isOrder ? "block" : "none" }}
            />
            <Tab label={t("certification")} value="3" />
            <Tab
              label={t("picture")}
              style={{
                display: idProduct === -1 || isOrder ? "none" : "block",
              }}
              value="4"
            />
            <Tab label={t("purchasehistory")} value="5" />
          </TabList>
          <TabPanel className={classes.tabPanel} value="1">
            {this.ProductDataFactory()}
          </TabPanel>
          <TabPanel className={classes.tabPanel} value="2">
            {this.RemarksData()}
          </TabPanel>
          <TabPanel className={classes.tabPanel} value="3">
            {this.CertificationData()}
          </TabPanel>
          <TabPanel className={classes.tabPanel} value="4">
            {this.ImageData()}
          </TabPanel>
          <TabPanel className={classes.tabPanel} value="5">
            <ProductHistory
              idProduct={idParentProduct !== -1 ? idParentProduct : idProduct}
              isOrder={isOrder}
            />
          </TabPanel>
        </TabContext>
      </Fragment>
    );
  };

  render() {
    const {
      t,
      onClose,
      isOrder,
      classes,
      handleBack,
      idOrdemItem,
      isView,
    } = this.props;

    if (isOrder && (idOrdemItem === undefined || idOrdemItem === -1)) {
      return (
        <div>
          <div>{this.getContent()}</div>

          <div className={classes.actionsContainer}>
            <div>
              <Button onClick={onClose} className={classes.button}>
                {t("cancel")}
              </Button>
              <Button onClick={handleBack} className={classes.button}>
                {t("back")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.handleNext(false)}
              >
                {t("finish")}
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <ModalData
            onSave={
              idOrdemItem && idOrdemItem !== -1
                ? this.handleNext
                : this.saveData
            }
            isOpen={true}
            onClose={onClose}
            title="productdata"
            fullWidth
            fullScreen={idOrdemItem && idOrdemItem !== -1}
            minHeight="620px"
            hasActions={!isView}
          >
            {this.getContent()}
          </ModalData>
        </div>
      );
    }
  }
}

export default withStyles(useStyles, { name: "ProductData" })(
  withTranslation()(ProductData)
);
