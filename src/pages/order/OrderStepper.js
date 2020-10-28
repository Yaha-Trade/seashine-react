import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import ProductList from "../../pages/product/ProductList";
import ProductData from "../../pages/product/ProductData";
import { useTranslation } from "react-i18next";
import callServer from "../../services/callServer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
}));

const OrderStepper = ({ saveData, onClose, onAlreadyExists, idOrderList }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = [t("selectproduct"), t("editproductdata")];
  const [selectedProduct, setSelectedProduct] = useState(-1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedProduct(-1);
  };

  const createProductAndOrder = (product, orderItem) => {
    if (orderItem.id === null) {
      product.id = null;
      product.parentProduct = {
        id: selectedProduct,
      };
      if (product.certification) {
        product.certification.id = null;
        if (product.certification.batteries) {
          const batteriesQtd = product.certification.batteries.length;
          for (let index = 0; index < batteriesQtd; index++) {
            product.certification.batteries[index].id = null;
          }
        }
      }
    }
    saveData(product, orderItem);
    handleNext();
  };

  const checkIfProductAlreadyExists = () => {
    callServer
      .get(`orderlistitems/check/${idOrderList}/${selectedProduct}`)
      .then((response) => {
        if (response.data === -1) {
          handleNext();
        } else {
          if (window.confirm(t("productalreadyexits"))) {
            onAlreadyExists(response.data);
          }
        }
      });
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <div>
          <ProductList
            tableHeight={window.innerHeight - 114}
            onRowSelectionChange={setSelectedProduct}
          />
          <div className={classes.actionsContainer}>
            <div>
              <Button onClick={onClose} className={classes.button}>
                {t("cancel")}
              </Button>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                {t("back")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={selectedProduct === -1}
                onClick={checkIfProductAlreadyExists}
              >
                {t("next")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <ProductData
          idProduct={selectedProduct}
          onSave={createProductAndOrder}
          onClose={onClose}
          isOrder={true}
          handleBack={handleBack}
        />
      )}

      {activeStep === steps.length && (
        <div>
          <Alert severity="success">
            <AlertTitle>{t("success")}</AlertTitle>
            {t("productaddedorder")}
          </Alert>
          <Button
            onClick={onClose}
            className={classes.button}
            color="primary"
            variant="outlined"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleReset}
            variant="contained"
            className={classes.button}
            color="primary"
          >
            {t("addnewproduct")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderStepper;
