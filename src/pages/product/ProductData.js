import React from "react";
import TextField from "@material-ui/core/TextField";
import callServer from "../../services/callServer";
import { withTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import { getLanguage } from "../../services/StorageManager";
import { LanguageEnum } from "../../enums/LanguageEnum";
import AutoComplete from "../../components/AutoComplete";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { CurrencyEnum } from "../../enums/CurrencyEnum";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import ImageList from "../../components/ImageList";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  tabPanel: {
    paddingTop: "10px",
    paddingRight: "0px",
    paddingLeft: "0px",
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
    selectedTab: "1",
    errors: [],
  };

  onChangeForField = (
    id,
    newValue,
    onlyNumbers = false,
    onChange = () => {}
  ) => {
    const onlyNumbersExpression = /^[0-9\b]+$/;
    if (!onlyNumbers) {
      this.setState({
        [id]: newValue,
        errors: this.state.errors.filter((value) => {
          return id !== value;
        }),
      });
      onChange(newValue);
    } else if (newValue === "" || onlyNumbersExpression.test(newValue)) {
      this.setState({
        [id]: newValue,
        errors: this.state.errors.filter((value) => {
          return id !== value;
        }),
      });
      onChange(newValue);
    }
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

  saveData = () => {
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

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return;
    }

    this.props.onSave({
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
      },
    });

    this.props.onClose();
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
      });
    });
  };

  componentDidMount() {
    const { idProduct } = this.props;

    if (idProduct && idProduct !== -1) {
      this.fetchData(idProduct);
    }
  }

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
    const { t } = this.props;
    const errorMessage = t("requiredfield");

    const isEnglishLanguage = getLanguage() === LanguageEnum.ENGLISH;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            id="reference"
            label={t("reference")}
            variant="outlined"
            value={reference}
            fullWidth
            required={true}
            size="small"
            onChange={(e) => this.onChangeForField(e.target.id, e.target.value)}
            error={errors.includes("reference")}
            helperText={errors.includes("reference") && errorMessage}
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
            displayField={isEnglishLanguage ? "englishName" : "chineseName"}
            onChange={this.onChangePackingSelect}
            selectedValue={packing}
            hasErrors={errors.includes("packing")}
            label={t("packing")}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CurrencyTextField
            id="price"
            label={t("price")}
            size="small"
            variant="outlined"
            value={price}
            fullWidth
            required={true}
            currencySymbol={CurrencyEnum.CURRENCYSYMBOL}
            outputFormat="string"
            decimalCharacter={CurrencyEnum.DECIMALCHARACTER}
            digitGroupSeparator={CurrencyEnum.DIGITGROUPSEPARATOR}
            onChange={(event, value) => {
              this.setState({
                price: value,
                errors: this.state.errors.filter((value) => {
                  return value !== "price";
                }),
              });
            }}
            error={errors.includes("price")}
            helperText={errors.includes("price") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            label={t("description")}
            variant="outlined"
            value={description}
            fullWidth
            required={true}
            size="small"
            onChange={(e) => this.onChangeForField(e.target.id, e.target.value)}
            error={errors.includes("description")}
            helperText={errors.includes("description") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="productLength"
            label={t("productlength")}
            variant="outlined"
            value={productLength}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("productLength")}
            helperText={errors.includes("productLength") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="productWidth"
            label={t("productwidth")}
            variant="outlined"
            value={productWidth}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("productWidth")}
            helperText={errors.includes("productWidth") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="productHeight"
            label={t("productheight")}
            variant="outlined"
            value={productHeight}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("productHeight")}
            helperText={errors.includes("productHeight") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="quantityInner"
            label={t("quantityinner")}
            variant="outlined"
            value={quantityInner}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("quantityInner")}
            helperText={errors.includes("quantityInner") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="boxLength"
            label={t("boxlength")}
            variant="outlined"
            value={boxLength}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(
                e.target.id,
                e.target.value,
                true,
                this.onChangeBoxLength
              )
            }
            error={errors.includes("boxLength")}
            helperText={errors.includes("boxLength") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="boxWidth"
            label={t("boxwidth")}
            variant="outlined"
            value={boxWidth}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(
                e.target.id,
                e.target.value,
                true,
                this.onChangeBoxWidth
              )
            }
            error={errors.includes("boxWidth")}
            helperText={errors.includes("boxWidth") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="boxHeight"
            label={t("boxheight")}
            variant="outlined"
            value={boxHeight}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(
                e.target.id,
                e.target.value,
                true,
                this.onChangeBoxHeight
              )
            }
            error={errors.includes("boxHeight")}
            helperText={errors.includes("boxHeight") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="boxCubage"
            label={t("boxcubage")}
            variant="outlined"
            value={boxCubage}
            fullWidth
            required={true}
            size="small"
            disabled
            error={errors.includes("boxCubage")}
            helperText={errors.includes("boxCubage") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="packingLength"
            label={t("packinglength")}
            variant="outlined"
            value={packingLength}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("packingLength")}
            helperText={errors.includes("packingLength") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="packingWidth"
            label={t("packingwidth")}
            variant="outlined"
            value={packingWidth}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("packingWidth")}
            helperText={errors.includes("packingWidth") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="packingHeight"
            label={t("packingheight")}
            variant="outlined"
            value={packingHeight}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("packingHeight")}
            helperText={errors.includes("packingHeight") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="quantityOfPieces"
            label={t("quantityofpieces")}
            variant="outlined"
            value={quantityOfPieces}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(
                e.target.id,
                e.target.value,
                true,
                this.onChangeQuantityOfPieces
              )
            }
            error={errors.includes("quantityOfPieces")}
            helperText={errors.includes("quantityOfPieces") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="quantityOfBoxesPerContainer"
            label={t("quantityofboxespercontainer")}
            variant="outlined"
            value={quantityOfBoxesPerContainer}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(
                e.target.id,
                e.target.value,
                true,
                this.onChangeQuantityOfBoxesPerContainer
              )
            }
            error={errors.includes("quantityOfBoxesPerContainer")}
            helperText={
              errors.includes("quantityOfBoxesPerContainer") && errorMessage
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="quantityOfPiecesPerContainer"
            label={t("quantityofpiecespercontainer")}
            variant="outlined"
            value={quantityOfPiecesPerContainer}
            fullWidth
            required={true}
            disabled
            size="small"
            error={errors.includes("quantityOfPiecesPerContainer")}
            helperText={
              errors.includes("quantityOfPiecesPerContainer") && errorMessage
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="boxGrossWeight"
            label={t("boxgrossweight")}
            variant="outlined"
            value={boxGrossWeight}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("boxGrossWeight")}
            helperText={errors.includes("boxGrossWeight") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="boxNetWeight"
            label={t("boxnetweight")}
            variant="outlined"
            value={boxNetWeight}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("boxNetWeight")}
            helperText={errors.includes("boxNetWeight") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="netWeightWithPacking"
            label={t("netweightwithpacking")}
            variant="outlined"
            value={netWeightWithPacking}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("netWeightWithPacking")}
            helperText={errors.includes("netWeightWithPacking") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="netWeightWithoutPacking"
            label={t("netweightwithoutpacking")}
            variant="outlined"
            value={netWeightWithoutPacking}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("netWeightWithoutPacking")}
            helperText={
              errors.includes("netWeightWithoutPacking") && errorMessage
            }
          />
        </Grid>
      </Grid>
    );
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
      errors,
    } = this.state;
    const { t } = this.props;
    const errorMessage = t("requiredfield");

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="englishDescription"
            label={t("englishdescription")}
            variant="outlined"
            value={englishDescription}
            fullWidth
            required={true}
            size="small"
            onChange={(e) => this.onChangeForField(e.target.id, e.target.value)}
            error={errors.includes("englishDescription")}
            helperText={errors.includes("englishDescription") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="quantityOfParts"
            label={t("quantityofparts")}
            variant="outlined"
            value={quantityOfParts}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("quantityOfParts")}
            helperText={errors.includes("quantityOfParts") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="composition"
            label={t("composition")}
            variant="outlined"
            value={composition}
            fullWidth
            required={true}
            size="small"
            onChange={(e) => this.onChangeForField(e.target.id, e.target.value)}
            error={errors.includes("composition")}
            helperText={errors.includes("composition") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="model"
            label={t("model")}
            variant="outlined"
            value={model}
            fullWidth
            required={true}
            size="small"
            onChange={(e) =>
              this.onChangeForField(e.target.id, e.target.value, true)
            }
            error={errors.includes("model")}
            helperText={errors.includes("model") && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="color"
            label={t("color")}
            variant="outlined"
            value={color}
            fullWidth
            required={true}
            size="small"
            onChange={(e) => this.onChangeForField(e.target.id, e.target.value)}
            error={errors.includes("color")}
            helperText={errors.includes("color") && errorMessage}
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
          <TextField
            id="specialRequirements"
            label={t("specialrequirements")}
            variant="outlined"
            value={specialRequirements}
            fullWidth
            multiline
            rows={4}
            required={true}
            size="small"
            onChange={(e) => this.onChangeForField(e.target.id, e.target.value)}
            error={errors.includes("specialRequirements")}
            helperText={errors.includes("specialRequirements") && errorMessage}
          />
        </Grid>
      </Grid>
    );
  };

  PictureData = () => {
    const images = [
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      "https://www.gannett-cdn.com/-mm-/f8e8e4dbb93c58491ba96567817cd3497b476408/c=0-298-5848-3602/local/-/media/2018/08/09/USATODAY/USATODAY/636694027098784397-020.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp",
      "https://i.guim.co.uk/img/media/e8f6e2839f90aa29229d2cfa92007c4863303e4a/0_0_2740_1959/master/2740.jpg?width=1920&quality=85&auto=format&fit=max&s=83a3aa15d37f8c5a1f51cf2d9429b5f3",
      "https://cdn.motor1.com/images/mgl/g6wem/s3/most-expensive-lead.jpg",
      "https://www.kbb.com/wp-content/uploads/make/ford/ford-other/mustang-mach-e/2021-ford-mustang-mach-e-front-16-9.jpg?w=768",
      "https://www.futurity.org/wp/wp-content/uploads/2020/04/moon-tectonic-system_1600.jpg",
      "https://scitechdaily.com/images/Lunar-Reconnaissance-Orbiter-Moon-777x583.jpg",
      "https://medias.pylones.com/9387-large_default/pen-rocket-pen-astronaute.jpg",
      "https://ichef.bbci.co.uk/news/800/cpsprodpb/32CB/production/_107830031_artist_s_view_of_vega_carrying_aeolus.jpg",
      "https://www.teclasap.com.br/wp-content/uploads/2009/09/house-1.jpg",
      "https://www.thehousedesigners.com/images/plans/LJD/uploads/7263/1881_Front_NoRailing_THD.jpg",
    ];

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <ImageList images={images} />
        </Grid>
      </Grid>
    );
  };

  render() {
    const { t, onClose, classes } = this.props;
    const { selectedTab } = this.state;

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
          <TabContext value={selectedTab}>
            <TabList onChange={this.handleTabChange}>
              <Tab label={t("factory")} value="1" />
              <Tab label={t("certification")} value="2" />
              <Tab label={t("picture")} value="3" />
            </TabList>
            <TabPanel className={classes.tabPanel} value="1">
              {this.ProductDataFactory()}
            </TabPanel>
            <TabPanel className={classes.tabPanel} value="2">
              {this.CertificationData()}
            </TabPanel>
            <TabPanel className={classes.tabPanel} value="3">
              {this.PictureData()}
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
