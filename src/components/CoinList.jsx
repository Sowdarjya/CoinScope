import millify from "millify";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const CoinList = () => {
  const [coinList, setCoinList] = useState([]);
  const [filteredCoinList, setFilteredCoinList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(9);

  const lastCoin = currentPage * coinsPerPage;
  const firstCoin = lastCoin - coinsPerPage;
  const coins = filteredCoinList.slice(firstCoin, lastCoin);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const fetchCoinList = async () => {
    try {
      const res = await fetch(
        `https://api.coinranking.com/v2/coins?referenceCurrencyUuid=6mUvpzCc2lFo&limit=99`
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

  useEffect(() => {
    const searchTerm = search.toLowerCase().trim();
    if (!searchTerm) {
      setFilteredCoinList(coinList);
      return;
    }

    const filteredData = coinList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    setFilteredCoinList(filteredData);
  }, [search, coinList]);
  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <input
          type="text"
          placeholder="Search cryptocurrency"
          value={search}
          className="w-1/2 p-3 outline-none bg-base-100 rounded-md"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="p-6">
        {coinList.length > 0 ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 place-items-center">
            {coins.map((coin) => (
              <Link
                key={coin.uuid}
                to={`/cryptocurrencies/${coin.uuid}`}
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
                            coin.change >= 0
                              ? " text-lime-500"
                              : " text-red-500"
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
      <Pagination
        elementsPerPage={coinsPerPage}
        totalElements={filteredCoinList.length}
        paginate={paginate}
      />
    </>
  );
};

export default CoinList;
