import useCategory from "@/common/hooks/useCategories";
import useMegaMenu from "@/common/hooks/useMegaMenu";
import useProduct from "@/common/hooks/useProduct";
import { ICategory } from "@/common/interfaces/category";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

interface FilterProb {
  price: { gte: number; lte: number };
  availability: string[];
  productType: string[];
  author: string[];
}
interface Prob {
  handleFilterProduct: any;
  filterValues: FilterProb;
}
const Left = ({ filterValues, handleFilterProduct }: Prob) => {
  const [openItem, setOpenItem] = useState<number[]>([]);
  const { CategoryQuery, setLimit } = useCategory();

  const { author } = useMegaMenu();
  useEffect(() => {
    setLimit(10);
  }, []);

  //logic filter

  const toggleItem = (index: number) => {
    setOpenItem((prevItems) =>
      prevItems.includes(index)
        ? prevItems.filter((item) => item !== index)
        : [...prevItems, index]
    );
  };
  //lấy data filter

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    handleFilterProduct((prev: any) => {
      if (type === "checkbox") {
        const values = prev[name as keyof typeof prev] as string[];
        return {
          ...prev,
          [name]: checked
            ? [...values, value]
            : values.filter((v) => v !== value),
        };
      } else {
        const [key, subKey] = name.split(".");
        return {
          ...prev,
          [key]: { ...prev[key as keyof typeof prev], [subKey]: Number(value) },
        };
      }
    });
  };

  const handleToggle = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    toggleItem(index);
  };

  //data filter
  const sidebarItems = [
    // {
    //   id: 2,
    //   title: "Trạng thái",
    //   open: openItem.includes(2),
    //   items: [
    //     {
    //       type: "checkbox",
    //       name: "availability",
    //       value: 1,
    //       label: "Còn hàng",
    //       count: 34,
    //     },
    //     {
    //       type: "checkbox",
    //       name: "availability",
    //       value: 0,
    //       label: "Hết hàng",
    //       count: 18,
    //     },
    //   ],
    // },
    {
      id: 3,
      title: "Loại sách",
      open: openItem.includes(3),
      items: CategoryQuery?.data?.metadata?.map((item: ICategory) => ({
        type: "checkbox",
        name: "productType",
        value: item.id,
        label: item.category_name,
        count: 3,
      })),
    },
    // {
    //   id: 4,
    //   title: "Tác giả",
    //   open: openItem.includes(4),
    //   items: author.map((au) => ({
    //     type: "checkbox",
    //     name: "author",
    //     value: au,
    //     label: au,
    //     count: 3,
    //   })),
    // },
  ];

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
          {sidebarItems.map((item) => (
            <div className="blog-sidebar" key={item.id}>
              <div className="flex justify-between items-center">
                <h5 className="title widget-collapse-show">{item.title}</h5>
                <button onClick={(event) => handleToggle(item.id, event)}>
                  {item.open ? (
                    <MdKeyboardArrowDown className="w-5 h-5" />
                  ) : (
                    <MdKeyboardArrowRight className="w-5 h-5" />
                  )}
                </button>
              </div>
              {item.open && (
                <div className="sidebar-body widget-collapse-hide mt-3">
                  {/* <div className="filter-value-counter flex justify-between items-center">
                    <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                      Đã chọn
                    </span>
                    <button className="underline hover:text-[#00BFC5]">
                      Làm mới
                    </button>
                  </div> */}
                  <ul className="checkbox-container categories-list">
                    {item.items.map((subItem: any, index: any) => (
                      <li key={index}>
                        <div className="custom-control custom-checkbox hover:text-[#00BFC5]">
                          <input
                            type={subItem.type}
                            name={subItem.name}
                            defaultValue={subItem.value}
                            id={`Filter-${item.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}-${index + 1}`}
                            className="custom-control-input"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={`Filter-${item.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}-${index + 1}`}
                            className="custom-control-label px-2"
                          >
                            {subItem.label}{" "}
                            <span className="count_value float-end">
                              ({subItem.count})
                            </span>
                          </label>
                          <span className="checkmark" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default Left;
