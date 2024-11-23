import React from "react";
import { useParams } from "react-router-dom";
import CoinDetails from "../components/CoinDetails";
import CoinChart from "../components/CoinChart";

const CryptoCoinDetails = () => {
  const { coinId } = useParams();

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen p-4 gap-6 items-center lg:items-start justify-center">
      <CoinDetails coinId={coinId} />
      <CoinChart coinId={coinId} />
    </div>
  );
};

export default CryptoCoinDetails;
