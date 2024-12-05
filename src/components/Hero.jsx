import React from "react";
import heroImg from "../assets/increase.png";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

const Hero = () => {
  return (
    <main className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-around w-full min-h-[80vh] px-4 py-8 md:px-8 lg:px-16">
      <div className="w-full md:w-[60%] text-center flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-semibold text-[#faed26] leading-tight">
          All Your Coins <br /> One Tracker
        </h1>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="btn btn-outline hover:bg-[#faed26] text-[#faed26] hover:text-[#121111] w-full sm:w-auto">
            <Link to="/cryptocurrencies">Check Dashboard</Link>
          </button>
          <button className="btn btn-outline hover:bg-[#faed26] text-[#faed26] hover:text-[#121111] w-full sm:w-auto">
            <Link to="/news">Check News</Link>
          </button>
        </div>
        <div className="w-full">
          <Carousel />
        </div>
      </div>
      <div className="w-full md:w-[40%] flex items-center justify-center md:justify-start mb-8 md:mb-0">
        <img
          src={heroImg}
          alt="Cryptocurrency Tracking"
          className="h-48 sm:h-64 md:h-[17rem] max-w-full object-contain"
        />
      </div>
    </main>
  );
};

export default Hero;
