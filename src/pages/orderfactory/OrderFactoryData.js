import React from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/formfields/TextField";
import DatePicker from "../../components/formfields/DatePicker";
import { formatDateToUTC } from "../../services/Utils";

class OrderFactoryData extends React.Component {
  state = {
    receveidDate: new Date(),
    deliveryDate: new Date(),
    qualityInspectionRequirements: "",
    orderTerms: "",
    errors: [],
    isLoading: false,
  };

  onChangeForField = (id, newValue) => {
    this.setState({
      [id]: newValue,
      errors: this.state.errors.filter((value) => {
        return id !== value;
      }),
    });
  };

  saveData = async (saveAndExit) => {
    const errors = [];
    const {
      receveidDate,
      deliveryDate,
      qualityInspectionRequirements,
      orderTerms,
    } = this.state;

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return;
    }

    this.setState({ isLoading: true });

    await this.props.onSave({});

    this.setState({ isLoading: false });

    if (saveAndExit) {
      this.props.onClose();
    } else {
      const { idProduction } = this.props;
      if (idProduction && idProduction !== -1) {
        this.fetchData(idProduction);
      }
    }
  };

  fetchData = (idProduction) => {
    console.log("Fetch data!");
  };

  componentDidMount() {
    const { idProduction } = this.props;

    if (idProduction && idProduction !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idProduction);
    }
  }

  render() {
    const { onClose } = this.props;
    const {
      receveidDate,
      deliveryDate,
      qualityInspectionRequirements,
      orderTerms,
      errors,
      isLoading,
    } = this.state;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="productiondata"
        >
          <Loading isOpen={isLoading} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <DatePicker
                id="receveidDate"
                label="received"
                date={receveidDate}
                onChange={(value) => {
                  this.setState({ receveidDate: value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <DatePicker
                id="deliveryDate"
                label="delivery"
                date={deliveryDate}
                onChange={(value) => {
                  this.setState({ deliveryDate: value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="qualityInspectionRequirements"
                label="qualityinspectionrequirements"
                value={qualityInspectionRequirements}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="orderTerms"
                label="orderterms"
                value={orderTerms}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
          </Grid>
        </ModalData>
      </div>
    );
  }
}

export default OrderFactoryData;
