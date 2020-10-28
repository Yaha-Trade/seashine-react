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
    setOpen(true);
    setId(-1);
  };

  const onEdit = (id) => {
    setOpen(true);
    setId(id);
  };

  const onClose = () => {
    setOpen(false);
    setId(-1);
  };

  const onSave = async (factory) => {
    if (id === -1) {
      const response = await callServer.post(`factories`, factory);
      const newId = extractId(response.headers.location);
      setId(newId);
      setHasToReloadData(true);
    } else {
      await callServer.put(`factories/${id}`, factory);
    }
    setHasToReloadData(true);
  };

  return (
    <div>
      {open && <FactoryData idFactory={id} onSave={onSave} onClose={onClose} />}
      <DataTable
        title="factory"
        columns={columns}
        dataSource="factories"
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
