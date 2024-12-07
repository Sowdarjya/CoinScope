import React, { createContext } from "react";
import { useState } from "react";

export const CryptoCurrency = createContext();

const CryptoCurrencyContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [currencyRefId, setCurrencyRefId] = useState("yhjMzLPhuIDl");

  const changeToInr = () => {
    setCurrency("INR");
    setCurrencyRefId("6mUvpzCc2lFo");
    setSymbol("₹");
  };

  const changeToUsd = () => {
    setCurrency("USD");
    setCurrencyRefId("yhjMzLPhuIDl");
    setSymbol("$");
  };

  return (
    <CryptoCurrency.Provider
      value={{
        currency,
        symbol,
        currencyRefId,
        changeToUsd,
        changeToInr,
      }}
    >
      {children}
    </CryptoCurrency.Provider>
  );
};

export default CryptoCurrencyContext;
