import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const navItems = [
    {
      id: 1,
      name: "Home",
      slug: "/",
    },
    {
      id: 2,
      name: "Cryptocurrencies",
      slug: "/cryptocurrencies",
    },
    {
      id: 3,
      name: "News",
      slug: "/news",
    },
  ];

  return (
    <header className="navbar bg-[#faed26]">
      <div className="navbar-start text-3xl text-[#121111] font-bold">
        <Link to="/">CoinScope</Link>
      </div>
      <nav className="navbar-end">
        <ul className="flex items-center justify-between">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                className={(e) => {
                  return e.isActive
                    ? "text-[#faed26] mx-3 bg-[#121111] p-2 rounded-xl text-lg font-medium"
                    : "text-[#121111] mx-3 text-lg hover:text-[#525252] font-medium";
                }}
                to={`${item.slug}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
