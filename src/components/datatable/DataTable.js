import React from "react";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import callServer from "../../services/callServer";
import DataToolbar from "./DataToolbar";
import DataToolbarSelect from "./DataToolbarSelect";
import DataFooter from "./DataFooter";
import { withTranslation } from "react-i18next";

class DataTable extends React.Component {
  state = {
    page: 0,
    count: 1,
    rowsPerPage: 50,
    sortOrder: this.props.initialSort,
    data: [[]],
    filters: [],
    totalPages: 1,
    rowsPerPageOptions: [50],
    tableHeight: window.innerHeight - 215,
  };

  componentDidUpdate() {
    if (this.props.getHasToReloadData()) {
      this.fetchData(
        this.state.page,
        this.state.sortOrder,
        this.state.rowsPerPage,
        this.state.filters
      );

      this.props.setHasToReloadData(false);
    }
  }

  componentDidMount() {
    this.fetchData(
      this.state.page,
      this.state.sortOrder,
      this.state.rowsPerPage,
      this.state.filters
    );
  }

  fetchData = (page, sortOrder, rowsPerPage, filters) => {
    const sortField = sortOrder.name;
    const sortDirection = sortOrder.direction;

    let filtersString = "";
    let orderBy = "";
    let orderByDirection = "";

    if (sortField) {
      orderBy = `&orderBy=${sortField}`;
    }

    if (sortDirection) {
      orderByDirection = `&orderByDirection=${sortDirection}`;
    }

    filters.forEach((filter) => {
      filtersString = `${filtersString}&${filter}`;
    });

    callServer
      .get(
        `${this.props.dataSource}/page?page=${page}&rowsPerPage=${rowsPerPage}${orderBy}${orderByDirection}${filtersString}`
      )
      .then((response) => {
        this.setState({
          data: response.data.content,
          count: response.data.totalElements,
          page: response.data.pageable.pageNumber,
          rowsPerPage: response.data.pageable.pageSize,
          sortOrder: sortOrder,
          filters: filters,
          totalPages: response.data.totalPages,
          tableHeight:
            filtersString !== ""
              ? window.innerHeight - 255
              : window.innerHeight - 215,
        });
      });
  };

  handleFilterList = (filterList) => {
    const filters = [];

    filterList.forEach((filter, index) => {
      if (filter.length > 0) {
        filters.push(`${this.props.columns[index].name}=${filter}`);
      }
    });

    this.fetchData(0, this.state.sortOrder, this.state.rowsPerPage, filters);
  };

  onAdd = () => {
    this.props.onAdd();
  };

  onEdit = (id) => {
    this.props.onEdit(id);
  };

  render() {
    const {
      data,
      count,
      rowsPerPage,
      sortOrder,
      tableHeight,
      page,
      rowsPerPageOptions,
    } = this.state;
    const { t } = this.props;

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
      rowsPerPageOptions: rowsPerPageOptions,
      tableBodyHeight: tableHeight,
      tableBodyMaxHeight: tableHeight,
      search: false,
      download: false,
      print: false,
      confirmFilters: true,
      jumpToPage: true,
      page: page,
      textLabels: {
        body: {
          noMatch: t("noregisters"),
          toolTip: t("sort"),
          columnHeaderTooltip: (column) => t("sortfor") + column.label,
        },
        pagination: {
          next: t("nextpage"),
          previous: t("previouspage"),
          rowsPerPage: t("rowsperpage"),
          displayRows: t("of"),
          jumpToPage: t("gotopage"),
        },
        toolbar: {
          search: t("search"),
          downloadCsv: t("download"),
          print: t("print"),
          viewColumns: t("viewcolumns"),
          filterTable: t("filter"),
        },
        filter: {
          all: t("all"),
          title: t("filters"),
          reset: t("reset"),
        },
        viewColumns: {
          title: t("showcolumns"),
          titleAria: t("showhidecolumns"),
        },
        selectedRows: {
          text: t("rowselected"),
          delete: t("delete"),
          deleteAria: t("deleteselectedrows"),
        },
      },
      onTableChange: (action, tableState) => {
        switch (action) {
          case "changePage":
          case "sort":
            this.fetchData(
              tableState.page,
              tableState.sortOrder,
              tableState.rowsPerPage,
              this.state.filters
            );
            break;
          default:
        }
      },
      onChangeRowsPerPage: (numberOfRows) => {
        const { sortOrder, filters } = this.state;
        this.fetchData(0, sortOrder, numberOfRows, filters);
      },
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => applyNewFilters()}
            >
              {t("search")}
            </Button>
          </div>
        );
      },
      onFilterConfirm: (filterList) => {
        this.handleFilterList(filterList);
      },
      onFilterChipClose: (index, removedFilter, filterList) => {
        this.handleFilterList(filterList);
      },
      customToolbar: () => {
        return (
          <DataToolbar
            onAdd={this.props.onAdd}
            customToolbar={this.props.customToolbar}
          />
        );
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <DataToolbarSelect
          selectedRows={selectedRows}
          displayData={displayData}
          setSelectedRows={setSelectedRows}
          onDelete={() => {
            const selectedId = data[selectedRows.data[0].dataIndex].id;

            if (window.confirm(t("wanttodelete"))) {
              callServer
                .delete(`${this.props.dataSource}/${selectedId}`)
                .then((response) => {
                  setSelectedRows([]);

                  let newPage = this.state.page;
                  if (displayData.length === 1 && newPage > 0) {
                    newPage = newPage - 1;
                  }

                  this.fetchData(
                    newPage,
                    this.state.sortOrder,
                    this.state.rowsPerPage,
                    this.state.filters
                  );
                });
            }
          }}
          onEdit={() => {
            const selectedId = data[selectedRows.data[0].dataIndex].id;

            this.props.onEdit(selectedId);
          }}
          customToolbarSelect={this.props.customToolbarSelect}
        />
      ),
      customFooter: (
        count,
        page,
        rowsPerPage,
        changeRowsPerPage,
        changePage,
        textLabels
      ) => {
        return (
          <DataFooter
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            textLabels={textLabels}
            rowsPerPageOptions={this.state.rowsPerPageOptions}
            totalPages={this.state.totalPages}
          />
        );
      },
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

export default withTranslation()(DataTable);
