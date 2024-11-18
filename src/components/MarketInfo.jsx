import millify from "millify";
import React, { useEffect, useState } from "react";

const MarketInfo = () => {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarketInfo = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://api.coinranking.com/v2/stats");
      const data = await res.json();
      setMarketData(data.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch market data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-dots loading-lg bg-[#faed26] text-center"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 mb-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  const stats = [
    { title: "Total Coins", value: millify(marketData?.totalCoins) || 0 },
    { title: "Total Markets", value: millify(marketData?.totalMarkets) || 0 },
    {
      title: "Total Exchanges",
      value: millify(marketData?.totalExchanges) || 0,
    },
    {
      title: "Total Market Cap",
      value: millify(marketData?.totalMarketCap) || 0,
    },
    {
      title: "Total 24h Volume",
      value: millify(marketData?.total24hVolume) || 0,
    },
    { title: "Best Coin", value: marketData?.bestCoins[0].name || "N/A" },
  ];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-6 mb-6 text-center">
      {stats.map((stat, index) => (
        <div key={index} className="stats shadow ">
          <div className="stat">
            <div className="stat-title ">{stat.title}</div>
            <div className="stat-value text-lg">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketInfo;
