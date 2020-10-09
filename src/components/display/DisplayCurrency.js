import React from "react";

import { CurrencyEnum } from "../../enums/CurrencyEnum";
import NumberFormat from "react-number-format";

const DisplayCurrency = ({ value }) => {
  return (
    <NumberFormat
      thousandSeparator={CurrencyEnum.DIGITGROUPSEPARATOR}
      decimalSeparator={CurrencyEnum.DECIMALCHARACTER}
      decimalScale={CurrencyEnum.DECIMALSCALE}
      prefix={CurrencyEnum.CURRENCYSYMBOL}
      displayType={"text"}
      value={value}
      fixedDecimalScale={true}
    />
  );
};

export default DisplayCurrency;
