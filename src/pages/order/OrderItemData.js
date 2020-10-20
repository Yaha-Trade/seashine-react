import React from "react";
import OrderStepper from "./OrderStepper";
import ModalData from "../../components/modal/ModalData";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";

const OrderItemData = ({ idOrder, onClose }) => {
  const saveData = async (product) => {
    const productResponse = await callServer.post(`products`, product);
    const newIdProduct = extractId(productResponse.headers.location);

    const orderItemResponse = await callServer.post("orderlistitems", {
      id: null,
      quantity: 15,
      product: {
        id: newIdProduct,
      },
      orderList: {
        id: idOrder,
      },
    });

    console.log(orderItemResponse);
  };

  return (
    <div>
      <ModalData
        isOpen={true}
        onClose={onClose}
        title="orderdata"
        fullScreen={true}
      >
        <OrderStepper saveData={saveData} />
      </ModalData>
    </div>
  );
};

export default OrderItemData;
