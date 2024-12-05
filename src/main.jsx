import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CryptoCurrencyContext from "./context/CryptoCurrencyContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CryptoCurrencyContext>
        <App />
      </CryptoCurrencyContext>
    </BrowserRouter>
  </StrictMode>
);
