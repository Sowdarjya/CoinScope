import millify from "millify";
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
    <div className="card w-96">
      <figure className="px-10 pt-10">
        <img src={coinData.data.coin.iconUrl} className="h-[15rem]" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title uppercase text-3xl font-extrabold">
          {" "}
          {coinData.data.coin.name}{" "}
        </h2>
        <p> {coinData.data.coin.description} </p>
        <p className="text-xl font-bold">
          {" "}
          Price: ${millify(coinData.data.coin.price)}{" "}
        </p>
        <p className="text-xl font-bold"> Rank: {coinData.data.coin.rank} </p>
        <p className="text-xl font-bold">
          {" "}
          Market cap: ${millify(coinData.data.coin.marketCap)}{" "}
        </p>
        <p className="text-xl font-bold">
          {" "}
          All-time-high: ${millify(coinData.data.coin.allTimeHigh.price)}{" "}
        </p>
      </div>
    </div>
  );
};

export default CoinDetails;
