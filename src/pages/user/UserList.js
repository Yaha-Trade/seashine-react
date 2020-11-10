import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import UserData from "./UserData";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";
import { useSnackbar } from "notistack";

const UserList = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "name", label: t("name") },
    { name: "login", label: t("login") },
    { name: "email", label: t("email") },
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

  const onSave = async (user) => {
    if (id === -1) {
      const response = await callServer.post(`users`, user);
      const newId = extractId(response.headers.location);
      setId(newId);
    } else {
      await callServer.put(`users/${id}`, user);
    }
    setHasToReloadData(true);

    enqueueSnackbar(t("savedwithsuccess"), {
      variant: "success",
    });
  };

  return (
    <div>
      {open && <UserData idUser={id} onSave={onSave} onClose={onClose} />}
      <DataTable
        title="user"
        columns={columns}
        dataSource="users"
        initialSort={{ name: "name", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
      />
    </div>
  );
};

export default UserList;
