import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import OrderData from "./OrderData";
import callServer from "../../services/callServer";
import { extractId, formatDateToDisplay } from "../../services/Utils";
import DisplayCurrency from "../../components/display/DisplayCurrency";
import CubageDisplay from "../../components/display/CubaDisplay";

const OrderList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "name", label: t("name") },
    { name: "customer", label: t("customer") },
    { name: "season", label: t("season") },
    {
      name: "purchaseDate",
      label: t("purchasedate"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return formatDateToDisplay(value);
        },
      },
    },
    { name: "quantityOfProducts", label: t("totalpieces") },
    { name: "totalOfBoxes", label: t("totalboxes") },
    {
      name: "totalCubage",
      label: t("totalcubage"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <CubageDisplay value={value} />;
        },
      },
    },
    { name: "totalOfReferences", label: t("totalofreferences") },
    {
      name: "totalPrice",
      label: t("totalprice"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <DisplayCurrency value={value} />;
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
      {open && <OrderData idOrder={id} onSave={onSave} onClose={onClose} />}
      <DataTable
        title="order"
        columns={columns}
        dataSource="orderlists"
        initialSort={{ name: "name", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
      />
    </div>
  );
};

export default OrderList;
