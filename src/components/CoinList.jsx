import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CoinList = () => {
  const [coinList, setCoinList] = useState([]);

  const fetchCoinList = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );

      const data = await res.json();

      setCoinList(data);
      console.log(data);
      console.log("state>>>", coinList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoinList();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-3 grid-rows-3 p-8">
      {coinList.map((coin) => (
        <Link key={coin.id}>
          <div className="card card-side bg-base-100 shadow-xl p-4">
            <figure>
              <img src={coin.image} className="h-10" />
            </figure>
            <div className="card-body">
              <p className="card-title"> {coin.name} </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CoinList;
