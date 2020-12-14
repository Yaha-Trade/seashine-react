import React from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/formfields/TextField";
import DatePicker from "../../components/formfields/DatePicker";
import { formatDateToUTC } from "../../services/Utils";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TimelineHistory from "../../components/timeline/TimelineHistory";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";

const useStyles = (theme) => ({
  tabPanel: {
    paddingTop: "10px",
    paddingRight: "0px",
    paddingLeft: "0px",
  },
});

class OrderFactoryData extends React.Component {
  state = {
    receveidDate: new Date(),
    deliveryDate: new Date(),
    qualityInspectionRequirements: "",
    orderTerms: "",
    errors: [],
    isLoading: false,
    idProduction: -1,
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

  saveData = async (saveAndExit) => {
    const errors = [];
    const {
      idProduction,
      receveidDate,
      deliveryDate,
      qualityInspectionRequirements,
      orderTerms,
      histories,
    } = this.state;

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return;
    }

    this.setState({ isLoading: true });

    await this.props.onSave({
      id: idProduction,
      receveidDate,
      deliveryDate,
      qualityInspectionRequirements,
      orderTerms,
      histories,
    });

    this.setState({ isLoading: false });

    if (saveAndExit) {
      this.props.onClose();
    } else {
      const { idOrderListItem } = this.props;
      if (idOrderListItem && idOrderListItem !== -1) {
        this.fetchData(idOrderListItem);
      }
    }
  };

  fetchData = (idOrderListItem) => {
    callServer
      .get(`orderlistitems/getIdProduction/${idOrderListItem}`)
      .then((response) => {
        this.setState({ idProduction: response.data });

        callServer.get(`productions/${response.data}`).then((response) => {
          this.setState({
            receveidDate: formatDateToUTC(response.data.receveidDate),
            deliveryDate: formatDateToUTC(response.data.deliveryDate),
            qualityInspectionRequirements:
              response.data.qualityInspectionRequirements,
            orderTerms: response.data.orderTerms,
            histories: response.data.histories,
            isLoading: false,
          });
        });
      });
  };

  componentDidMount() {
    const { idOrderListItem } = this.props;

    if (idOrderListItem && idOrderListItem !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idOrderListItem);
    }
  }

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

  handleTabChange = async (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  render() {
    const { onClose, t, classes } = this.props;
    const {
      receveidDate,
      deliveryDate,
      qualityInspectionRequirements,
      orderTerms,
      errors,
      isLoading,
      selectedTab,
      histories,
    } = this.state;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="productiondata"
          fullScreen={true}
        >
          <Loading isOpen={isLoading} />
          <TabContext value={selectedTab}>
            <TabList onChange={this.handleTabChange}>
              <Tab label={t("production")} value="1" />
              <Tab
                label={t("history")}
                value="2"
                disabled={this.props.idOrder === -1}
              />
            </TabList>
            <TabPanel className={classes.tabPanel} value="1">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <DatePicker
                    id="receveidDate"
                    label="received"
                    date={receveidDate}
                    onChange={(value) => {
                      this.setState({ receveidDate: value });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <DatePicker
                    id="deliveryDate"
                    label="delivery"
                    date={deliveryDate}
                    onChange={(value) => {
                      this.setState({ deliveryDate: value });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="qualityInspectionRequirements"
                    label="qualityinspectionrequirements"
                    value={qualityInspectionRequirements}
                    multiline={true}
                    rows={10}
                    required={true}
                    onChange={this.onChangeForField}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="orderTerms"
                    label="orderterms"
                    value={orderTerms}
                    multiline={true}
                    rows={10}
                    required={true}
                    onChange={this.onChangeForField}
                    errors={errors}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel className={classes.tabPanel} value="2">
              <div style={{ backgroundColor: "#bdbdbd" }}>
                <TimelineHistory
                  data={histories}
                  onAddMessage={this.onAddMessage}
                />
              </div>
            </TabPanel>
          </TabContext>
        </ModalData>
      </div>
    );
  }
}

export default withStyles(useStyles, { name: "OrderFactoryData" })(
  withTranslation()(OrderFactoryData)
);
