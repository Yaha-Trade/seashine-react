import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import ProductData from "../product/ProductData";
import ApprovalToolbar from "../../components/ApprovalToolbar";
import callServer from "../../services/callServer";
import { useSnackbar } from "notistack";
import { getTextLabelingStatus } from "../../services/Utils";

const LabelingList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      name: "labelingStatus",
      label: t("status"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return t(getTextLabelingStatus(value));
        },
      },
    },
    { name: "customer", label: t("customer") },
    { name: "season", label: t("season") },
    { name: "order", label: t("order") },
    { name: "factory", label: t("factory") },
    { name: "productReference", label: t("reference") },
    { name: "productDescription", label: t("description") },
  ];

  const getHasToReloadData = () => {
    return hasToReloadData;
  };

  const onEdit = (id) => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onApproval = () => {
    if (window.confirm(t("wanttoapprove"))) {
      callServer
        .post(`/products/approvelabeling/${productId}`)
        .then((response) => {
          setHasToReloadData(true);
          enqueueSnackbar(t("labelingsuccessapproved"), {
            variant: "success",
          });
        });
    }
  };

  const onReproval = () => {
    if (window.confirm(t("wanttoreprove"))) {
      callServer
        .post(`/products/reprovelabeling/${productId}`)
        .then((response) => {
          setHasToReloadData(true);
          enqueueSnackbar(t("labelingreproved"), {
            variant: "success",
          });
        });
    }
  };

  return (
    <div>
      {open && (
        <ProductData idProduct={productId} onClose={onClose} isView={true} />
      )}
      <DataTable
        title="labeling"
        columns={columns}
        dataSource="orderlistitems/allorderlistapproved"
        initialSort={{ name: "order", direction: "asc" }}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
        useDelete={false}
        useAdd={false}
        customToolbarSelect={
          <ApprovalToolbar onApproval={onApproval} onReproval={onReproval} />
        }
        onRowSelectionChange={(id, values) => {
          setProductId(values ? values.productId : null);
        }}
      />
    </div>
  );
};

export default LabelingList;
