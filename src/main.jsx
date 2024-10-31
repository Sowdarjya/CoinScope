import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Header from "./components/Header.jsx";
import App from "./App.jsx";
import Home from "./pages/home.jsx";
import CryptoCurrencies from "./pages/CryptoCurrencies.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cryptocurrencies",
    element: <CryptoCurrencies />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
