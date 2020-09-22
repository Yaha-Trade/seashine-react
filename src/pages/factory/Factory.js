import React from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTranslation } from "react-i18next";

const Factory = () => {
  const { t } = useTranslation();

  const columns = [
    { name: "name", label: t("name") },
    { name: "contact", label: t("contact") },
    { name: "address", label: t("address") },
    { name: "bankAccountNumber", label: t("bankaccount") },
  ];

  const onAdd = () => {
    console.log("adicionando fábrica");
  };

  const onEdit = (id) => {
    console.log("editando fábrica -> " + id);
  };

  return (
    <DataTable
      title={t("factory")}
      columns={columns}
      dataSource="factories"
      serverSide={true}
      initialSort={{ name: "name", direction: "asc" }}
      onAdd={onAdd}
      onEdit={onEdit}
    />
  );
};

export default Factory;
