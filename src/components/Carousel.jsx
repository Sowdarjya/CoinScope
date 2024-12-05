import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

const Carousel = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrendingCoins = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      const data = await res.json();
      setTrendingCoins(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  return (
    <div className="md:w-[85%] w-full max-w-4xl mx-auto mt-4 sm:mt-6 px-2 sm:px-4">
      <div className="bg-[#faed26] rounded-xl">
        <Marquee speed={50} gradient={false} className="overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center w-full">
              <p className="text-[#121111] text-lg sm:text-xl font-medium">
                Loading Trending Coins...
              </p>
            </div>
          ) : (
            <div className="flex items-center">
              {trendingCoins.map((coin) => (
                <div
                  key={coin.id}
                  className="flex flex-col items-center mx-3 sm:mx-4 my-2"
                >
                  <img
                    src={coin.image}
                    alt={`${coin.name} logo`}
                    className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </Marquee>
      </div>
    </div>
  );
};

export default Carousel;
