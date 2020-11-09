import React, { Fragment } from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/formfields/TextField";
import AutoComplete from "../../components/formfields/AutoComplete";
import DatePicker from "../../components/formfields/DatePicker";
import { formatDateToUTC } from "../../services/Utils";
import OrderItemList from "./OrderItemList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import TimelineHistory from "../../components/timeline/TimelineHistory";

const useStyles = (theme) => ({
  tabPanel: {
    paddingTop: "10px",
    paddingRight: "0px",
    paddingLeft: "0px",
  },
});

class OrderData extends React.Component {
  state = {
    name: "",
    season: null,
    customer: null,
    purchaseDate: new Date(),
    errors: [],
    isLoading: false,
    selectedTab: "1",
    histories: [],
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
        customer: value.customer,
        errors: this.state.errors.filter((value) => {
          return value !== "season";
        }),
      });
    } else {
      this.setState({ customer: null });
    }
  };

  saveData = async (saveAndExit) => {
    const errors = [];
    const { name, season, customer, purchaseDate, histories } = this.state;

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

    await this.props.onSave(
      {
        name,
        season: { id: season.id },
        purchaseDate,
        customer: { id: customer.id },
        histories,
      },
      saveAndExit
    );

    if (!saveAndExit) {
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
        customer: response.data.season.customer,
        purchaseDate: formatDateToUTC(response.data.purchaseDate),
        isLoading: false,
        histories: response.data.histories,
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

  handleTabChange = async (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  createTabs() {
    const { t, classes } = this.props;
    const { selectedTab } = this.state;

    return (
      <TabContext value={selectedTab}>
        <TabList onChange={this.handleTabChange}>
          <Tab label={t("order")} value="1" />
          <Tab
            label={t("history")}
            value="2"
            disabled={this.props.idOrder === -1}
          />
        </TabList>
        <TabPanel className={classes.tabPanel} value="1">
          {this.createOrderContent()}
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="2">
          {this.createHistory()}
        </TabPanel>
      </TabContext>
    );
  }

  createOrderContent = () => {
    const { idOrder } = this.props;
    const {
      name,
      season,
      customer,
      purchaseDate,
      errors,
      isLoading,
    } = this.state;

    return (
      <Fragment>
        {" "}
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
              value={customer ? customer.name : ""}
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
            {idOrder && idOrder !== -1 && <OrderItemList idOrder={idOrder} />}
          </Grid>
        </Grid>
      </Fragment>
    );
  };

  createHistory = () => {
    const { histories } = this.state;

    return (
      <div style={{ backgroundColor: "#bdbdbd" }}>
        <TimelineHistory data={histories} onAddMessage={this.onAddMessage} />
      </div>
    );
  };

  onAddMessage = (idMessage) => {
    this.setState({
      histories: [
        ...this.state.histories,
        {
          id: idMessage,
        },
      ],
    });
    this.saveData(false);
  };

  render() {
    const { onClose } = this.props;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="orderdata"
          fullScreen={true}
        >
          {this.createTabs()}
        </ModalData>
      </div>
    );
  }
}

export default withStyles(useStyles, { name: "OrderData" })(
  withTranslation()(OrderData)
);
