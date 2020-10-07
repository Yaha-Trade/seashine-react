import React from "react";
import TextField from "@material-ui/core/TextField";
import callServer from "../../services/callServer";
import { withTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";

class PackingData extends React.Component {
  state = {
    englishName: "",
    chineseName: "",
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
    const { t, onClose } = this.props;
    const { englishName, chineseName, errors, isLoading } = this.state;
    const errorMessage = t("requiredfield");

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
                label={t("english")}
                variant="outlined"
                value={englishName}
                fullWidth
                required={true}
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
                error={errors.includes("englishName")}
                helperText={errors.includes("englishName") && errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="chineseName"
                label={t("chinese")}
                variant="outlined"
                value={chineseName}
                fullWidth
                required={true}
                size="small"
                onChange={(e) =>
                  this.onChangeForField(e.target.id, e.target.value)
                }
                error={errors.includes("chineseName")}
                helperText={errors.includes("chineseName") && errorMessage}
              />
            </Grid>
          </Grid>
        </ModalData>
      </div>
    );
  }
}

export default withTranslation()(PackingData);
