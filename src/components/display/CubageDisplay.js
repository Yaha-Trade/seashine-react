import React from "react";

import { NumberEnum } from "../../enums/NumberEnum";
import { CubageEnum } from "../../enums/CubageEnum";
import NumberFormat from "react-number-format";

const CubageDisplay = ({ value }) => {
  return (
    <NumberFormat
      thousandSeparator={NumberEnum.DIGITGROUPSEPARATOR}
      decimalSeparator={NumberEnum.DECIMALCHARACTER}
      decimalScale={NumberEnum.DECIMALSCALE}
      suffix={CubageEnum.CUBAGESYMBOL}
      displayType={"text"}
      value={value}
      fixedDecimalScale={true}
    />
  );
};

export default CubageDisplay;
