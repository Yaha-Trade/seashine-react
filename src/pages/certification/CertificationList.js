import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import ProductData from "../product/ProductData";
import CertificationToolbar from "./CertificationToolbar";
import callServer from "../../services/callServer";
import { useSnackbar } from "notistack";
import { getTextCertificationStatus } from "../../services/Utils";

const CertificationList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [productId, setProductId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      name: "certificationStatus",
      label: t("status"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return t(getTextCertificationStatus(value));
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
      callServer.post(`/certifications/approve/${id}`).then((response) => {
        setId(-1);
        setHasToReloadData(true);
        enqueueSnackbar(t("certificationsuccessapproved"), {
          variant: "success",
        });
      });
    }
  };

  const onReproval = () => {
    if (window.confirm(t("wanttoreprove"))) {
      callServer.post(`/certifications/reprove/${id}`).then((response) => {
        setId(-1);
        setHasToReloadData(true);
        enqueueSnackbar(t("certificationreproved"), {
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
        title="certification"
        columns={columns}
        dataSource="orderlistitems/certification"
        initialSort={{ name: "order", direction: "asc" }}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
        useDelete={false}
        useAdd={false}
        customToolbarSelect={
          <CertificationToolbar
            onApproval={onApproval}
            onReproval={onReproval}
          />
        }
        onRowSelectionChange={(id, values) => {
          setId(id);
          setProductId(values ? values.productId : null);
        }}
      />
    </div>
  );
};

export default CertificationList;
