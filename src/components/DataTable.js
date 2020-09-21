import React from "react";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import callServer from "../services/callServer";
import CustomToolbar from "../components/CustomToolbar";
import CustomToolbarSelect from "../components/CustomToolbarSelect";

class DataTable extends React.Component {
  state = {
    page: 0,
    count: 1,
    rowsPerPage: 50,
    sortOrder: {},
    data: [["Loading Data..."]],
    tableHeight: window.innerHeight - 215,
  };

  componentDidMount() {
    this.fetchData(
      this.state.page,
      this.state.sortOrder,
      this.state.rowsPerPage
    );
  }

  fetchData = (page, sortOrder, rowsPerPage) => {
    const sortField = sortOrder.name;
    const sortDirection = sortOrder.direction;

    let orderBy = "";
    let orderByDirection = "";

    if (sortField) {
      orderBy = `&orderBy=${sortField}`;
    }

    if (sortDirection) {
      orderByDirection = `&orderByDirection=${sortDirection}`;
    }

    callServer
      .get(
        `${this.props.dataSource}/page?page=${page}&rowsPerPage=${rowsPerPage}${orderBy}${orderByDirection}`
      )
      .then((response) => {
        this.setState({
          data: response.data.content,
          count: response.data.totalElements,
          page: response.data.pageable.pageNumber,
          rowsPerPage: response.data.pageable.pageSize,
          sortOrder: sortOrder,
        });
      });
  };

  render() {
    const { data, count, rowsPerPage, sortOrder, tableHeight } = this.state;

    const options = {
      filter: true,
      filterType: "textField",
      fixedHeader: true,
      fixedSelectColumn: true,
      responsive: "vertical",
      serverSide: true,
      count: count,
      rowsPerPage: rowsPerPage,
      sortOrder: sortOrder,
      selectableRowsOnClick: true,
      selectableRows: "single",
      rowsPerPageOptions: [25, 50, 100],
      tableBodyHeight: tableHeight,
      tableBodyMaxHeight: tableHeight,
      search: false,
      download: false,
      print: false,
      onTableChange: (action, tableState) => {
        switch (action) {
          case "changePage":
          case "sort":
            console.log(action);
            this.fetchData(
              tableState.page,
              tableState.sortOrder,
              tableState.rowsPerPage
            );
            break;
          default:
        }
      },
      onChangeRowsPerPage: (numberOfRows) => {
        const { page, sortOrder } = this.state;
        this.fetchData(page, sortOrder, numberOfRows);
      },
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => applyNewFilters()}
            >
              Aplicar
            </Button>
          </div>
        );
      },
      onFilterConfirm: (filterList) => {
        console.log(filterList);
      },
      customToolbar: () => {
        return <CustomToolbar onAdd={() => console.log("onAdd")} />;
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect
          selectedRows={selectedRows}
          displayData={displayData}
          setSelectedRows={setSelectedRows}
          onDelete={() => console.log("onDelete")}
          onEdit={() => console.log("onEdit")}
        />
      ),
    };

    return (
      <div>
        <MUIDataTable
          title={this.props.title}
          data={data}
          columns={this.props.columns}
          options={options}
        />
      </div>
    );
  }
}

export default DataTable;
