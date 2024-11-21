import React, { useEffect, useState } from "react";

const CoinDetails = ({ coinId }) => {
  const [coinData, setCoinData] = useState(null);

  const fetchCoinDetails = async () => {
    try {
      const res = await fetch(`https://api.coinranking.com/v2/coin/${coinId}`);
      const data = await res.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoinDetails();
  }, [coinId]);

  if (!coinData)
    return (
      <div className="flex items-center justify-center ">
        <span className="loading loading-ring loading-lg bg-[#faed26]"></span>
      </div>
    );

  return (
    <div className="flex items-center justify-between h-screen">
      <div className="w-[40%]">
        <img
          src={coinData.data.coin.iconUrl}
          alt={coinData.data.coin.name}
          className="h-[15rem] mx-auto"
        />
        <h1 className="text-center">{coinData.data.coin.name}</h1>
      </div>
    </div>
  );
};

export default CoinDetails;
