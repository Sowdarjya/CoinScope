import React, { useContext, useEffect } from "react";
import { auth, db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { CryptoCurrency } from "../context/CryptoCurrencyContext";
import { Toaster } from "react-hot-toast";

const WatchList = () => {
  const [watchList, setWatchList] = useState([]);
  const user = auth.currentUser;
  const { currency } = useContext(CryptoCurrency);

  const getWatchList = async () => {
    if (!user) {
      return;
    }
    try {
      const watchlistCollectionRef = collection(
        db,
        "users",
        user.uid,
        "favourites"
      );
      const querySnapshot = await getDocs(watchlistCollectionRef);
      const watchListData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWatchList(watchListData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getWatchList();
  }, []);

  if (!user) {
    return <h1>Login to see your watchlist</h1>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-center">My Watchlist</h2>

      {watchList.length === 0 ? (
        <div className="text-center text-xl">
          Your watchlist is empty. Add some cryptocurrencies!
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 place-items-center">
          {watchList.map((coin) => (
            <div key={coin.uuid} className="w-[90%]">
              <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center p-4 mx-auto md:mx-0 flex-col lg:flex-row">
                  <img
                    src={coin.iconUrl}
                    alt={coin.name}
                    className="h-14 w-12 mr-6"
                  />
                  <div>
                    <p className="text-xl font-bold">{coin.name}</p>
                    <p className="text-xl">
                      Price: {coin.symbol} {millify(coin.price)}
                    </p>
                    <p className="text-xl">
                      Market cap: {coin.symbol} {millify(coin.marketCap)}
                    </p>
                    <p className="text-xl">
                      24h change:{" "}
                      <span
                        className={
                          coin.change >= 0 ? " text-lime-500" : " text-red-500"
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
                      <button
                        // onClick={() => removeFromWatchlist(coin.uuid)}
                        className="p-2 rounded-full border-2 text-red-500 border-red-500 hover:bg-red-600 hover:text-gray-400 hover:border-gray-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;
