import React from "react";
import FactoryList from "../pages/factory/FactoryList";
import CustomerList from "../pages/customer/CustomerList";
import PackingList from "../pages/packing/PackingList";
import ProductList from "../pages/product/ProductList";
import SeasonList from "../pages/season/SeasonList";
import OrderList from "../pages/order/OrderList";
import ImageList from "../pages/image/ImageList";
import LanguageList from "../pages/language/LanguageList";
import UserList from "../pages/user/UserList";
import OrderApprovalList from "../pages/order/OrderApprovalList";
import CertificationList from "../pages/certification/CertificationList";

export const MenuPages = [
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
  {
    key: "image",
    text: "picture",
    path: "/image",
    component: ImageList,
  },
  {
    key: "language",
    text: "language",
    path: "/language",
    component: LanguageList,
  },
  {
    key: "user",
    text: "user",
    path: "/user",
    component: UserList,
  },
  {
    key: "order",
    text: "order",
    path: "/order",
    component: OrderList,
  },
  {
    key: "orderapproval",
    text: "orderapproval",
    path: "/orderapproval",
    component: OrderApprovalList,
  },
  {
    key: "certification",
    text: "certification",
    path: "/certification",
    component: CertificationList,
  },
  {
    key: "labeling",
    text: "labeling",
    path: "/labeling",
    component: () => {
      return <h1>Labeling</h1>;
    },
  },
];
