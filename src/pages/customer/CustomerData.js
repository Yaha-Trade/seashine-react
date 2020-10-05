import React from "react";
import TextField from "@material-ui/core/TextField";
import callServer from "../../services/callServer";
import { withTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";

class CustomerData extends React.Component {
  state = {
    name: "",
    errors: [],
  };

  onChangeForField = (id, newValue) => {
    this.setState({ [id]: newValue });
    this.setState({
      errors: this.state.errors.filter((value) => {
        return id !== value;
      }),
    });
  };

  saveData = () => {
    const errors = [];
    const { name } = this.state;

    if (name === "") {
      errors.push("name");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return;
    }

    this.props.onSave({
      name,
    });

    this.props.onClose();
  };

  fetchData = (idCustomer) => {
    callServer.get(`customers/${idCustomer}`).then((response) => {
      this.setState({
        name: response.data.name,
      });
    });
  };

  componentDidMount() {
    const { idCustomer } = this.props;

    if (idCustomer && idCustomer !== -1) {
      this.fetchData(idCustomer);
    }
  }

  render() {
    const { t, onClose } = this.props;
    const { name, errors } = this.state;
    const errorMessage = t("requiredfield");

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="customerdata"
        >
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
          </Grid>
        </ModalData>
      </div>
    );
  }
}

export default withTranslation()(CustomerData);
