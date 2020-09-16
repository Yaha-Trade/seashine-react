import React from "react";
import Home from "../pages/Home";

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
        component: () => {
          return <h1>Factory</h1>;
        },
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
