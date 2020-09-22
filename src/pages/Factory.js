import React from "react";
import DataTable from "../components/DataTable";
import { useTranslation } from "react-i18next";

const Factory = () => {
  const { t } = useTranslation();

  const columns = [
    {
      name: "name",
      label: t("name"),
    },
    { name: "address", label: t("address") },
    { name: "contact", label: t("contact") },
    {
      name: "bankAccountNumber",
      label: t("bankaccount"),
    },
  ];

  return (
    <DataTable
      title={t("factory")}
      columns={columns}
      dataSource="factories"
      serverSide={true}
      initialSort={{ name: "name", direction: "asc" }}
    />
  );
};

export default Factory;
