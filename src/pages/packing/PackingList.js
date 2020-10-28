import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import PackingData from "./PackingData";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";
import { useSnackbar } from "notistack";

const PackingList = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
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

  const onSave = async (packing) => {
    if (id === -1) {
      const response = await callServer.post(`packings`, packing);
      const newId = extractId(response.headers.location);
      setId(newId);
    } else {
      await callServer.put(`packings/${id}`, packing);
    }
    setHasToReloadData(true);

    enqueueSnackbar(t("savedwithsuccess"), {
      variant: "success",
    });
  };

  return (
    <div>
      {open && <PackingData idPacking={id} onSave={onSave} onClose={onClose} />}
      <DataTable
        title="packing"
        columns={columns}
        dataSource="packings"
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
