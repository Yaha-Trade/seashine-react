import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import LanguageData from "./LanguageData";
import callServer from "../../services/callServer";
import { useSnackbar } from "notistack";

const LanguageList = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "textValue", label: t("name") },
    {
      name: "language",
      label: t("language"),
      options: {
        filterType: "dropdown",
        filterOptions: {
          names: ["English", "Chinese"],
        },
      },
    },
  ];

  const getHasToReloadData = () => {
    return hasToReloadData;
  };

  const onEdit = (id) => {
    setOpen(true);
    setId(id);
  };

  const onClose = () => {
    setOpen(false);
    setId(-1);
  };

  const onSave = async (i18n) => {
    await callServer.put(`locales/${id}`, i18n);

    setHasToReloadData(true);

    enqueueSnackbar(t("savedwithsuccess"), {
      variant: "success",
    });
  };

  return (
    <div>
      {open && (
        <LanguageData idLanguage={id} onSave={onSave} onClose={onClose} />
      )}
      <DataTable
        title="language"
        columns={columns}
        dataSource="locales"
        initialSort={{ name: "textValue", direction: "asc" }}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
        useDelete={false}
        useAdd={false}
      />
    </div>
  );
};

export default LanguageList;
