import React, { useState } from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: any) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumbersToShow = 5;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
    const startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow);
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      pageNumbers.unshift("...");
      pageNumbers.unshift(1);
    }

    if (endPage < totalPages) {
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-between items-center border-t border-b border-gray-300 mt-10 py-2 text-[#707070]">
      <div className="flex-grow">
        Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
        results
      </div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 hover:text-[#00BFC5] ${
                currentPage === 1 ? "disabled" : ""
              }`}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          {pageNumbers.map((pageNumber, index) => (
            <li key={index}>
              {pageNumber === "..." ? (
                <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(pageNumber)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight ${
                    currentPage === pageNumber
                      ? "text-[#00BFC5]"
                      : "text-gray-500 hover:text-[#00BFC5]"
                  }`}
                >
                  {pageNumber}
                </button>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 hover:text-[#00BFC5] ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
