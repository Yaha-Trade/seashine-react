import React from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/formfields/TextField";

class FactoryData extends React.Component {
  state = {
    name: "",
    address: "",
    contact: "",
    bankAccountNumber: "",
    telephone1: "",
    telephone2: "",
    telephone3: "",
    mobilePhone1: "",
    mobilePhone2: "",
    mobilePhone3: "",
    qqNumber1: "",
    qqNumber2: "",
    qqNumber3: "",
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
      name,
      address,
      contact,
      bankAccountNumber,
      telephone1,
      telephone2,
      telephone3,
      mobilePhone1,
      mobilePhone2,
      mobilePhone3,
      qqNumber1,
      qqNumber2,
      qqNumber3,
    } = this.state;

    if (name === "") {
      errors.push("name");
    }

    if (address === "") {
      errors.push("address");
    }

    if (contact === "") {
      errors.push("contact");
    }

    if (bankAccountNumber === "") {
      errors.push("bankAccountNumber");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return;
    }

    this.setState({ isLoading: true });

    await this.props.onSave({
      name,
      address,
      contact,
      bankAccountNumber,
      telephone1,
      telephone2,
      telephone3,
      mobilePhone1,
      mobilePhone2,
      mobilePhone3,
      qqNumber1,
      qqNumber2,
      qqNumber3,
    });

    this.setState({ isLoading: false });

    if (saveAndExit) {
      this.props.onClose();
    } else {
      const { idFactory } = this.props;
      if (idFactory && idFactory !== -1) {
        this.fetchData(idFactory);
      }
    }
  };

  fetchData = (idFactory) => {
    callServer.get(`factories/${idFactory}`).then((response) => {
      this.setState({
        name: response.data.name,
        address: response.data.address,
        contact: response.data.contact,
        bankAccountNumber: response.data.bankAccountNumber,
        telephone1: response.data.telephone1,
        telephone2: response.data.telephone2,
        telephone3: response.data.telephone3,
        mobilePhone1: response.data.mobilePhone1,
        mobilePhone2: response.data.mobilePhone2,
        mobilePhone3: response.data.mobilePhone3,
        qqNumber1: response.data.qqNumber1,
        qqNumber2: response.data.qqNumber2,
        qqNumber3: response.data.qqNumber3,
        isLoading: false,
      });
    });
  };

  componentDidMount() {
    const { idFactory } = this.props;

    if (idFactory && idFactory !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idFactory);
    }
  }

  render() {
    const { onClose } = this.props;
    const {
      name,
      address,
      contact,
      bankAccountNumber,
      telephone1,
      telephone2,
      telephone3,
      mobilePhone1,
      mobilePhone2,
      mobilePhone3,
      qqNumber1,
      qqNumber2,
      qqNumber3,
      errors,
      isLoading,
    } = this.state;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="factorydata"
        >
          <Loading isOpen={isLoading} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="name"
                label="name"
                value={name}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="contact"
                label="contact"
                value={contact}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="bankAccountNumber"
                label="bankaccount"
                value={bankAccountNumber}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="address"
                label="address"
                value={address}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="telephone1"
                label="telephone"
                value={telephone1}
                onChange={this.onChangeForField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="telephone2"
                label="telephone"
                value={telephone2}
                onChange={this.onChangeForField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="telephone3"
                label="telephone"
                value={telephone3}
                onChange={this.onChangeForField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="mobilePhone1"
                label="mobilephone"
                value={mobilePhone1}
                onChange={this.onChangeForField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="mobilePhone2"
                label="mobilephone"
                value={mobilePhone2}
                onChange={this.onChangeForField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="mobilePhone3"
                label="mobilephone"
                value={mobilePhone3}
                onChange={this.onChangeForField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="qqNumber1"
                label="qqnumber"
                value={qqNumber1}
                onChange={this.onChangeForField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="qqNumber2"
                label="qqnumber"
                value={qqNumber2}
                onChange={this.onChangeForField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="qqNumber3"
                label="qqnumber"
                value={qqNumber3}
                onChange={this.onChangeForField}
              />
            </Grid>
          </Grid>
        </ModalData>
      </div>
    );
  }
}

export default FactoryData;
