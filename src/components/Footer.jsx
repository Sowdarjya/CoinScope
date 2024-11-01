import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-[#faed26] text-base-content p-3">
      <aside>
        <p className="text-[#121111] font-semibold">
          Copyright © {new Date().getFullYear()} - All right reserved by
          CoinSpace
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
