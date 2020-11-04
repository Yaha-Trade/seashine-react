import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import ImageData from "./ImageData";

const ImageList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "customer", label: t("customer") },
    { name: "season", label: t("season") },
    { name: "order", label: t("order") },
    { name: "factory", label: t("factory") },
    { name: "productReference", label: t("reference") },
    { name: "productDescription", label: t("description") },
    { name: "quantityOfImages", label: t("quantityofimages") },
  ];

  const getHasToReloadData = () => {
    return hasToReloadData;
  };

  const onAdd = () => {
    setOpen(true);
    setId(-1);
  };

  const onEdit = (id, values) => {
    setOpen(true);
    setId(values.productId);
  };

  const onClose = () => {
    setOpen(false);
    setId(-1);
  };

  return (
    <div>
      {open && (
        <ImageData
          idProduct={id}
          onSave={() => console.log("save")}
          onClose={onClose}
        />
      )}
      <DataTable
        title="picture"
        columns={columns}
        dataSource="orderlistitems/images"
        initialSort={{ name: "quantityOfImages", direction: "asc" }}
        onAdd={onAdd}
        onEdit={onEdit}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
        useDelete={false}
        useAdd={false}
      />
    </div>
  );
};

export default ImageList;
