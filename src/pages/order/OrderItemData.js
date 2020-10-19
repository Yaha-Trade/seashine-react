import React from "react";
import OrderStepper from "./OrderStepper";
import ModalData from "../../components/modal/ModalData";

const OrderItemData = ({ onClose }) => {
  return (
    <div>
      <ModalData
        //onSave={saveData}
        isOpen={true}
        onClose={onClose}
        title="orderdata"
        fullScreen={true}
      >
        <OrderStepper />
      </ModalData>
    </div>
  );
};

export default OrderItemData;
