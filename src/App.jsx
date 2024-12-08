import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CryptoCurrencies from "./pages/CryptoCurrencies";
import News from "./pages/News";
import Footer from "./components/Footer";
import CryptoCoinDetails from "./pages/CryptoCoinDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
        <Route
          path="/cryptocurrencies/:coinId"
          element={<CryptoCoinDetails />}
        />
        <Route path="/news" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
