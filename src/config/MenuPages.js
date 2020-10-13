import Home from "../pages/Home";
import FactoryList from "../pages/factory/FactoryList";
import CustomerList from "../pages/customer/CustomerList";
import PackingList from "../pages/packing/PackingList";
import ProductList from "../pages/product/ProductList";
import SeasonList from "../pages/season/SeasonList";

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
      {
        key: "product",
        text: "product",
        path: "/product",
        component: ProductList,
      },
      {
        key: "season",
        text: "season",
        path: "/season",
        component: SeasonList,
      },
    ],
  },
];
