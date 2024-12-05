import React, { useState } from "react";

const Pagination = ({ elementsPerPage, totalElements, paginate }) => {
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(totalElements / elementsPerPage);

  const handlePageClick = (page) => {
    setActivePage(page);
    paginate(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (activePage > 3) pages.push("...");
      const start = Math.max(2, activePage - 1);
      const end = Math.min(totalPages - 1, activePage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (activePage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center mb-4">
      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-1 mx-1 ${
              activePage === page
                ? "bg-[#faed26] text-[#121111]"
                : "bg-base-100"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="mx-2">
            {page}
          </span>
        )
      )}
    </div>
  );
};

export default Pagination;
