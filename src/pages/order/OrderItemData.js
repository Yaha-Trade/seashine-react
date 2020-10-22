import React from "react";
import OrderStepper from "./OrderStepper";
import ModalData from "../../components/modal/ModalData";
import ProductData from "../../pages/product/ProductData";

const OrderItemData = ({ onSave, onClose, idOrdemItem }) => {
  return (
    <div>
      <ModalData
        onClose={onClose}
        isOpen={true}
        title="orderitemdata"
        fullScreen={true}
        hasActions={false}
      >
        {idOrdemItem === -1 && (
          <OrderStepper saveData={onSave} onClose={onClose} />
        )}
        {idOrdemItem !== -1 && (
          <ProductData
            idProduct={-1}
            idOrdemItem={idOrdemItem}
            onSave={onSave}
            onClose={onClose}
            isOrder={true}
          />
        )}
      </ModalData>
    </div>
  );
};

export default OrderItemData;
