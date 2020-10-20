import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import OrderItemData from "./OrderItemData";
import { useTranslation } from "react-i18next";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";

const OrderList = ({ idOrder }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "factoryName", label: t("factory") },
    { name: "productReference", label: t("reference") },
    { name: "productDescription", label: t("description") },
    { name: "quantity", label: t("quantity") },
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

  const onSave = async (product) => {
    const productResponse = await callServer.post(`products`, product);
    const newIdProduct = extractId(productResponse.headers.location);

    const orderItemResponse = await callServer.post("orderlistitems", {
      id: null,
      quantity: 15,
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
        initialSort={{ name: "quantity", direction: "asc" }}
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
