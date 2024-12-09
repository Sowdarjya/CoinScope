import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { CryptoCurrency } from "../context/CryptoCurrencyContext";
import noUserImg from "../assets/noUserImg.webp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(CryptoCurrency);

  const navItems = [
    { id: 1, name: "Home", slug: "/" },
    { id: 2, name: "Cryptocurrencies", slug: "/cryptocurrencies" },
    { id: 3, name: "News", slug: "/news" },
  ];

  return (
    <header className="bg-[#faed26] relative">
      <div className="flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-3xl text-[#121111] font-bold">
          CoinScope
        </Link>

        <div className="flex items-center md:hidden">
          {user ? (
            <Link to="/profile" className="mr-3">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-black">
                <img
                  src={user.photoURL || noUserImg}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-[#faed26] bg-[#121111] font-medium px-4 py-2 rounded-xl"
            >
              Log In
            </Link>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-2 z-50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <IoClose className="text-3xl text-[#121111]" />
            ) : (
              <GiHamburgerMenu className="text-3xl text-[#121111]" />
            )}
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#faed26] bg-[#121111] px-4 py-2 rounded-xl font-medium"
                      : "text-[#121111] hover:text-[#525252] font-medium"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {user ? (
            <Link to="/profile">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-black">
                <img
                  src={user.photoURL || noUserImg}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-[#faed26] bg-[#121111] font-medium px-4 py-2 rounded-xl"
            >
              Log In
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#faed26] z-40 flex items-center justify-center">
          <nav className="w-full">
            <ul className="space-y-6 text-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.slug}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#faed26] bg-[#121111] text-2xl font-bold px-6 py-3 rounded-xl"
                        : "text-[#121111] text-2xl hover:text-[#525252] font-medium"
                    }
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
