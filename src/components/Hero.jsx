import React from "react";
import heroImg from "../assets/increase.png";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

const Hero = () => {
  return (
    <>
      <main className="flex items-center justify-around w-full h-screen">
        <div className="w-[60%] text-center  flex flex-col items-center justify-center">
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
          <Carousel />
        </div>
        <div className="w-[40%]  flex items-center justify-start">
          <img src={`${heroImg}`} className="h-[20rem]" />
        </div>
      </main>
    </>
  );
};

export default Hero;
