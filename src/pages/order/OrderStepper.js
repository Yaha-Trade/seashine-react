import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ProductList from "../../pages/product/ProductList";
import ProductData from "../../pages/product/ProductData";
import { useTranslation } from "react-i18next";

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
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const OrderStepper = ({ saveData, onClose }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Select product", "Edit product informations", "Add remarks"];
  const [selectedProduct, setSelectedProduct] = useState(-1);
  const [productData, setProductData] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedProduct(-1);
    setProductData(null);
  };

  const setProduct = (product) => {
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
    setProductData(product);
    handleNext();
  };

  const createProduct = () => {
    saveData(productData);
    handleNext();
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
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
                onClick={handleNext}
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
          onSave={setProduct}
          onClose={onClose}
          isOnOrder={true}
          handleBack={handleBack}
        />
      )}
      {activeStep === 2 && (
        <div>
          REMARKS WILL GO HERE!
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
                onClick={createProduct}
              >
                {t("finish")}
              </Button>
            </div>
          </div>
        </div>
      )}
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Product added with success</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Add new product
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default OrderStepper;
