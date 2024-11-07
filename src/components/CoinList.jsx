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
    <div className="grid">
      {coinList.map((coin) => (
        <Link key={coin.id} className="grid">
          <div className="card card-compact bg-base-100  shadow-xl">
            <figure>
              <img src={coin.image} className="h-8" />
            </figure>
            <div className="card-body">
              <h2 className="card-title"> {coin.name} </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CoinList;
