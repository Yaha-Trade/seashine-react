import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import OrderItemData from "./OrderItemData";
import { useTranslation } from "react-i18next";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";
import DisplayCurrency from "../../components/display/DisplayCurrency";
import CubageDisplay from "../../components/display/CubaDisplay";

const OrderList = ({ idOrder }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "factoryName", label: t("factory") },
    { name: "productReference", label: t("reference") },
    { name: "productDescription", label: t("description") },
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

  const getHasToReloadData = () => {
    return hasToReloadData;
  };

  const onAdd = () => {
    setOpen(true);
  };

  const onEdit = (id) => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = async (product, orderItem) => {
    const productResponse = await callServer.post(`products`, product);
    const newIdProduct = extractId(productResponse.headers.location);

    const orderItemResponse = await callServer.post("orderlistitems", {
      id: null,
      quantityOfBoxes: orderItem.quantityOfBoxes,
      quantityOfPiecesPerBox: orderItem.quantityOfPiecesPerBox,
      totalQuantityOfPieces: orderItem.totalQuantityOfPieces,
      totalPrice: orderItem.totalPrice,
      totalCubage: orderItem.totalCubage,
      unitPrice: orderItem.unitPrice,
      product: {
        id: newIdProduct,
      },
      orderList: {
        id: idOrder,
      },
    });

    setHasToReloadData(true);
  };

  return (
    <div>
      {open && <OrderItemData onSave={onSave} onClose={onClose} />}
      <DataTable
        title="orderlist"
        columns={columns}
        dataSource={`orderlistitems/${idOrder}`}
        initialSort={{ name: "productReference", direction: "asc" }}
        tableHeight={window.innerHeight - 90}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
      />
    </div>
  );
};

export default OrderList;
