import React from "react";
import heroImg from "../assets/increase.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="flex items-center justify-around w-full h-[80vh]">
      <div className="w-[55%] text-center h-full flex flex-col items-center justify-center">
        <h1 className="text-6xl mb-4 font-semibold text-[#faed26]">
          All Your Coins <br /> One Tracker
        </h1>
        <div>
          <button className="btn btn-outline hover:bg-[#faed26] text-[#faed26] hover:text-[#121111] mx-3">
            <Link to="/cryptos">Check Dashboard</Link>
          </button>
          <button className="btn btn-outline hover:bg-[#faed26] text-[#faed26] hover:text-[#121111] mx-3">
            <Link to="/news">Check News</Link>
          </button>
        </div>
      </div>
      <div className="w-[45%] h-full flex items-center justify-start">
        <img src={`${heroImg}`} className="h-[18rem]" />
      </div>
    </main>
  );
};

export default Hero;
