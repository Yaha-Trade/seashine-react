import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import OrderItemData from "./OrderItemData";
import { useTranslation } from "react-i18next";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";

const OrderList = ({ idOrder }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
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

  const onSave = async (order) => {
    if (id === -1) {
      const response = await callServer.post(`orderlistitems`, order);
      const newId = extractId(response.headers.location);
      setId(newId);
      setHasToReloadData(true);
    } else {
      await callServer.put(`orderlistitems/${id}`, order);
    }
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
