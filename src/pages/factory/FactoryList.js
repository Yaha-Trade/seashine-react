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
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "name", label: t("name") },
    { name: "contact", label: t("contact") },
    { name: "bankAccountNumber", label: t("bankaccount") },
    { name: "address", label: t("address") },
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

  const onSave = (factory) => {
    if (id === -1) {
      callServer.post(`factories`, factory).then((response) => {
        const newId = extractId(response.headers.location);
        setId(newId);
        setHasToReloadData(true);
      });
    } else {
      callServer.put(`factories/${id}`, factory).then((response) => {
        setHasToReloadData(true);
      });
    }
  };

  return (
    <div>
      {open && <FactoryData idFactory={id} onSave={onSave} onClose={onClose} />}
      <DataTable
        title={t("factory")}
        columns={columns}
        dataSource="factories"
        serverSide={true}
        initialSort={{ name: "name", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
      />
    </div>
  );
};

export default FactoryList;
