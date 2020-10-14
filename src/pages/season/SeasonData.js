import React from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/formfields/TextField";
import AutoComplete from "../../components/formfields/AutoComplete";
import { withTranslation } from "react-i18next";
import DatePicker from "../../components/formfields/DatePicker";
import { formatDateToUTC } from "../../services/Utils";

class SeasonData extends React.Component {
  state = {
    name: "",
    customer: null,
    scheduledDate: new Date(),
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
    const { name, customer, scheduledDate } = this.state;

    if (name === "") {
      errors.push("name");
    }

    if (customer == null) {
      errors.push("customer");
    }

    if (scheduledDate === "") {
      return;
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
      customer: { id: customer.id },
      scheduledDate,
    });

    if (saveAndExit) {
      this.props.onClose();
    } else {
      const { idSeason } = this.props;
      if (idSeason && idSeason !== -1) {
        this.fetchData(idSeason);
      }
    }
  };

  fetchData = (idSeason) => {
    callServer.get(`seasons/${idSeason}`).then((response) => {
      this.setState({
        name: response.data.name,
        scheduledDate: formatDateToUTC(response.data.scheduledDate),
        customer: {
          id: response.data.customer.id,
          name: response.data.customer.name,
        },
        isLoading: false,
      });
    });
  };

  componentDidMount() {
    const { idSeason } = this.props;

    if (idSeason && idSeason !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idSeason);
    }
  }

  onChangeCustomerSelect = (event, value) => {
    this.setState({ customer: value });
    if (value !== null) {
      this.setState({
        errors: this.state.errors.filter((value) => {
          return value !== "customer";
        }),
      });
    }
  };

  render() {
    const { t, onClose } = this.props;
    const { name, customer, scheduledDate, errors, isLoading } = this.state;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="seasondata"
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
            <Grid item xs={12} sm={12}>
              <AutoComplete
                id="customer"
                dataSource="customers"
                idField="id"
                displayField="name"
                onChange={this.onChangeCustomerSelect}
                selectedValue={customer}
                hasErrors={errors.includes("customer")}
                label={t("customer")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <DatePicker
                id="scheduledDate"
                label="scheduleddate"
                date={scheduledDate}
                onChange={(value) => {
                  this.setState({ scheduledDate: value });
                }}
              />
            </Grid>
          </Grid>
        </ModalData>
      </div>
    );
  }
}

export default withTranslation()(SeasonData);
