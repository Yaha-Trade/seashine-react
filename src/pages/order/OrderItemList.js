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
  const [id, setId] = useState(-1);
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
    setId(-1);
    setOpen(true);
  };

  const onEdit = (id) => {
    setId(id);
    setOpen(true);
  };

  const onClose = () => {
    setId(-1);
    setOpen(false);
  };

  const onSave = async (product, orderItem) => {
    if (orderItem.id === null) {
      const productResponse = await callServer.post(`products`, product);
      const newIdProduct = extractId(productResponse.headers.location);

      await callServer.post("orderlistitems", {
        id: orderItem.id,
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
    } else {
      await callServer.put(`products/${product.id}`, product);

      await callServer.put(`orderlistitems/${idOrder}/${id}`, {
        id: orderItem.id,
        quantityOfBoxes: orderItem.quantityOfBoxes,
        quantityOfPiecesPerBox: orderItem.quantityOfPiecesPerBox,
        totalQuantityOfPieces: orderItem.totalQuantityOfPieces,
        totalPrice: orderItem.totalPrice,
        totalCubage: orderItem.totalCubage,
        unitPrice: orderItem.unitPrice,
        product: {
          id: product.id,
        },
        orderList: {
          id: idOrder,
        },
      });
    }

    setHasToReloadData(true);
  };

  return (
    <div>
      {open && (
        <OrderItemData idOrdemItem={id} onSave={onSave} onClose={onClose} />
      )}
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
