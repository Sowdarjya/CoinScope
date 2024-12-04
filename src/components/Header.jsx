import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="navbar bg-[#faed26] relative">
      <div className="navbar-start text-3xl text-[#121111] font-bold w-full flex items-center justify-between px-4 py-3">
        <Link to="/" className="z-50">
          CoinScope
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <IoClose className="text-2xl text-[#121111]" />
          ) : (
            <GiHamburgerMenu className="text-2xl text-[#121111]" />
          )}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block navbar-end">
        <ul className="flex items-center justify-between px-4">
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

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#faed26] z-40 md:hidden flex items-center justify-center">
          <nav className="w-full">
            <ul className="space-y-6 text-center flex flex-col items-center">
              {navItems.map((item) => (
                <li key={item.id} className="w-full flex justify-center">
                  <NavLink
                    to={item.slug}
                    onClick={() => setIsMenuOpen(false)}
                    className={(e) => {
                      return e.isActive
                        ? "bg-[#121111] text-[#faed26] text-2xl font-bold px-4 py-2 rounded-xl"
                        : "text-[#121111] text-2xl hover:text-[#525252] font-medium";
                    }}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
