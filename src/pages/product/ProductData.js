import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import callServer from "../../services/callServer";
import { useTranslation } from "react-i18next";
import { useInput } from "../../hooks/useInput";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import AutoComplete from "../../components/AutoComplete";
import { getLanguage } from "../../services/StorageManager";
import { LanguageEnum } from "../../enums/LanguageEnum";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { CurrencyEnum } from "../../enums/CurrencyEnum";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";

const ProductData = ({ idProduct, onSave, onClose, isOpen }) => {
  const { t } = useTranslation();
  const isEnglishLanguage = getLanguage() === LanguageEnum.ENGLISH;
  const errorMessage = t("requiredfield");
  const [factory, setFactory] = useState(null);
  const [hasErrorsFactory, setHasErrorsFactory] = useState(false);
  const [packing, setPacking] = useState(null);
  const [hasErrorsPacking, setHasErrorsPacking] = useState(false);
  const [selectedTab, setSelectedTab] = useState("1");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const {
    value: reference,
    bind: bindReference,
    setValue: setReference,
    hasErrors: errorsReference,
    setHasErrors: setHasErrorsReference,
  } = useInput("");

  const {
    value: price,
    setValue: setPrice,
    hasErrors: errorsPrice,
    setHasErrors: setHasErrorsPrice,
  } = useInput("");

  const {
    value: description,
    bind: bindDescription,
    setValue: setDescription,
    hasErrors: errorsDescription,
    setHasErrors: setHasErrorsDescription,
  } = useInput("");

  const {
    value: quantityInner,
    bind: bindQuantityInner,
    setValue: setQuantityInner,
    hasErrors: errorsQuantityInner,
    setHasErrors: setHasErrorsQuantityInner,
  } = useInput("", true);

  const {
    value: quantityOfPieces,
    bind: bindQuantityOfPieces,
    setValue: setQuantityOfPieces,
    hasErrors: errorsQuantityOfPieces,
    setHasErrors: setHasErrorsQuantityOfPieces,
  } = useInput("", true);

  const {
    value: boxLength,
    bind: bindBoxLength,
    setValue: setBoxLength,
    hasErrors: errorsBoxLength,
    setHasErrors: setHasErrorsBoxLength,
  } = useInput("", true);

  const {
    value: boxWidth,
    bind: bindBoxWidth,
    setValue: setBoxWidth,
    hasErrors: errorsBoxWidth,
    setHasErrors: setHasErrorsBoxWidth,
  } = useInput("", true);

  const {
    value: boxHeight,
    bind: bindBoxHeight,
    setValue: setBoxHeight,
    hasErrors: errorsBoxHeight,
    setHasErrors: setHasErrorsBoxHeight,
  } = useInput("", true);

  const {
    value: packingLength,
    bind: bindPackingLength,
    setValue: setPackingLength,
    hasErrors: errorsPackingLength,
    setHasErrors: setHasErrorsPackingLength,
  } = useInput("", true);

  const {
    value: packingWidth,
    bind: bindPackingWidth,
    setValue: setPackingWidth,
    hasErrors: errorsPackingWidth,
    setHasErrors: setHasErrorsPackingWidth,
  } = useInput("", true);

  const {
    value: packingHeight,
    bind: bindPackingHeight,
    setValue: setPackingHeight,
    hasErrors: errorsPackingHeight,
    setHasErrors: setHasErrorsPackingHeight,
  } = useInput("", true);

  const {
    value: productLength,
    bind: bindProductLength,
    setValue: setProductLength,
    hasErrors: errorsProductLength,
    setHasErrors: setHasErrorsProductLength,
  } = useInput("", true);

  const {
    value: productWidth,
    bind: bindProductWidth,
    setValue: setProductWidth,
    hasErrors: errorsProductWidth,
    setHasErrors: setHasErrorsProductWidth,
  } = useInput("", true);

  const {
    value: productHeight,
    bind: bindProductHeight,
    setValue: setProductHeight,
    hasErrors: errorsProductHeight,
    setHasErrors: setHasErrorsProductHeight,
  } = useInput("", true);

  const {
    value: boxCubage,
    bind: bindBoxCubage,
    setValue: setBoxCubage,
    hasErrors: errorsBoxCubage,
    setHasErrors: setHasErrorsBoxCubage,
  } = useInput("", true);

  const {
    value: boxGrossWeight,
    bind: bindBoxGrossWeight,
    setValue: setBoxGrossWeight,
    hasErrors: errorsBoxGrossWeight,
    setHasErrors: setHasErrorsBoxGrossWeight,
  } = useInput("", true);

  const {
    value: boxNetWeight,
    bind: bindBoxNetWeight,
    setValue: setBoxNetWeight,
    hasErrors: errorsBoxNetWeight,
    setHasErrors: setHasErrorsBoxNetWeight,
  } = useInput("", true);

  const {
    value: netWeightWithPacking,
    bind: bindNetWeightWithPacking,
    setValue: setNetWeightWithPacking,
    hasErrors: errorsNetWeightWithPacking,
    setHasErrors: setHasErrorsNetWeightWithPacking,
  } = useInput("", true);

  const {
    value: netWeightWithoutPacking,
    bind: bindNetWeightWithoutPacking,
    setValue: setNetWeightWithoutPacking,
    hasErrors: errorsNetWeightWithoutPacking,
    setHasErrors: setHasErrorsNetWeightWithoutPacking,
  } = useInput("", true);

  const {
    value: quantityOfBoxesPerContainer,
    bind: bindQuantityOfBoxesPerContainer,
    setValue: setQuantityOfBoxesPerContainer,
    hasErrors: errorsQuantityOfBoxesPerContainer,
    setHasErrors: setHasErrorsQuantityOfBoxesPerContainer,
  } = useInput("", true);

  const {
    value: quantityOfPiecesPerContainer,
    bind: bindQuantityOfPiecesPerContainer,
    setValue: setQuantityOfPiecesPerContainer,
    hasErrors: errorsQuantityOfPiecesPerContainer,
    setHasErrors: setHasErrorsQuantityOfPiecesPerContainer,
  } = useInput("", true);

  const saveData = () => {
    let hasErrors = false;

    if (reference === "") {
      setHasErrorsReference(true);
      hasErrors = true;
    }

    if (description === "") {
      setHasErrorsDescription(true);
      hasErrors = true;
    }

    if (factory === null) {
      setHasErrorsFactory(true);
      hasErrors = true;
    }

    if (packing === null) {
      setHasErrorsPacking(true);
      hasErrors = true;
    }

    if (price === "") {
      setHasErrorsPrice(true);
      hasErrors = true;
    }

    if (quantityInner === "") {
      setHasErrorsQuantityInner(true);
      hasErrors = true;
    }

    if (quantityOfPieces === "") {
      setHasErrorsQuantityOfPieces(true);
      hasErrors = true;
    }

    if (boxLength === "") {
      setHasErrorsBoxLength(true);
      hasErrors = true;
    }

    if (boxWidth === "") {
      setHasErrorsBoxWidth(true);
      hasErrors = true;
    }

    if (boxHeight === "") {
      setHasErrorsBoxHeight(true);
      hasErrors = true;
    }

    if (packingLength === "") {
      setHasErrorsPackingLength(true);
      hasErrors = true;
    }

    if (packingWidth === "") {
      setHasErrorsPackingWidth(true);
      hasErrors = true;
    }

    if (packingHeight === "") {
      setHasErrorsPackingHeight(true);
      hasErrors = true;
    }

    if (productLength === "") {
      setHasErrorsProductLength(true);
      hasErrors = true;
    }

    if (productWidth === "") {
      setHasErrorsProductWidth(true);
      hasErrors = true;
    }

    if (productHeight === "") {
      setHasErrorsProductHeight(true);
      hasErrors = true;
    }

    if (boxCubage === "") {
      setHasErrorsBoxCubage(true);
      hasErrors = true;
    }

    if (boxGrossWeight === "") {
      setHasErrorsBoxGrossWeight(true);
      hasErrors = true;
    }

    if (boxNetWeight === "") {
      setHasErrorsBoxNetWeight(true);
      hasErrors = true;
    }

    if (netWeightWithPacking === "") {
      setHasErrorsNetWeightWithPacking(true);
      hasErrors = true;
    }

    if (netWeightWithoutPacking === "") {
      setHasErrorsNetWeightWithoutPacking(true);
      hasErrors = true;
    }

    if (quantityOfBoxesPerContainer === "") {
      setHasErrorsQuantityOfBoxesPerContainer(true);
      hasErrors = true;
    }

    if (quantityOfPiecesPerContainer === "") {
      setHasErrorsQuantityOfPiecesPerContainer(true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    onSave({
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
    });

    onClose();
  };

  const onChangeFactorySelect = (event, value) => {
    setFactory(value);
    if (value !== null) {
      setHasErrorsFactory(false);
    }
  };

  const onChangePackingSelect = (event, value) => {
    setPacking(value);
    if (value !== null) {
      setHasErrorsPacking(false);
    }
  };

  useEffect(() => {
    const fetchData = async (idProduct) => {
      const response = await callServer.get(`products/${idProduct}`);

      setReference(response.data.reference);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setQuantityInner(response.data.quantityInner);
      setQuantityOfPieces(response.data.quantityOfPieces);
      setBoxLength(response.data.boxLength);
      setBoxWidth(response.data.boxWidth);
      setBoxHeight(response.data.boxHeight);
      setPackingLength(response.data.packingLength);
      setPackingWidth(response.data.packingWidth);
      setPackingHeight(response.data.packingHeight);
      setProductLength(response.data.productLength);
      setProductWidth(response.data.productWidth);
      setProductHeight(response.data.productHeight);
      setBoxCubage(response.data.boxCubage);
      setBoxGrossWeight(response.data.boxGrossWeight);
      setBoxNetWeight(response.data.boxNetWeight);
      setNetWeightWithPacking(response.data.netWeightWithPacking);
      setNetWeightWithoutPacking(response.data.netWeightWithoutPacking);
      setQuantityOfBoxesPerContainer(response.data.quantityOfBoxesPerContainer);
      setQuantityOfPiecesPerContainer(
        response.data.quantityOfPiecesPerContainer
      );
      setFactory({
        id: response.data.factory.id,
        name: response.data.factory.name,
      });
      setPacking({
        id: response.data.packing.id,
        englishName: response.data.packing.englishName,
        chineseName: response.data.packing.chineseName,
      });
    };

    if (isOpen && idProduct && idProduct !== -1) {
      fetchData(idProduct);
    } else {
      setReference("");
      setDescription("");
      setPrice("");
      setQuantityInner("");
      setQuantityOfPieces("");
      setBoxLength("");
      setBoxWidth("");
      setBoxHeight("");
      setPackingLength("");
      setPackingWidth("");
      setPackingHeight("");
      setProductLength("");
      setProductWidth("");
      setProductHeight("");
      setBoxCubage("");
      setBoxGrossWeight("");
      setBoxNetWeight("");
      setNetWeightWithPacking("");
      setNetWeightWithoutPacking("");
      setQuantityOfBoxesPerContainer("");
      setQuantityOfPiecesPerContainer("");
      setFactory(null);
      setPacking(null);
    }

    setHasErrorsReference(false);
    setHasErrorsDescription(false);
    setHasErrorsPrice(false);
    setHasErrorsQuantityInner(false);
    setHasErrorsQuantityOfPieces(false);
    setHasErrorsBoxLength(false);
    setHasErrorsBoxWidth(false);
    setHasErrorsBoxHeight(false);
    setHasErrorsPackingLength(false);
    setHasErrorsPackingWidth(false);
    setHasErrorsPackingHeight(false);
    setHasErrorsProductLength(false);
    setHasErrorsProductWidth(false);
    setHasErrorsProductHeight(false);
    setHasErrorsBoxCubage(false);
    setHasErrorsFactory(false);
    setHasErrorsPacking(false);
    setHasErrorsBoxGrossWeight(false);
    setHasErrorsBoxNetWeight(false);
    setHasErrorsNetWeightWithPacking(false);
    setHasErrorsNetWeightWithoutPacking(false);
    setHasErrorsQuantityOfBoxesPerContainer(false);
    setHasErrorsQuantityOfPiecesPerContainer(false);

    setSelectedTab("1");
  }, [
    setReference,
    setDescription,
    setPrice,
    setQuantityOfPieces,
    setQuantityInner,
    setBoxLength,
    setBoxWidth,
    setBoxHeight,
    setPackingLength,
    setPackingWidth,
    setPackingHeight,
    setProductLength,
    setProductWidth,
    setProductHeight,
    setBoxCubage,
    setBoxGrossWeight,
    setBoxNetWeight,
    setNetWeightWithPacking,
    setNetWeightWithoutPacking,
    setQuantityOfBoxesPerContainer,
    setQuantityOfPiecesPerContainer,
    setHasErrorsReference,
    setHasErrorsDescription,
    setHasErrorsQuantityInner,
    setHasErrorsPrice,
    setHasErrorsQuantityOfPieces,
    setHasErrorsBoxLength,
    setHasErrorsBoxHeight,
    setHasErrorsBoxWidth,
    setHasErrorsPackingLength,
    setHasErrorsPackingHeight,
    setHasErrorsPackingWidth,
    setHasErrorsProductLength,
    setHasErrorsProductWidth,
    setHasErrorsProductHeight,
    setHasErrorsBoxCubage,
    setHasErrorsBoxGrossWeight,
    setHasErrorsBoxNetWeight,
    setHasErrorsNetWeightWithPacking,
    setHasErrorsNetWeightWithoutPacking,
    setHasErrorsQuantityOfBoxesPerContainer,
    setHasErrorsQuantityOfPiecesPerContainer,
    idProduct,
    isOpen,
    isEnglishLanguage,
  ]);

  const ProductDataFactory = () => {
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
            {...bindReference}
            error={errorsReference}
            helperText={errorsReference && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <AutoComplete
            id="factory"
            dataSource="factories"
            idField="id"
            displayField="name"
            onChange={onChangeFactorySelect}
            selectedValue={factory}
            hasErrors={hasErrorsFactory}
            label={t("factory")}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <AutoComplete
            id="packing"
            dataSource="packings"
            idField="id"
            displayField={isEnglishLanguage ? "englishName" : "chineseName"}
            onChange={onChangePackingSelect}
            selectedValue={packing}
            hasErrors={hasErrorsPacking}
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
            error={errorsPrice}
            helperText={errorsPrice && errorMessage}
            onChange={(event, value) => {
              setPrice(value);
              setHasErrorsPrice(false);
            }}
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
            {...bindDescription}
            error={errorsDescription}
            helperText={errorsDescription && errorMessage}
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
            {...bindProductLength}
            error={errorsProductLength}
            helperText={errorsProductLength && errorMessage}
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
            {...bindProductWidth}
            error={errorsProductWidth}
            helperText={errorsProductWidth && errorMessage}
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
            {...bindProductHeight}
            error={errorsProductHeight}
            helperText={errorsProductHeight && errorMessage}
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
            {...bindQuantityInner}
            error={errorsQuantityInner}
            helperText={errorsQuantityInner && errorMessage}
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
            {...bindBoxLength}
            error={errorsBoxLength}
            helperText={errorsBoxLength && errorMessage}
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
            {...bindBoxWidth}
            error={errorsBoxWidth}
            helperText={errorsBoxWidth && errorMessage}
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
            {...bindBoxHeight}
            error={errorsBoxHeight}
            helperText={errorsBoxHeight && errorMessage}
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
            {...bindBoxCubage}
            error={errorsBoxCubage}
            helperText={errorsBoxCubage && errorMessage}
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
            {...bindPackingLength}
            error={errorsPackingLength}
            helperText={errorsPackingLength && errorMessage}
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
            {...bindPackingWidth}
            error={errorsPackingWidth}
            helperText={errorsPackingWidth && errorMessage}
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
            {...bindPackingHeight}
            error={errorsPackingHeight}
            helperText={errorsPackingHeight && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="boxGrossWeight"
            label={t("boxgrossweight")}
            variant="outlined"
            value={boxGrossWeight}
            fullWidth
            required={true}
            size="small"
            {...bindBoxGrossWeight}
            error={errorsBoxGrossWeight}
            helperText={errorsBoxGrossWeight && errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="quantityOfPieces"
            label={t("quantityofpieces")}
            variant="outlined"
            value={quantityOfPieces}
            fullWidth
            required={true}
            size="small"
            {...bindQuantityOfPieces}
            error={errorsQuantityOfPieces}
            helperText={errorsQuantityOfPieces && errorMessage}
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
            {...bindBoxNetWeight}
            error={errorsBoxNetWeight}
            helperText={errorsBoxNetWeight && errorMessage}
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
            {...bindNetWeightWithPacking}
            error={errorsNetWeightWithPacking}
            helperText={errorsNetWeightWithPacking && errorMessage}
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
            {...bindNetWeightWithoutPacking}
            error={errorsNetWeightWithoutPacking}
            helperText={errorsNetWeightWithoutPacking && errorMessage}
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
            {...bindQuantityOfBoxesPerContainer}
            error={errorsQuantityOfBoxesPerContainer}
            helperText={errorsQuantityOfBoxesPerContainer && errorMessage}
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
            {...bindQuantityOfPiecesPerContainer}
            error={errorsQuantityOfPiecesPerContainer}
            helperText={errorsQuantityOfPiecesPerContainer && errorMessage}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <ModalData
        onSave={saveData}
        isOpen={isOpen}
        onClose={onClose}
        title="productdata"
        fullWidth
        minHeight="620px"
      >
        <TabContext value={selectedTab}>
          <TabList onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label={t("factory")} value="1" />
            <Tab label={t("certification")} value="2" />
            <Tab label={t("picture")} value="3" />
          </TabList>
          <TabPanel value="1">{ProductDataFactory()}</TabPanel>
          <TabPanel value="2">Certificacao</TabPanel>
          <TabPanel value="3">Picture</TabPanel>
        </TabContext>
      </ModalData>
    </div>
  );
};

export default ProductData;
