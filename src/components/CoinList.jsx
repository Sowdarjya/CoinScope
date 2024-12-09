import millify from "millify";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { CryptoCurrency } from "../context/CryptoCurrencyContext";
import { FaRegHeart } from "react-icons/fa";
import { auth, db } from "../config/firebaseConfig";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

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

  const { currency, symbol, currencyRefId, changeToInr, changeToUsd } =
    useContext(CryptoCurrency);

  const fetchCoinList = async () => {
    try {
      const res = await fetch(
        `https://api.coinranking.com/v2/coins?referenceCurrencyUuid=${currencyRefId}&limit=99`
      );
      const data = await res.json();
      if (data.data && data.data.coins) {
        setCoinList(data.data.coins);
        setFilteredCoinList(data.data.coins);
      } else {
        console.error("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchCoinList();
  }, [currency]);

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
    setCurrentPage(1);
  }, [search, coinList]);

  const user = auth.currentUser;
  const addToFavList = async (coin) => {
    const coinDocRef = doc(db, "users", user.uid, "favourites", coin.uuid);
    const coinDoc = await getDoc(coinDocRef);

    if (!user) {
      toast.error("You need to be logged in to add favorites", {
        style: {
          padding: "16px",
          color: "#faed26",
          background: "#121111",
          border: "3px solid #faed26",
        },
        iconTheme: {
          primary: "#faed26",
          secondary: "#121111",
        },
      });
      return;
    }

    try {
      if (!coinDoc.exists()) {
        await setDoc(doc(db, "users", user.uid, "favourites", coin.uuid), {
          name: coin.name,
          img: coin.iconUrl,
          coinId: coin.uuid,
        });
        toast.success(`${coin.name} added to watchlist!`, {
          style: {
            padding: "16px",
            color: "#faed26",
            background: "#121111",
            border: "3px solid #faed26",
          },
          iconTheme: {
            primary: "#faed26",
            secondary: "#121111",
          },
        });
      } else {
        toast.error(`${coin.name} already added to watchlist`, {
          style: {
            padding: "16px",
            color: "#faed26",
            background: "#121111",
            border: "3px solid #faed26",
          },
          iconTheme: {
            primary: "#faed26",
            secondary: "#121111",
          },
        });
      }
    } catch (error) {
      toast.error("Error adding to favorites", {
        style: {
          padding: "16px",
          color: "#faed26",
          background: "#121111",
          border: "3px solid #faed26",
        },
        iconTheme: {
          primary: "#faed26",
          secondary: "#121111",
        },
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4 px-6">
        <input
          type="text"
          placeholder="Search cryptocurrency"
          value={search}
          className="w-full sm:w-1/2 p-3 outline-none bg-base-100 rounded-md"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            onClick={changeToUsd}
            className={`py-3 px-6 rounded shadow-md hover:scale-105 transition ${
              currency === "USD" ? "bg-[#faed26] text-[#121111]" : "bg-base-100"
            }`}
          >
            USD
          </button>
          <button
            onClick={changeToInr}
            className={`py-3 px-6 rounded shadow-md hover:scale-105 transition ${
              currency === "INR" ? "bg-[#faed26] text-[#121111]" : "bg-base-100"
            }`}
          >
            INR
          </button>
        </div>
      </div>

      <div className="p-6 min-h-[100vh]">
        {coinList.length > 0 ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 place-items-center">
            {coins.map((coin) => (
              <div
                key={coin.uuid}
                className="w-[95%] hover:scale-105 transform transition duration-300"
              >
                <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
                  <div className="flex items-center p-4 mx-auto md:mx-0 flex-col md:flex-row">
                    <img
                      src={coin.iconUrl}
                      alt={coin.name}
                      className="h-14 w-12 mr-6"
                    />
                    <div>
                      <p className="text-xl font-bold">
                        {coin.rank}. {coin.symbol}
                      </p>
                      <p className="text-xl ">
                        Price: {symbol} {millify(coin.price)}
                      </p>
                      <p className="text-xl ">
                        Market cap: {symbol} {millify(coin.marketCap)}
                      </p>
                      <p className="text-xl">
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
                      <div className="flex items-center justify-start mt-2 gap-4">
                        <Link to={`/cryptocurrencies/${coin.uuid}`}>
                          <button className="hover:bg-[#faed26] py-1 px-2 rounded-lg hover:text-[#121111] border-2 border-[#faed26] text-[#faed26] transition-colors">
                            Details
                          </button>
                        </Link>
                        {user && (
                          <button
                            onClick={() => addToFavList(coin)}
                            className=" p-2 rounded-full border-2 text-red-500 border-red-500 hover:bg-red-600 hover:text-gray-400 hover:border-gray-400"
                          >
                            <FaRegHeart className="text-md" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
