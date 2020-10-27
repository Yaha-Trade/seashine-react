import React from "react";
import DisplayCurrency from "../../components/display/DisplayCurrency";
import CubageDisplay from "../../components/display/CubaDisplay";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";

const ProductHistory = ({ idProduct }) => {
  const { t } = useTranslation();

  const columns = [
    { name: "customer", label: t("customer") },
    { name: "quantityOfPiecesPerBox", label: t("piecesperboxes") },
    { name: "quantityOfBoxes", label: t("totalboxes") },
    { name: "totalQuantityOfPieces", label: t("totalpieces") },
    {
      name: "totalCubage",
      label: t("totalcubage"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <CubageDisplay value={value} />;
        },
      },
    },
    {
      name: "unitPrice",
      label: t("unitprice"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <DisplayCurrency value={value} />;
        },
      },
    },
    {
      name: "totalPrice",
      label: t("totalprice"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <DisplayCurrency value={value} />;
        },
      },
    },
  ];

  return (
    <DataTable
      title="orderlist"
      columns={columns}
      dataSource={`orderlistitems/purchasehistory/${idProduct}`}
      initialSort={{ name: "customer", direction: "asc" }}
      onAdd={() => {}}
      onEdit={() => {}}
      setHasToReloadData={() => {}}
      getHasToReloadData={() => {}}
      tableHeight={550}
    />
  );
};

export default ProductHistory;
