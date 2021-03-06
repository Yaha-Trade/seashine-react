import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import ProductData from "./ProductData";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";
import DisplayCurrency from "../../components/display/DisplayCurrency";
import ProductToolbar from "./ProductToolbar";
import ImportProduct from "./ImportProduct";
import { useSnackbar } from "notistack";

const ProductList = ({ tableHeight, onRowSelectionChange = () => {} }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const columns = [
    { name: "reference", label: t("reference") },
    { name: "description", label: t("description") },
    {
      name: "factory",
      label: t("factory"),
    },
    {
      name: "price",
      label: t("price"),
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
  };

  const onEdit = (id) => {
    setOpen(true);
    setId(id);
  };

  const onClose = () => {
    setOpen(false);
    setId(-1);
  };

  const onSave = async (product) => {
    if (id === -1) {
      const response = await callServer.post(`products`, product);
      const newId = extractId(response.headers.location);
      setId(newId);
    } else {
      await callServer.put(`products/${id}`, product);
    }
    setHasToReloadData(true);

    enqueueSnackbar(t("savedwithsuccess"), {
      variant: "success",
    });
  };

  return (
    <div>
      {open && <ProductData idProduct={id} onSave={onSave} onClose={onClose} />}
      {isImportOpen && (
        <ImportProduct
          callBack={() => setHasToReloadData(true)}
          onClose={() => setIsImportOpen(false)}
        />
      )}
      <DataTable
        title="product"
        columns={columns}
        dataSource="products"
        initialSort={{ name: "reference", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
        customToolbar={
          <ProductToolbar onImport={() => setIsImportOpen(true)} />
        }
        tableHeight={tableHeight ? tableHeight : window.innerHeight}
        onRowSelectionChange={onRowSelectionChange}
      />
    </div>
  );
};

export default ProductList;
