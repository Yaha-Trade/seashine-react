import React from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/formfields/TextField";
import AutoComplete from "../../components/formfields/AutoComplete";
import DatePicker from "../../components/formfields/DatePicker";
import { formatDateToUTC } from "../../services/Utils";
import DataTable from "../../components/datatable/DataTable";
import OrderItemData from "./OrderItemData";
import { withTranslation } from "react-i18next";

class OrderData extends React.Component {
  state = {
    name: "",
    season: null,
    customerName: "",
    purchaseDate: new Date(),
    errors: [],
    isLoading: false,
    isOrderItemOpen: false,
  };

  onChangeForField = (id, newValue) => {
    this.setState({
      [id]: newValue,
      errors: this.state.errors.filter((value) => {
        return id !== value;
      }),
    });
  };

  onChangeSeasonSelect = (event, value) => {
    this.setState({ season: value });
    if (value !== null) {
      this.setState({
        customerName: value.customerName,
        errors: this.state.errors.filter((value) => {
          return value !== "season";
        }),
      });
    } else {
      this.setState({ customerName: "" });
    }
  };

  saveData = async (saveAndExit) => {
    const errors = [];
    const { name, season, purchaseDate } = this.state;

    if (name === "") {
      errors.push("name");
    }

    if (season === null) {
      errors.push("season");
    }

    if (purchaseDate === "") {
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
      season: { id: season.id },
      purchaseDate,
    });

    if (saveAndExit) {
      this.props.onClose();
    } else {
      const { idOrder } = this.props;
      if (idOrder && idOrder !== -1) {
        this.fetchData(idOrder);
      }
    }
  };

  fetchData = (idOrder) => {
    callServer.get(`orderlists/${idOrder}`).then((response) => {
      this.setState({
        name: response.data.name,
        season: response.data.season,
        customerName: response.data.season.customer.name,
        purchaseDate: formatDateToUTC(response.data.purchaseDate),
        isLoading: false,
      });
    });
  };

  componentDidMount() {
    const { idOrder } = this.props;

    if (idOrder && idOrder !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idOrder);
    }
  }

  render() {
    const { idOrder, t, onClose } = this.props;
    const {
      name,
      season,
      customerName,
      purchaseDate,
      errors,
      isLoading,
      isOrderItemOpen,
    } = this.state;

    return (
      <div>
        {isOrderItemOpen && (
          <OrderItemData
            onClose={() => this.setState({ isOrderItemOpen: false })}
          />
        )}
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="orderdata"
          fullScreen={true}
        >
          <Loading isOpen={isLoading} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                id="name"
                label="name"
                value={name}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <AutoComplete
                id="season"
                dataSource="seasons"
                idField="id"
                displayField="name"
                onChange={this.onChangeSeasonSelect}
                selectedValue={season}
                hasErrors={errors.includes("season")}
                label="season"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="customer"
                label="customer"
                value={customerName}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DatePicker
                id="purchaseDate"
                label="purchasedate"
                date={purchaseDate}
                onChange={(value) => {
                  this.setState({ purchaseDate: value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {idOrder && idOrder !== -1 && (
                <DataTable
                  title={t("orderlist")}
                  columns={[
                    { name: "factoryName", label: t("factory") },
                    { name: "productReference", label: t("reference") },
                    { name: "productDescription", label: t("description") },
                    { name: "quantity", label: t("quantity") },
                  ]}
                  dataSource={`orderlistitems/${idOrder}`}
                  serverSide={true}
                  initialSort={{ name: "quantity", direction: "asc" }}
                  setHasToReloadData={() => {
                    return false;
                  }}
                  getHasToReloadData={() => {}}
                  tableHeight={window.innerHeight - 90}
                  onAdd={() => this.setState({ isOrderItemOpen: true })}
                />
              )}
            </Grid>
          </Grid>
        </ModalData>
      </div>
    );
  }
}

export default withTranslation()(OrderData);
