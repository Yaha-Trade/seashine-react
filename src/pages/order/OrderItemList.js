import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import OrderItemData from "./OrderItemData";
import { useTranslation } from "react-i18next";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";

const OrderList = ({ idOrder }) => {
  const { t } = useTranslation();
  const [isOrderItemOpen, setIsOrderItemOpen] = useState(false);
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
  };

  const onEdit = (id) => {
    setId(id);
  };

  const onClose = () => {
    setId(-1);
  };

  const onSave = async (order) => {
    if (id === -1) {
      const response = await callServer.post(`orderlists`, order);
      const newId = extractId(response.headers.location);
      setId(newId);
      setHasToReloadData(true);
    } else {
      await callServer.put(`orderlists/${id}`, order);
    }
    setHasToReloadData(true);
  };

  return (
    <div>
      {isOrderItemOpen && (
        <OrderItemData onClose={() => setIsOrderItemOpen(false)} />
      )}
      <DataTable
        title={t("orderlist")}
        columns={columns}
        dataSource={`orderlistitems/${idOrder}`}
        initialSort={{ name: "quantity", direction: "asc" }}
        setHasToReloadData={() => {
          return false;
        }}
        getHasToReloadData={() => {}}
        tableHeight={window.innerHeight - 90}
        onAdd={() => setIsOrderItemOpen(true)}
      />
    </div>
  );
};

export default OrderList;
