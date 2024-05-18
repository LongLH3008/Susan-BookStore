import React from "react";
import Pagination from "./pagination";

const Nav = ({
  viewMode,
  handleViewChange,
  itemsToShow,
  handleItemsToShowChange,
  sortBy,
  handleSortByChange,
  totalItems,
  currentPage,
  onPageChange,
}: any) => {
  return (
    <div className="border-t border-b border-gray-100 py-2 my-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="grid-icons flex">
            <button onClick={() => handleViewChange(" md:w-1/3 sm:w-1/2")}>
              <svg
                width={20}
                height={46}
                viewBox="0 0 20 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  y="0.000305176"
                  width={20}
                  height={46}
                  fill="url(#pattern0_3_1843)"
                />
                <defs>
                  <pattern
                    id="pattern0_3_1843"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                  >
                    <use
                      xlinkHref="#image0_3_1843"
                      transform="matrix(0.05 0 0 0.0217391 0.1 0.326087)"
                    />
                  </pattern>
                  <image
                    id="image0_3_1843"
                    width={16}
                    height={16}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJGVYSWZJSSoACAAAAAEAPAECAAkAAAAaAAAAAAAAAGltYWdlcnk0AAAnPYy6AAAAFVBMVEVHcEwpKSkpKSkpKSkpKSkpKSkpKSk9ESprAAAABnRSTlMA50jJ5D+4+NqWAAAAHElEQVQI12MINmWAILFEKHJLgSJFISjCBDTTBQDU5BC9nBxXMAAAAABJRU5ErkJggg=="
                  />
                </defs>
              </svg>
            </button>
            <button onClick={() => handleViewChange("md:w-1/4 sm:w-1/2 ")}>
              <svg
                width={35}
                height={46}
                viewBox="0 0 35 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  y="0.000305176"
                  width={35}
                  height={46}
                  fill="url(#pattern0_3_1844)"
                />
                <defs>
                  <pattern
                    id="pattern0_3_1844"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                  >
                    <use
                      xlinkHref="#image0_3_1844"
                      transform="matrix(0.0285714 0 0 0.0217391 0.185714 0.326087)"
                    />
                  </pattern>
                  <image
                    id="image0_3_1844"
                    width={22}
                    height={16}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQBAMAAADgw5IVAAAAJGVYSWZJSSoACAAAAAEAPAECAAkAAAAaAAAAAAAAAGltYWdlcnk0AAAnPYy6AAAAFVBMVEVHcEzi4uLi4uLi4uLi4uLi4uLi4uKOLV3XAAAABnRSTlMA50jJ5D+4+NqWAAAAHElEQVQI12MINmWAI7FEBHJLQSBFIQTCBQbIHACXMBZRIn3+XAAAAABJRU5ErkJggg=="
                  />
                </defs>
              </svg>
            </button>
            <button onClick={() => handleViewChange("md:w-1/2 sm:w-1/2 ")}>
              <svg
                width={26}
                height={46}
                viewBox="0 0 26 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  y="0.000305176"
                  width={26}
                  height={46}
                  fill="url(#pattern0_3_1845)"
                />
                <defs>
                  <pattern
                    id="pattern0_3_1845"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                  >
                    <use
                      xlinkHref="#image0_3_1845"
                      transform="matrix(0.0384615 0 0 0.0217391 0.115385 0.347826)"
                    />
                  </pattern>
                  <image
                    id="image0_3_1845"
                    width={20}
                    height={14}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOAQMAAAAVCq6zAAAAJGVYSWZJSSoACAAAAAEAPAECAAkAAAAaAAAAAAAAAGltYWdlcnk0AAAnPYy6AAAABlBMVEVHcEzi4uIXAJKlAAAAAXRSTlMAQObYZgAAABJJREFUCNdj+P//AwMIowMC4gDs0RGVPgyFOgAAAABJRU5ErkJggg=="
                  />
                </defs>
              </svg>
            </button>
          </div>
          <div className="text-[#707070]">
            Showing {(currentPage - 1) * itemsToShow + 1} -{" "}
            {Math.min(currentPage * itemsToShow, totalItems)} of {totalItems}{" "}
            results
          </div>
        </div>
        <div className="flex items-center text-[#707070]">
          <div className="single-select-block">
            <span className="select-title">Show:</span>
            <select
              className="border-none"
              value={itemsToShow}
              onChange={handleItemsToShowChange}
            >
              {Array.from({ length: 18 }, (_, i) => i + 3).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="short-list ml-2">
            <label className="select-title" htmlFor="SortBy">
              Sort by
            </label>
            <select
              className="pr-0 border-none"
              name="SortBy"
              id="SortBy"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="manual">Featured</option>
              <option value="best-selling">Best Selling</option>
              <option value="title-ascending">Alphabetically, A-Z</option>
              <option value="title-descending">Alphabetically, Z-A</option>
              <option value="price-ascending">Price, low to high</option>
              <option value="price-descending">Price, high to low</option>
              <option value="created-descending">Date, new to old</option>
              <option value="created-ascending">Date, old to new</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
