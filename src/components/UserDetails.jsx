import React, { useContext, useState } from "react";
import { CryptoCurrency } from "../context/CryptoCurrencyContext";
import { auth } from "../config/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import noUserImg from "../assets/noUserImg.webp";

const UserDetails = () => {
  const { user, setUser } = useContext(CryptoCurrency);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  console.log(user);

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setUser(null);
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
    <div className="w-1/3 min-h-[50%] p-8">
      <Toaster position="top-right" />
      <div className="flex justify-center mb-4">
        <img
          src={imageError ? noUserImg : user?.photoURL || noUserImg}
          alt={user?.displayName || "User Profile"}
          className="w-64 h-64 object-cover rounded-full border-4 shadow-lg"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <h1 className="text-center text-4xl font-bold mb-4">
        {user?.displayName || "User"}
      </h1>
      <p className="text-center mb-4">{user?.email}</p>
      <p className="text-center mb-4 text-xs">
        Created at:{" "}
        {user?.metadata?.creationTime ? user.metadata.creationTime : "N/A"}
      </p>
      <p className="text-center mb-4 text-xs">
        Last acttivity:{" "}
        {user?.metadata?.lastSignInTime ? user.metadata.lastSignInTime : "N/A"}
      </p>
      <div className="flex justify-center">
        <button
          className="px-6 py-2 text-[#faed26] border-2 border-[#faed26] rounded-3xl hover:bg-[#faed26] transition-colors duration-200 hover:text-[#121111]"
          onClick={logOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
