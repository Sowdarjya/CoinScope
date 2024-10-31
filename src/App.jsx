import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import CryptoCurrencies from "./pages/CryptoCurrencies";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cryptocurrencies",
    element: <CryptoCurrencies />,
  },
]);

const App = () => {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
