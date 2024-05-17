import React from "react";

type Props = {};

const Pagination = (props: Props) => {
  return (
    <>
      <div className="flex justify-between items-center border-t border-b border-gray-300 mt-10 py-2 *:text-[#707070] ">
        <div className="flex-grow">Showing 1 - 4 of 37 result</div>
        <nav aria-label="Page navigation example ">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 hover:text-[#00BFC5]  "
              >
                Prev
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 hover:text-[#00BFC5] "
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 hover:text-[#00BFC5]  "
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 hover:text-[#00BFC5]"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 hover:text-[#00BFC5]"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 hover:text-[#00BFC5]"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 hover:text-[#00BFC5]"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
