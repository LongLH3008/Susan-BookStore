import { MdApps, MdMenu, MdViewModule } from "react-icons/md";

const Nav = ({
  viewMode,
  handleViewChange,
  itemsToShow,
  handleItemsToShowChange,
  sortBy,
  handleSortByChange,
  totalItems,
  currentPage,
}: any) => {
  return (
    <div className="border-t border-b border-gray-100 py-2 my-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="grid-icons flex ">
            <button
              className={`${
                viewMode === "md:w-1/3 sm:w-1/2"
                  ? "text-[#000]"
                  : "text-[#c9c6c6]"
              }  text-[22px]`}
              onClick={() => handleViewChange("md:w-1/3 sm:w-1/2")}
            >
              <MdApps />
            </button>
            <button
              className={`${
                viewMode === "md:w-1/4 sm:w-1/2"
                  ? "text-[#000]"
                  : "text-[#c9c6c6]"
              }  text-2xl`}
              onClick={() => handleViewChange("md:w-1/4 sm:w-1/2")}
            >
              <MdViewModule />
            </button>
            <button
              className={`${
                viewMode === "md:w-1/2 sm:w-1/2"
                  ? "text-[#000]"
                  : "text-[#c9c6c6]"
              }  text-2xl`}
              onClick={() => handleViewChange("md:w-1/2 sm:w-1/2")}
            >
              <MdMenu />
            </button>
          </div>
          <div className="text-[#707070] ms-2">
            Hiển thị {(currentPage - 1) * itemsToShow + 1} -{" "}
            {Math.min(currentPage * itemsToShow, totalItems)} của {totalItems}{" "}
            kết quả
          </div>
        </div>
        <div className="flex items-center text-[#707070]">
          <div className="single-select-block">
            <span className="select-title">Hiển thị :</span>
            <select
              className="border-none"
              value={itemsToShow}
              onChange={handleItemsToShowChange}
            >
              {Array.from({ length: 4 }, (_, i) => (i + 1) * 10).map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="short-list ml-2 ">
            <label className="select-title" htmlFor="SortBy">
              Lọc theo
            </label>
            <select
              className="pr-0 border-none w-[180px]"
              name="SortBy"
              id="SortBy"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="manual">Sản Phẩm Nổi bật</option>
              <option value="best-selling">Sản Phẩm Bán chạy</option>
              <option value="title-ascending">Thứ tự A-Z</option>
              <option value="title-descending">Thứ tự Z-A</option>
              <option value="price-ascending">Giá thấp đến cao</option>
              <option value="price-descending">Giá cao đến thấp</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
