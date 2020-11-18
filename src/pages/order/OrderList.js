import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import OrderData from "./OrderData";
import callServer from "../../services/callServer";
import {
  extractId,
  formatDateToDisplay,
  getTextOrderStatus,
} from "../../services/Utils";
import DisplayCurrency from "../../components/display/DisplayCurrency";
import CubageDisplay from "../../components/display/CubageDisplay";
import { useSnackbar } from "notistack";
import OrderToolbar from "./OrderToolbar";
import { createUUID } from "../../services/Utils";

const OrderList = ({ isApproval = false }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [selectedValues, setSelectedValues] = useState(null);
  const [hasToReloadData, setHasToReloadData] = useState(false);
  const [isView, setIsView] = useState(false);
  const listURL = isApproval ? "/approval" : "";

  const columns = [
    {
      name: "status",
      label: t("status"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return t(getTextOrderStatus(value));
        },
      },
    },
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
    {
      name: "quantityOfProducts",
      label: t("totalpieces"),
      options: {
        filter: false,
      },
    },
    {
      name: "totalOfBoxes",
      label: t("totalboxes"),
      options: {
        filter: false,
      },
    },
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
    {
      name: "quantityOfContainers",
      label: t("quantityofcontainers"),
      options: {
        filter: false,
      },
    },
    {
      name: "totalOfReferences",
      label: t("totalofreferences"),
      options: {
        filter: false,
      },
    },
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
    setOpen(true);
    setId(-1);
    setSelectedValues(null);
  };

  const onEdit = (id, values) => {
    setIsView(values.status !== 0);
    setOpen(true);
    setId(id);
    setSelectedValues(values);
  };

  const onClose = () => {
    setOpen(false);
    setId(-1);
    setSelectedValues(null);
  };

  const onSendToApproval = () => {
    if (
      (selectedValues.status === 0 || selectedValues.status === 3) &&
      window.confirm(t("wishtosendtoapproval"))
    ) {
      callServer.post(`orderlists/sendtoapproval/${id}`).then((response) => {
        setId(-1);
        setSelectedValues(null);
        setHasToReloadData(true);
        enqueueSnackbar(t("ordersuccesssenttoapprov"), {
          variant: "success",
        });
      });
    } else {
      enqueueSnackbar(t("orderisinapproval"), {
        variant: "error",
      });
    }
  };

  const onApproval = () => {
    if (window.confirm(t("wanttoapprove"))) {
      callServer.post(`orderlists/approve/${id}`).then((response) => {
        setId(-1);
        setSelectedValues(null);
        setHasToReloadData(true);
        enqueueSnackbar(t("ordersuccessapproved"), {
          variant: "success",
        });
      });
    }
  };

  const onReproval = () => {
    if (window.confirm(t("wanttoreprove"))) {
      callServer.post(`orderlists/reprove/${id}`).then((response) => {
        setId(-1);
        setSelectedValues(null);
        setHasToReloadData(true);
        enqueueSnackbar(t("orderreproved"), {
          variant: "success",
        });
      });
    }
  };

  const onExport = () => {
    callServer
      .get(`orderlists/export/${id}`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${createUUID()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  };

  const onSave = async (order, saveAndExit) => {
    if (id === -1) {
      const response = await callServer.post(`orderlists`, order);
      const newId = extractId(response.headers.location);
      if (saveAndExit) {
        onClose();
      } else {
        setId(newId);
      }
    } else {
      await callServer.put(`orderlists/${id}`, order);
      if (saveAndExit) {
        onClose();
      }
    }
    setHasToReloadData(true);

    enqueueSnackbar(t("savedwithsuccess"), {
      variant: "success",
    });
  };

  return (
    <div>
      {open && (
        <OrderData
          idOrder={id}
          onSave={onSave}
          onClose={onClose}
          isView={isView}
        />
      )}
      <DataTable
        title="order"
        columns={columns}
        dataSource={`orderlists${listURL}`}
        initialSort={{ name: "name", direction: "asc" }}
        onAdd={onAdd}
        useAdd={!isApproval}
        useDelete={!isApproval}
        onEdit={onEdit}
        useEdit={!isApproval}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
        customToolbarSelect={
          (!isApproval && (
            <OrderToolbar
              useSendToApproval={true}
              onSendToApproval={onSendToApproval}
              useExport={true}
              onExport={onExport}
            />
          )) ||
          (isApproval && (
            <OrderToolbar
              useApproval={true}
              onApproval={onApproval}
              onReproval={onReproval}
            />
          ))
        }
        onRowSelectionChange={(id, values) => {
          setId(id);
          setSelectedValues(values);
        }}
      />
    </div>
  );
};

export default OrderList;
