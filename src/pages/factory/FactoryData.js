import React from "react";
import TextField from "@material-ui/core/TextField";
import callServer from "../../services/callServer";
import { withTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";

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
    this.setState({ [id]: newValue });
    this.setState({
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
    const { t, onClose } = this.props;
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
    const errorMessage = t("requiredfield");

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
                label={t("name")}
                variant="outlined"
                value={name}
                fullWidth
                required={true}
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
                error={errors.includes("name")}
                helperText={errors.includes("name") && errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="contact"
                label={t("contact")}
                variant="outlined"
                value={contact}
                required={true}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
                error={errors.includes("contact")}
                helperText={errors.includes("contact") && errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="bankAccountNumber"
                label={t("bankaccount")}
                variant="outlined"
                value={bankAccountNumber}
                required={true}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
                error={errors.includes("bankAccountNumber")}
                helperText={
                  errors.includes("bankAccountNumber") && errorMessage
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="address"
                label={t("address")}
                variant="outlined"
                value={address}
                required={true}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
                error={errors.includes("address")}
                helperText={errors.includes("address") && errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="telephone1"
                label={t("telephone")}
                variant="outlined"
                value={telephone1}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="telephone2"
                label={t("telephone")}
                variant="outlined"
                value={telephone2}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="telephone3"
                label={t("telephone")}
                variant="outlined"
                value={telephone3}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="mobilePhone1"
                label={t("mobilephone")}
                variant="outlined"
                value={mobilePhone1}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="mobilePhone2"
                label={t("mobilephone")}
                variant="outlined"
                value={mobilePhone2}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="mobilePhone3"
                label={t("mobilephone")}
                variant="outlined"
                value={mobilePhone3}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="qqNumber1"
                label={t("qqnumber")}
                variant="outlined"
                value={qqNumber1}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="qqNumber2"
                label={t("qqnumber")}
                variant="outlined"
                value={qqNumber2}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="qqNumber3"
                label={t("qqnumber")}
                variant="outlined"
                value={qqNumber3}
                fullWidth
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
              />
            </Grid>
          </Grid>
        </ModalData>
      </div>
    );
  }
}

export default withTranslation()(FactoryData);
