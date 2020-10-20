import React from "react";
import OrderStepper from "./OrderStepper";
import ModalData from "../../components/modal/ModalData";

const OrderItemData = ({ onSave, onClose }) => {
  return (
    <div>
      <ModalData
        onClose={onClose}
        isOpen={true}
        title="orderitemdata"
        fullScreen={true}
        hasActions={false}
      >
        <OrderStepper saveData={onSave} onClose={onClose} />
      </ModalData>
    </div>
  );
};

export default OrderItemData;
