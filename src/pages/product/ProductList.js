import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import ProductData from "./ProductData";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";
import DisplayCurrency from "../../components/display/DisplayCurrency";

const ProductList = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);

  const columns = [
    { name: "reference", label: t("reference") },
    { name: "description", label: t("description") },
    {
      name: "factoryName",
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

  const onSave = async (product) => {
    if (id === -1) {
      const response = await callServer.post(`products`, product);
      const newId = extractId(response.headers.location);
      setId(newId);
    } else {
      await callServer.put(`products/${id}`, product);
    }
    setHasToReloadData(true);
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
