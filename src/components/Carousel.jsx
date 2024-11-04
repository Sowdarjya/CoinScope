import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

const Carousel = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  const fetchTrendingCoins = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      const data = await res.json();
      setTrendingCoins(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  return (
    <div className="mt-6 flex items-center justify-center p-2 rounded-lg w-3/4">
      <Marquee className="bg-[#faed26] p-2 rounded-xl">
        <div className="flex">
          {trendingCoins.length > 0 ? (
            trendingCoins.map((coin) => (
              <Link key={coin.id} className="mx-4">
                <img src={coin.image} className="h-10" />
              </Link>
            ))
          ) : (
            <p className="font-medium text-center text-2xl text-[#121111]">
              Loading
            </p>
          )}
        </div>
      </Marquee>
    </div>
  );
};

export default Carousel;
