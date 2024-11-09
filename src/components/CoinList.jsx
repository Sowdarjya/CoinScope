import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import millify from "millify";

const CoinList = () => {
  const [coinList, setCoinList] = useState([]);

  const fetchCoinList = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );

      const data = await res.json();

      setCoinList(data);
      console.log("state>>>", coinList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoinList();
  }, []);

  return (
    <div className="flex items-center justify-center">
      {coinList.length ? (
        <div className="grid gap-4 grid-cols-3 grid-rows-3 p-4">
          {coinList.map((coin) => (
            <Link key={coin.id}>
              <div className="card card-side bg-base-100 shadow-xl px-4">
                <figure>
                  <img src={coin.image} className="h-20" />
                </figure>
                <div className="card-body">
                  <h1 className="card-title"> {coin.symbol} </h1>
                  <p> Price: {millify(coin.current_price)} </p>
                  <p> Market cap: {millify(coin.market_cap)} </p>
                  <p>
                    24h change:{" "}
                    <span
                      className={
                        coin.price_change_percentage_24h > 0
                          ? "text-lime-500"
                          : "text-red-600"
                      }
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <span className="loading loading-spinner loading-lg bg-[#faed26] h-screen"></span>
      )}
    </div>
  );
};

export default CoinList;
