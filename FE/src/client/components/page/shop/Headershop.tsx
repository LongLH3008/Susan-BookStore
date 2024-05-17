import React from "react";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="grid-icons flex">
            <button className="active three-column">
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
            <button className="four-column hidden lg:block">
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
            <button className="list-view">
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
          <div className="text-[#707070]">Showing 1 - 4 of 37 result</div>
        </div>
        <div className="flex items-center *:text-[#707070] ">
          <div className="single-select-block">
            <span className="select-title ">Show:</span>
            <select className=" border-none">
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="short-list ml-2">
            <label className="select-title" htmlFor="SortBy">
              Sort by
            </label>
            <select className="pr-0 border-none" name="SortBy" id="SortBy">
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
