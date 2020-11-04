import React from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/formfields/TextField";

class LanguageData extends React.Component {
  state = {
    textValue: "",
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
    const { textValue } = this.state;

    if (textValue === "") {
      errors.push("textValue");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return;
    }

    this.setState({ isLoading: true });

    await this.props.onSave({
      textValue,
    });

    this.setState({ isLoading: false });

    if (saveAndExit) {
      this.props.onClose();
    } else {
      const { idLanguage } = this.props;
      if (idLanguage && idLanguage !== -1) {
        this.fetchData(idLanguage);
      }
    }
  };

  fetchData = (idLanguage) => {
    callServer.get(`locales/${idLanguage}`).then((response) => {
      this.setState({
        textValue: response.data.textValue,
        isLoading: false,
      });
    });
  };

  componentDidMount() {
    const { idLanguage } = this.props;

    if (idLanguage && idLanguage !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idLanguage);
    }
  }

  render() {
    const { onClose } = this.props;
    const { textValue, errors, isLoading } = this.state;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="languagedata"
        >
          <Loading isOpen={isLoading} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="textValue"
                label="name"
                value={textValue}
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

export default LanguageData;
