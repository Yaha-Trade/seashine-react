import React from "react";
import DataTable from "../components/DataTable";

const columns = [
  {
    name: "id",
    label: "#ID",
  },
  {
    name: "name",
    label: "Name",
  },
  { name: "address", label: "Address" },
  { name: "contact", label: "Contact" },
  {
    name: "bankAccountNumber",
    label: "Bank account",
    options: {
      align: "right",
      hint: "Número da conta no banco",
      setCellProps: () => ({
        align: "left",
      }),
    },
  },
  { label: "Telephones", name: "telephones", options: { filter: false } },
  { label: "Mobile", name: "mobilePhones", options: { filter: false } },
  { label: "QQ Numbers", name: "qqNumbers", options: { filter: false } },
];

const Factory = () => {
  return (
    <DataTable
      title="Factory"
      columns={columns}
      dataSource="factories"
      serverSide={true}
    />
  );
};

export default Factory;
