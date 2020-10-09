import React from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/formfields/TextField";

class PackingData extends React.Component {
  state = {
    englishName: "",
    chineseName: "",
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
    const { englishName, chineseName } = this.state;

    if (englishName === "") {
      errors.push("englishName");
    }

    if (chineseName === "") {
      errors.push("chineseName");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return;
    }

    this.setState({ isLoading: true });

    await this.props.onSave({
      englishName,
      chineseName,
    });

    this.setState({ isLoading: false });

    if (saveAndExit) {
      this.props.onClose();
    } else {
      const { idPacking } = this.props;
      if (idPacking && idPacking !== -1) {
        this.fetchData(idPacking);
      }
    }
  };

  fetchData = (idPacking) => {
    callServer.get(`packings/${idPacking}`).then((response) => {
      this.setState({
        englishName: response.data.englishName,
        chineseName: response.data.chineseName,
        isLoading: false,
      });
    });
  };

  componentDidMount() {
    const { idPacking } = this.props;

    if (idPacking && idPacking !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idPacking);
    }
  }

  render() {
    const { onClose } = this.props;
    const { englishName, chineseName, errors, isLoading } = this.state;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="packingdata"
        >
          <Loading isOpen={isLoading} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="englishName"
                label="english"
                value={englishName}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="chineseName"
                label="chinese"
                value={chineseName}
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

export default PackingData;
