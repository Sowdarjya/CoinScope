import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const WatchList = () => {
  const [watchList, setWatchList] = useState([]);

  const user = auth.currentUser;

  const getWatchList = async () => {
    if (!user) {
      return;
    }

    try {
      const watchListDocsRef = collection(db, "users", user.uid, "favourites");
      const watchListDocs = await getDocs(watchListDocsRef);
      const watchListData = watchListDocs.docs.map((doc) => doc.data());
      setWatchList(watchListData);
    } catch (error) {
      toast.error(error.message, {
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

  const removeFromWatchList = async (coinId) => {
    try {
      const coinDocRef = doc(db, "users", user.uid, "favourites", coinId);

      await deleteDoc(coinDocRef);

      setWatchList((prev) => prev.filter((coin) => coin.coinId !== coinId));
      toast.success("removed from watchlist", {
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
    } catch (error) {
      toast.error(error.message, {
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

  useEffect(() => {
    getWatchList();
  }, [watchList]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center w-2/3">
        <h1 className="text-3xl text-[#faed26]">
          Log in first to see your watch list
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl p-4 sm:px-6 lg:px-8 mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
        My Watchlist
      </h1>

      {watchList.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {watchList.map((coin) => (
            <div
              key={coin.coinId}
              className="bg-base-100 rounded-lg shadow-md hover:shadow-lg 
                         transform hover:scale-105 transition-all duration-300 
                         flex items-center justify-between p-4 space-x-4"
            >
              <Link
                to={`/cryptocurrencies/${coin.coinId}`}
                className="flex items-center space-x-4 flex-grow"
              >
                <img
                  src={coin.img}
                  alt={coin.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
                <p
                  className="text-lg sm:text-xl font-medium truncate 
                              hover:text-[#faed26] transition-colors duration-200"
                >
                  {coin.name}
                </p>
              </Link>

              <button
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                onClick={() => removeFromWatchList(coin.coinId)}
                aria-label={`Remove ${coin.name} from watchlist`}
              >
                <RiDeleteBin6Line className="text-xl sm:text-2xl" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl sm:text-2xl text-gray-600">
            No coins added to watchlist. Add some!
          </p>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Explore cryptocurrencies and start tracking your favorites.
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchList;
