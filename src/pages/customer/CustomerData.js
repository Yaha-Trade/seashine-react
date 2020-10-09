import React from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/FormFields/TextField";

class CustomerData extends React.Component {
  state = {
    name: "",
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

    this.setState({ isLoading: true });

    await this.props.onSave({
      name,
    });

    if (saveAndExit) {
      this.props.onClose();
    } else {
      const { idCustomer } = this.props;
      if (idCustomer && idCustomer !== -1) {
        this.fetchData(idCustomer);
      }
    }
  };

  fetchData = (idCustomer) => {
    callServer.get(`customers/${idCustomer}`).then((response) => {
      this.setState({
        name: response.data.name,
        isLoading: false,
      });
    });
  };

  componentDidMount() {
    const { idCustomer } = this.props;

    if (idCustomer && idCustomer !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idCustomer);
    }
  }

  render() {
    const { onClose } = this.props;
    const { name, errors, isLoading } = this.state;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="customerdata"
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
          </Grid>
        </ModalData>
      </div>
    );
  }
}

export default CustomerData;
