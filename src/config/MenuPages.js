import React from "react";
import Home from "../pages/Home";
import FactoryList from "../pages/factory/FactoryList";

export const MenuPages = [
  {
    key: "home",
    text: "home",
    path: "/home",
    component: Home,
  },
  {
    key: "register",
    text: "register",
    pages: [
      {
        key: "factory",
        text: "factory",
        path: "/factory",
        component: FactoryList,
      },
      {
        key: "customer",
        text: "customer",
        path: "/customer",
        component: () => {
          return <h1>Customer</h1>;
        },
      },
    ],
  },
];
