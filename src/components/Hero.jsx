import React from "react";
import heroImg from "../assets/increase.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="hero min-h-[80vh]">
      <div className="hero-content flex items-center justify-between">
        <div>
          <h1 className="text-6xl text-[#faed26] text-center font-semibold mb-8">
            All Your Coins <br /> One Tracker
          </h1>
          <div className="flex items-center justify-center gap-3">
            <Link to="/cryptos">
              <button className="btn btn-outline text-[#faed26] hover:text-[#121111] hover:bg-[#faed26]">
                Check Dashboard
              </button>
            </Link>
            <Link to="/news">
              <button className="btn btn-outline text-[#faed26] hover:text-[#121111] hover:bg-[#faed26]">
                Check News
              </button>
            </Link>
          </div>
        </div>
        <div className="p-4">
          <img
            src={`${heroImg}`}
            alt="bitcoin image"
            className="h-[18rem] w-full"
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
