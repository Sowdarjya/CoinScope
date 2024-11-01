import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar bg-[#0A0A0A]">
      <div className="navbar-start text-3xl text-[#faed26] font-bold">
        <Link to="/">CoinScope</Link>
      </div>
      <nav className="navbar-end">
        <ul className="flex items-center justify-between">
          <li>
            <NavLink
              to="/"
              className={(e) => {
                return e.isActive
                  ? "text-[#faed26] p-2 text-xl mx-4 hover:text-[#f7f192]"
                  : "p-2 text-xl mx-4 hover:text-[#f7f192]";
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cryptos"
              className={(e) => {
                return e.isActive
                  ? "text-[#faed26] p-2 text-xl mx-4 hover:text-[#f7f192]"
                  : "p-2 text-xl mx-4 hover:text-[#f7f192]";
              }}
            >
              Cryptos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={(e) => {
                return e.isActive
                  ? "text-[#faed26] p-2 text-xl mx-4 hover:text-[#f7f192]"
                  : "p-2 text-xl mx-4 hover:text-[#f7f192]";
              }}
            >
              News
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
