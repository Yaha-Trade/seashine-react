import Home from "../pages/Home";
import FactoryList from "../pages/factory/FactoryList";
import CustomerList from "../pages/customer/CustomerList";
import PackingList from "../pages/packing/PackingList";

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
        component: CustomerList,
      },
      {
        key: "packing",
        text: "packing",
        path: "/packing",
        component: PackingList,
      },
    ],
  },
];
