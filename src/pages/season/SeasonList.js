import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import SeasonData from "./SeasonData";
import callServer from "../../services/callServer";
import { extractId, formatDateToDisplay } from "../../services/Utils";

const SeasonList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "customerName", label: t("customer") },
    { name: "name", label: t("season") },
    {
      name: "scheduledDate",
      label: t("scheduleddate"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return formatDateToDisplay(value);
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

  const onSave = async (season) => {
    if (id === -1) {
      const response = await callServer.post(`seasons`, season);
      const newId = extractId(response.headers.location);
      setId(newId);
    } else {
      await callServer.put(`seasons/${id}`, season);
    }
    setHasToReloadData(true);
  };

  return (
    <div>
      {open && <SeasonData idSeason={id} onSave={onSave} onClose={onClose} />}
      <DataTable
        title={t("season")}
        columns={columns}
        dataSource="seasons"
        initialSort={{ name: "scheduledDate", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
      />
    </div>
  );
};

export default SeasonList;
