import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CryptoCurrencies from "./pages/CryptoCurrencies";
import News from "./pages/News";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cryptos" element={<CryptoCurrencies />} />
        <Route path="/news" element={<News />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
