import React, { createContext } from "react";
import { useState } from "react";

export const CryptoCurrency = createContext();

const CryptoCurrencyContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [currencyRefId, setCurrencyRefId] = useState("yhjMzLPhuIDl");

  return (
    <CryptoCurrency.Provider
      value={{
        currency,
        symbol,
        currencyRefId,
        setCurrency,
        setCurrencyRefId,
        setSymbol,
      }}
    >
      {children}
    </CryptoCurrency.Provider>
  );
};

export default CryptoCurrencyContext;
