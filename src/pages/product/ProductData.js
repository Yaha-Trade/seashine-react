import React from "react";
import callServer from "../../services/callServer";
import { withTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import { getLanguage } from "../../services/StorageManager";
import { LanguageEnum } from "../../enums/LanguageEnum";
import AutoComplete from "../../components/AutoComplete";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import ImageList from "../../components/ImageList";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Loading from "../../components/Loading";
import ImageCarousel from "../../components/ImageCarousel";
import TextField from "../../components/FormFields/TextField";
import CurrencyField from "../../components/FormFields/CurrencyField";
import DecimalField from "../../components/FormFields/DecimalField";
import IntegerField from "../../components/FormFields/IntegerField";

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
});

class ProductData extends React.Component {
  state = {
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
    isLoading: false,
  };

  onChangeForField = (id, newValue, onChange = () => {}) => {
    this.setState({
      [id]: newValue,
      errors: this.state.errors.filter((value) => {
        return id !== value;
      }),
    });
    onChange(newValue);
  };

  onChangeFactorySelect = (event, value) => {
    this.setState({ factory: value });
    if (value !== null) {
      this.setState({
        errors: this.state.errors.filter((value) => {
          return value !== "factory";
        }),
      });
    }
  };

  onChangePackingSelect = (event, value) => {
    this.setState({ packing: value });
    if (value !== null) {
      this.setState({
        errors: this.state.errors.filter((value) => {
          return value !== "packing";
        }),
      });
    }
  };

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  onChangeBoxLength = (newValue) => {
    const { boxWidth, boxHeight } = this.state;
    if (newValue !== "" && boxWidth !== "" && boxHeight !== "") {
      this.setState({
        boxCubage: newValue * boxWidth * boxHeight,
        errors: this.state.errors.filter((value) => {
          return (
            value !== "boxCubage" &&
            value !== "boxLength" &&
            value !== "boxWidth" &&
            value !== "boxHeight"
          );
        }),
      });
    } else {
      this.setState({
        boxCubage: "",
      });
    }
  };

  onChangeBoxWidth = (newValue) => {
    const { boxLength, boxHeight } = this.state;
    if (boxLength !== "" && newValue !== "" && boxHeight !== "") {
      this.setState({
        boxCubage: boxLength * newValue * boxHeight,
        errors: this.state.errors.filter((value) => {
          return (
            value !== "boxCubage" &&
            value !== "boxLength" &&
            value !== "boxWidth" &&
            value !== "boxHeight"
          );
        }),
      });
    } else {
      this.setState({
        boxCubage: "",
      });
    }
  };

  onChangeBoxHeight = (newValue) => {
    const { boxLength, boxWidth } = this.state;
    if (boxLength !== "" && boxWidth !== "" && newValue !== "") {
      this.setState({
        boxCubage: boxLength * boxWidth * newValue,
        errors: this.state.errors.filter((value) => {
          return (
            value !== "boxCubage" &&
            value !== "boxLength" &&
            value !== "boxWidth" &&
            value !== "boxHeight"
          );
        }),
      });
    } else {
      this.setState({
        boxCubage: "",
      });
    }
  };

  onChangeQuantityOfPieces = (newValue) => {
    const { quantityOfBoxesPerContainer } = this.state;
    if (newValue !== "" && quantityOfBoxesPerContainer !== "") {
      this.setState({
        quantityOfPiecesPerContainer: newValue * quantityOfBoxesPerContainer,
        errors: this.state.errors.filter((value) => {
          return (
            value !== "quantityOfPiecesPerContainer" &&
            value !== "quantityOfPieces" &&
            value !== "quantityOfBoxesPerContainer"
          );
        }),
      });
    } else {
      this.setState({
        quantityOfPiecesPerContainer: "",
      });
    }
  };

  onChangeQuantityOfBoxesPerContainer = (newValue) => {
    const { quantityOfPieces } = this.state;
    if (quantityOfPieces !== "" && newValue !== "") {
      this.setState({
        quantityOfPiecesPerContainer: quantityOfPieces * newValue,
        errors: this.state.errors.filter((value) => {
          return (
            value !== "quantityOfPiecesPerContainer" &&
            value !== "quantityOfPieces" &&
            value !== "quantityOfBoxesPerContainer"
          );
        }),
      });
    } else {
      this.setState({
        quantityOfPiecesPerContainer: "",
      });
    }
  };

  saveData = async (saveExit) => {
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
      certificationId,
      sound,
      light,
      motor,
      metalPart,
      clip,
      line,
      batteries,
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

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return;
    }

    this.setState({ isLoading: true });

    await this.props.onSave({
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
    });

    this.setState({ isLoading: false });

    if (saveExit) {
      this.props.onClose();
    } else {
      const { idProduct } = this.props;
      if (idProduct && idProduct !== -1) {
        this.fetchData(idProduct);
      }
    }
  };

  fetchData = (idProduct) => {
    callServer.get(`products/${idProduct}`).then((response) => {
      this.setState({
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
        quantityOfPiecesPerContainer:
          response.data.quantityOfPiecesPerContainer,
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
        images: response.data.images,
      });

      this.fetchImages();

      this.setState({ isLoading: false });
    });
  };

  fetchImages = () => {
    this.state.images.forEach(async (image, index) => {
      await this.getImageFromServer(image.id, index);
    });
  };

  componentDidMount() {
    const { idProduct } = this.props;

    if (idProduct && idProduct !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idProduct);
    }
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
      errors,
    } = this.state;
    const { t, classes } = this.props;

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
                  label={t("factory")}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
                  label={t("packing")}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CurrencyField
                  id="price"
                  label="price"
                  value={price}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="description"
                  label="description"
                  value={description}
                  required={true}
                  onChange={this.onChangeForField}
                  errors={errors}
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
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <IntegerField
                  id="quantityInner"
                  label="quantityinner"
                  value={quantityInner}
                  required={true}
                  onChange={this.onChangeForField}
                  error={errors}
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
                <DecimalField
                  id="packingLength"
                  label="packinglength"
                  value={packingLength}
                  required={true}
                  onChange={this.onChangeForField}
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="packingWidth"
                  label="packingwidth"
                  value={packingWidth}
                  required={true}
                  onChange={this.onChangeForField}
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="packingHeight"
                  label="packingheight"
                  value={packingHeight}
                  required={true}
                  onChange={this.onChangeForField}
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={3}>
                <IntegerField
                  id="quantityOfPieces"
                  label="quantityofpieces"
                  value={quantityOfPieces}
                  required={true}
                  callBack={this.onChangeQuantityOfPieces}
                  onChange={this.onChangeForField}
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <IntegerField
                  id="quantityOfBoxesPerContainer"
                  label="quantityofboxespercontainer"
                  value={quantityOfBoxesPerContainer}
                  required={true}
                  callBack={this.onChangeQuantityOfBoxesPerContainer}
                  onChange={this.onChangeForField}
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <IntegerField
                  id="quantityOfPiecesPerContainer"
                  label="quantityofpiecespercontainer"
                  value={quantityOfPiecesPerContainer}
                  required={true}
                  disabled={true}
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="boxGrossWeight"
                  label="boxgrossweight"
                  value={boxGrossWeight}
                  required={true}
                  onChange={this.onChangeForField}
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="boxNetWeight"
                  label="boxnetweight"
                  value={boxNetWeight}
                  required={true}
                  onChange={this.onChangeForField}
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="netWeightWithPacking"
                  label="netweightwithpacking"
                  value={netWeightWithPacking}
                  required={true}
                  onChange={this.onChangeForField}
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DecimalField
                  id="netWeightWithoutPacking"
                  label="netweightwithoutpacking"
                  value={netWeightWithoutPacking}
                  required={true}
                  onChange={this.onChangeForField}
                  error={errors}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };

  addNewLineBattery = () => {
    this.setState({
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
    this.setState({
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
    const { t, classes } = this.props;

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
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <IntegerField
            id="quantityOfParts"
            label="quantityofparts"
            value={quantityOfParts}
            required={true}
            onChange={this.onChangeForField}
            error={errors}
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
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <IntegerField
            id="model"
            label="model"
            value={model}
            required={true}
            onChange={this.onChangeForField}
            error={errors}
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
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Switch
                checked={sound === 1}
                onChange={(e) =>
                  this.setState({ sound: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="sound"
              />
            }
            label={t("sound")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={light === 1}
                onChange={(e) =>
                  this.setState({ light: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="light"
              />
            }
            label={t("light")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={motor === 1}
                onChange={(e) =>
                  this.setState({ motor: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="motor"
              />
            }
            label={t("motor")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={metalPart === 1}
                onChange={(e) =>
                  this.setState({ metalPart: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="metalPart"
              />
            }
            label={t("metalpart")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={clip === 1}
                onChange={(e) =>
                  this.setState({ clip: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="clip"
              />
            }
            label={t("clip")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={line === 1}
                onChange={(e) =>
                  this.setState({ line: e.target.checked ? 1 : 2 })
                }
                color="primary"
                name="line"
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
              <Tooltip title={t("add")}>
                <IconButton onClick={this.addNewLineBattery}>
                  <Add />
                </IconButton>
              </Tooltip>
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
                    <TableCell>{t("actions")}</TableCell>
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
                            this.setState({
                              batteries: batteries,
                              errors: this.state.errors.filter((value) => {
                                return id !== value;
                              }),
                            });
                          }}
                          errors={errors}
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
                            this.setState({
                              batteries: batteries,
                              errors: this.state.errors.filter((value) => {
                                return "batteryType" + index !== value;
                              }),
                            });
                          }}
                          selectedValue={row.batteryType}
                          hasErrors={errors.includes("batteryType" + index)}
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
                            this.setState({
                              batteries: batteries,
                              errors: this.state.errors.filter((value) => {
                                return "voltage" + index !== value;
                              }),
                            });
                          }}
                          selectedValue={row.voltage}
                          hasErrors={errors.includes("voltage" + index)}
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

                            this.setState({ batteries: batteries });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={t("delete")}>
                          <IconButton
                            onClick={() => this.removeLineBattery(index)}
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
        <Grid item xs={12} sm={12}>
          <TextField
            id="specialRequirements"
            label="specialrequirements"
            value={specialRequirements}
            multiline={true}
            rows={2}
            required={true}
            onChange={this.onChangeForField}
            error={errors}
          />
        </Grid>
      </Grid>
    );
  };

  dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1);
      n -= 1;
    }
    return new File([u8arr], filename, { type: mime });
  };

  getImageFromFile = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(this.dataURLtoFile(reader.result, file.name));
      };

      reader.readAsDataURL(file);
    });
  };

  saveImage = async (images) => {
    this.setState({ isLoading: true });
    const data = new FormData();
    for (let index = 0; index < images.length; index++) {
      data.append("images", await this.getImageFromFile(images[index]));
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    callServer
      .post(`/products/image/${this.props.idProduct}`, data, config)
      .then((response) => {
        const imageIds = response.data;
        imageIds.forEach((id) => {
          this.getImageFromServer(id);
        });
        this.setState({ isLoading: false });
      })
      .catch((error) => {});
  };

  getImageFromServer = async (imageId, index = undefined) => {
    const response = await callServer.get(`/products/image/${imageId}`, {
      responseType: "blob",
    });

    const reader = new FileReader();
    reader.onload = () => {
      if (index !== undefined) {
        const images = this.state.images;
        images[index].image = reader.result;
        this.setState({
          images: images,
        });
      } else {
        this.setState({
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
    const { idProduct } = this.props;
    callServer
      .delete(`products/image/${idProduct}/${imageId}`)
      .then((response) => {
        this.setState({
          images: this.state.images.filter((value, i) => {
            return index !== i;
          }),
        });
      });
  };

  ImageData = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <ImageList
            images={this.state.images}
            onChangeImage={this.saveImage}
            removeImage={this.removeImage}
          />
        </Grid>
      </Grid>
    );
  };

  render() {
    const { t, onClose, classes } = this.props;
    const { selectedTab, isLoading } = this.state;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="productdata"
          fullWidth
          minHeight="620px"
        >
          <Loading isOpen={isLoading} />
          <TabContext value={selectedTab}>
            <TabList onChange={this.handleTabChange}>
              <Tab label={t("factory")} value="1" />
              <Tab label={t("certification")} value="2" />
              <Tab
                label={t("picture")}
                disabled={this.props.idProduct === -1}
                value="3"
              />
            </TabList>
            <TabPanel className={classes.tabPanel} value="1">
              {this.ProductDataFactory()}
            </TabPanel>
            <TabPanel className={classes.tabPanel} value="2">
              {this.CertificationData()}
            </TabPanel>
            <TabPanel className={classes.tabPanel} value="3">
              {this.ImageData()}
            </TabPanel>
          </TabContext>
        </ModalData>
      </div>
    );
  }
}

export default withStyles(useStyles, { name: "ProductData" })(
  withTranslation()(ProductData)
);
