import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import FactoryData from "./FactoryData";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";

const FactoryList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  const columns = [
    { name: "name", label: t("name") },
    { name: "contact", label: t("contact") },
    { name: "address", label: t("address") },
    { name: "bankAccountNumber", label: t("bankaccount") },
  ];

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

  const onSave = (factory) => {
    if (id === -1) {
      callServer.post(`factories`, factory).then((response) => {
        const newId = extractId(response.headers.location);
        setId(newId);
        console.log("reloading....");
      });
    } else {
      callServer.put(`factories/${id}`, factory).then((response) => {
        console.log("reloading....");
      });
    }
  };

  return (
    <div>
      <FactoryData
        idFactory={id}
        onSave={onSave}
        onClose={onClose}
        isOpen={open}
      />
      <DataTable
        title={t("factory")}
        columns={columns}
        dataSource="factories"
        serverSide={true}
        initialSort={{ name: "name", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
      />
    </div>
  );
};

export default FactoryList;
