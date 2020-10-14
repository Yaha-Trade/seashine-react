import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MuiTablePagination from "@material-ui/core/TablePagination";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";

const defaultFooterStyles = {};

class DataFooter extends React.Component {
  handleRowChange = (event) => {
    this.props.changeRowsPerPage(event.target.value);
  };

  handlePageChange = (_, page) => {
    this.props.changePage(page);
  };

  render() {
    const {
      count,
      textLabels,
      rowsPerPage,
      page,
      rowsPerPageOptions,
      totalPages,
    } = this.props;

    const { t } = this.props;

    const footerStyle = {
      display: "flex",
      justifyContent: "flex-end",
      padding: "0px 24px 0px 24px",
    };

    return (
      <TableFooter>
        <TableRow>
          <TableCell style={footerStyle} colSpan={1000}>
            <MuiTablePagination
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage={textLabels.rowsPerPage}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${textLabels.displayRows} ${count} | ${t(
                  "page"
                )} ${page + 1} ${t("of")} ${totalPages}`
              }
              backIconButtonProps={{
                "aria-label": textLabels.previous,
              }}
              backIconButtonText={textLabels.previous}
              nextIconButtonProps={{
                "aria-label": textLabels.next,
              }}
              nextIconButtonText={textLabels.next}
              rowsPerPageOptions={rowsPerPageOptions}
              onChangePage={this.handlePageChange}
              onChangeRowsPerPage={this.handleRowChange}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(defaultFooterStyles, { name: "DataFooter" })(
  withTranslation()(DataFooter)
);
