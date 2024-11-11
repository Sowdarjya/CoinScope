import React, { useState } from "react";

const Pagination = ({ elementsPerPage, totalElements, paginate }) => {
  const pages = [];
  const [activePage, setActivePage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pages.push(i);
  }

  const handlePageClick = (number) => {
    setActivePage(number);
  };

  return (
    <div className="flex items-center justify-center mb-4">
      {pages.map((page) => (
        <button
          onClick={() => {
            handlePageClick(page);
            paginate(page);
          }}
          key={page}
          className={`px-3 py-1 transition-colors duration-300 ${
            activePage === page
              ? "bg-[#faed26] text-[#121111]"
              : "bg-base-100 text-gray-700 hover:bg-[#faed26]"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
