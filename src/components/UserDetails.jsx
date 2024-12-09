import React, { useContext, useState } from "react";
import { auth } from "../config/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import noUserImg from "../assets/noUserImg.webp";
import { CryptoCurrency } from "../context/CryptoCurrencyContext";

const UserDetails = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const user = auth.currentUser;
  const { setUser } = useContext(CryptoCurrency);

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setUser(false);
        toast.success("Logged Out", {
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
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
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
      });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <div className="flex flex-col items-center space-y-4">
        <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
          <img
            src={imageError ? noUserImg : user?.photoURL || noUserImg}
            alt={user?.displayName || "User Profile"}
            className="w-full h-full object-cover rounded-full border-4 border-gray-200 shadow-lg"
            onError={handleImageError}
            loading="lazy"
          />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            {user?.displayName || "User"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">{user?.email}</p>

          <div className="text-xs text-gray-500 space-y-1">
            <p>
              Created at:{" "}
              {user?.metadata?.creationTime
                ? user.metadata.creationTime
                : "N/A"}
            </p>
            <p>
              Last activity:{" "}
              {user?.metadata?.lastSignInTime
                ? user.metadata.lastSignInTime
                : "N/A"}
            </p>
          </div>

          <div className="pt-4">
            <button
              className="px-6 py-2 text-[#faed26] border-2 border-[#faed26] rounded-3xl 
                         hover:bg-[#faed26] hover:text-[#121111] 
                         transition-colors duration-200 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#faed26]"
              onClick={logOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
