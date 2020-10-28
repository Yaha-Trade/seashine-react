import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import CustomerData from "./CustomerData";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";

const CustomerList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [{ name: "name", label: t("name") }];

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

  const onSave = async (customer) => {
    if (id === -1) {
      const response = await callServer.post(`customers`, customer);
      const newId = extractId(response.headers.location);
      setId(newId);
    } else {
      await callServer.put(`customers/${id}`, customer);
    }
    setHasToReloadData(true);
  };

  return (
    <div>
      {open && (
        <CustomerData idCustomer={id} onSave={onSave} onClose={onClose} />
      )}
      <DataTable
        title="customer"
        columns={columns}
        dataSource="customers"
        initialSort={{ name: "name", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
      />
    </div>
  );
};

export default CustomerList;
