import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CoinList = () => {
  const [coinList, setCoinList] = useState([]);

  const fetchCoinList = async () => {
    try {
      const res = await fetch(
        `https://api.coinranking.com/v2/coins?currency=usd&limit=99`
      );
      const data = await res.json();
      setCoinList(data.data.coins);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoinList();
  }, []);
  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        {coinList.map((coin) => (
          <Link
            key={coin.uuid}
            className="w-full hover:scale-105 transform transition duration-300"
          >
            <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
              <div className="flex items-center p-4">
                <img
                  src={coin.iconUrl}
                  alt={coin.name}
                  className="h-12 w-12 mr-4"
                />
                <div>
                  <p className="text-lg font-bold text-gray-700">
                    {coin.rank}. {coin.symbol}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ${parseFloat(coin.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinList;
