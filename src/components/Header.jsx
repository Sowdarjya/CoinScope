import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar bg-[#0A0A0A]">
      <div className="navbar-start text-2xl">CoinScope</div>
      <nav className="navbar-end">
        <ul className="flex items-center justify-between">
          <li>
            <NavLink to="/" className="p-2 text-xl mx-4">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/cryptos" className="p-2 text-xl mx-4">
              Cryptos
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" className="p-2 text-xl mx-4">
              News
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
