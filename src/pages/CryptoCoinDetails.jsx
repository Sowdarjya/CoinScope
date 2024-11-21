import React from "react";
import { useParams } from "react-router-dom";
import CoinDetails from "../components/CoinDetails";

const CryptoCoinDetails = () => {
  const { coinId } = useParams();

  return (
    <div>
      <CoinDetails coinId={coinId} />
    </div>
  );
};

export default CryptoCoinDetails;
