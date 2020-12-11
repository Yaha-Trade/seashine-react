import React, { useState } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";
import ProductData from "../product/ProductData";
import { getTextProductionStatus } from "../../services/Utils";
import OrderFactoryToolbar from "./OrderFactoryToolbar";
import OrderFactoryData from "./OrderFactoryData";
import { useSnackbar } from "notistack";
import callServer from "../../services/callServer";

const OrderFactoryList = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openProjectData, setOpenProjectData] = useState(false);
  const [idOrderListItem, setIdOrderListItem] = useState();
  const [idProduct, setIdProduct] = useState();
  const [hasToReloadData, setHasToReloadData] = useState(false);
  const [openProductionData, setOpenProductionData] = useState();

  const columns = [
    {
      name: "productionStatus",
      label: t("status"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return t(getTextProductionStatus(value));
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

  const onViewProductData = (id) => {
    setOpenProjectData(true);
  };

  const onCloseProjectData = () => {
    setOpenProjectData(false);
  };

  const onEditProductionData = () => {
    setOpenProductionData(true);
  };

  const onCloseProductionData = () => {
    setOpenProductionData(false);
  };

  const onSaveProduction = async (production) => {
    await callServer.put(`productions/${production.id}`, production);

    setHasToReloadData(true);

    enqueueSnackbar(t("savedwithsuccess"), {
      variant: "success",
    });
  };

  return (
    <div>
      {openProjectData && (
        <ProductData
          idProduct={idProduct}
          onClose={onCloseProjectData}
          isView={true}
        />
      )}

      {openProductionData && (
        <OrderFactoryData
          idOrderListItem={idOrderListItem}
          onSave={onSaveProduction}
          onClose={onCloseProductionData}
          isView={true}
        />
      )}

      <DataTable
        title="orderlistfactory"
        columns={columns}
        dataSource="orderlistitems/allproductsapproved"
        initialSort={{ name: "order", direction: "asc" }}
        onEdit={onEditProductionData}
        setHasToReloadData={setHasToReloadData}
        getHasToReloadData={getHasToReloadData}
        useDelete={false}
        useAdd={false}
        customToolbarSelect={
          <OrderFactoryToolbar onViewProductData={onViewProductData} />
        }
        onRowSelectionChange={(id, values) => {
          setIdOrderListItem(id);
          setIdProduct(values ? values.productId : null);
        }}
      />
    </div>
  );
};

export default OrderFactoryList;
