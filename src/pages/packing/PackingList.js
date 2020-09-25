import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import PackingData from "./PackingData";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";

const PackingList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "englishName", label: t("english") },
    { name: "chineseName", label: t("chinese") },
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

  const onSave = (packing) => {
    if (id === -1) {
      callServer.post(`packings`, packing).then((response) => {
        const newId = extractId(response.headers.location);
        setId(newId);
        setHasToReloadData(true);
      });
    } else {
      callServer.put(`packings/${id}`, packing).then((response) => {
        setHasToReloadData(true);
      });
    }
  };

  return (
    <div>
      <PackingData
        idPacking={id}
        onSave={onSave}
        onClose={onClose}
        isOpen={open}
      />
      <DataTable
        title={t("packing")}
        columns={columns}
        dataSource="packings"
        serverSide={true}
        initialSort={{ name: "englishName", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
      />
    </div>
  );
};

export default PackingList;
