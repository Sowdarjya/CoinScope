import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import CryptoCurrencies from "./pages/CryptoCurrencies";
import News from "./pages/News";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cryptos" element={<CryptoCurrencies />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
};

export default App;
