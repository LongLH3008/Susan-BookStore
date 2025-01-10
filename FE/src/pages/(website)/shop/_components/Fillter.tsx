import useCategory from "@/common/hooks/useCategories";
import useProduct from "@/common/hooks/useProduct";
import { ICategory } from "@/common/interfaces/category";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

interface FilterProb {
  price: { gte: number; lte: number };
  // availability: string[];
  productType: string[];
  // author: string[];
}

const Left = () => {
  const [filterValues, setFilterValues] = useState<FilterProb>({
    price: { gte: 0, lte: 11000000 },
    productType: [],
  });
  const [openItem, setOpenItem] = useState<number[]>([1, 2]);
  const { setFeature } = useProduct();
  const { CategoryQuery, setLimit } = useCategory();

  const handleFilterProduct = (data: Partial<FilterProb>) => {
    setFilterValues((prev) => ({
      ...prev,
      ...data,
    }));
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFeature(filterValues);
    }, 300);
    return () => clearTimeout(timeout);
  }, [filterValues, setFeature]);
  //logic filter

  const toggleItem = (index: number) => {
    setOpenItem((prevItems) =>
      prevItems.includes(index)
        ? prevItems.filter((item) => item !== index)
        : [...prevItems, index]
    );
  };
  //lấy data filter
  useEffect(() => {
    setLimit(10);
  }, [setLimit]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFilterValues((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name as keyof FilterProb] as string[]), value]
          : (prev[name as keyof FilterProb] as string[]).filter(
              (v) => v !== value
            ),
      }));
    } else {
      const [key, subKey] = name.split(".");
      setFilterValues((prev) => ({
        ...prev,
        [key]: {
          ...(prev[key as keyof FilterProb] as object),
          [subKey]: Number(value),
        },
      }));
    }
  };
  const handleToggle = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    toggleItem(index);
  };

  return (
    <div className="lg:col-span-3 order-last lg:order-first ">
      <div className="sidebar-wrapper shop-sidebar storefront-filter icofont ">
        <form
          className="filter-form  divide-y divide-gray-100 *:pt-6 *:pb-2"
          name="testform"
          id="myform"
        >
          <div className="blog-sidebar">
            <div className="flex justify-between items-center">
              <h5 className="title widget-collapse-show">Giá </h5>
              <button onClick={(event) => handleToggle(1, event)}>
                {openItem.includes(1) ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem.includes(1) && (
              <div className="sidebar-body">
                <div className="filter-value-counter flex justify-between items-center">
                  <span className="filter-value-selected border border-dashed border-gray-500 text-[#838383] rounded-full px-2 inline-block my-3">
                    {filterValues
                      ? `Giá: ${filterValues?.price?.gte}VND - ${filterValues?.price?.lte}VND`
                      : "Đã chọn"}
                  </span>
                  <button className="underline hover:text-[#00BFC5]">
                    Làm mới
                  </button>
                </div>
                <div className="checkbox-container categories-list sidebar-price-filter *:pt-2">
                  <div className="filter-range-from flex justify-between items-center   ">
                    <label className="text-[#838383]" htmlFor="Filter-price-1">
                      Từ :
                    </label>
                    <div className="">
                      <input
                        className="w-36 placeholder-gray-300 "
                        name="price.gte"
                        id="Filter-price-1"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1100000}
                        value={filterValues.price.gte}
                        onChange={handleChange}
                      />
                      <span className="text-[#838383] ms-2">VND</span>
                    </div>
                  </div>
                  <div className="filter-price-range-to flex justify-between items-center  ">
                    <label className="text-[#838383]" htmlFor="Filter-price-1">
                      Đến :
                    </label>
                    <div className="">
                      <input
                        className="w-36 placeholder-gray-300 "
                        name="price.lte"
                        id="Filter-price-1"
                        type="number"
                        placeholder="110.0"
                        min={0}
                        max={110.0}
                        value={filterValues.price.lte}
                        onChange={handleChange}
                      />
                      <span className="text-[#838383] ms-2">VND</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="blog-sidebar">
            <div className="flex justify-between items-center">
              <h5 className="title widget-collapse-show">Loại sách </h5>
              <button onClick={(event) => handleToggle(2, event)}>
                {openItem.includes(2) ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem.includes(2) && (
              <div className="sidebar-body widget-collapse-hide mt-3">
                <ul className="checkbox-container categories-list">
                  {CategoryQuery?.data?.metadata.map(
                    (ca: ICategory, index: number) => (
                      <li key={index}>
                        <div className="custom-control custom-checkbox hover:text-[#00BFC5]">
                          <input
                            type="checkbox"
                            name="productType"
                            defaultValue={ca?.id}
                            id={ca?.id}
                            className="custom-control-input"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={ca?.id}
                            className="custom-control-label px-2"
                          >
                            {ca?.category_name}{" "}
                            {/* <span className="count_value float-end">
                                ({subItem.count})
                              </span> */}
                          </label>
                          <span className="checkmark" />
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Left;
