import millify from "millify";
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
      {coinList.length > 0 ? (
        <div className="grid grid-cols-3 gap-6 place-items-center">
          {coinList.map((coin) => (
            <Link
              key={coin.uuid}
              className="w-[95%] hover:scale-105 transform transition duration-300"
            >
              <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center p-4">
                  <img
                    src={coin.iconUrl}
                    alt={coin.name}
                    className="h-12 w-12 mr-4"
                  />
                  <div>
                    <p className="text-lg font-bold">
                      {coin.rank}. {coin.symbol}
                    </p>
                    <p className="text-lg ">Price: ${millify(coin.price)}</p>
                    <p className="text-lg ">
                      Market cap: ${millify(coin.marketCap)}
                    </p>
                    <p className="text-lg">
                      24h change:{" "}
                      <span
                        className={
                          coin.change >= 0 ? " text-lime-500" : " text-red-500"
                        }
                      >
                        {millify(coin.change)}%
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-ring loading-lg bg-[#faed26]"></span>
        </div>
      )}
    </div>
  );
};

export default CoinList;
