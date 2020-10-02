import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import ProductData from "./ProductData";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";

const ProductList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "reference", label: t("reference") },
    { name: "description", label: t("description") },
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

  const onSave = (product) => {
    if (id === -1) {
      callServer.post(`products`, product).then((response) => {
        const newId = extractId(response.headers.location);
        setId(newId);
        setHasToReloadData(true);
      });
    } else {
      callServer.put(`products/${id}`, product).then((response) => {
        setHasToReloadData(true);
      });
    }
  };

  return (
    <div>
      {open && <ProductData idProduct={id} onSave={onSave} onClose={onClose} />}
      <DataTable
        title={t("product")}
        columns={columns}
        dataSource="products"
        serverSide={true}
        initialSort={{ name: "reference", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
      />
    </div>
  );
};

export default ProductList;
