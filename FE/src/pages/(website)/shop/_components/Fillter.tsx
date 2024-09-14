import useCategory from "@/common/hooks/useCategories";
import { ICategory } from "@/common/interfaces/category";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

type Props = {};

const Left = (props: Props) => {
  const [openItem, setOpenItem] = useState<number[]>([]);
  const { CategoryQuery, setLimit } = useCategory();
  // console.log(CategoryQuery);

  console.log(CategoryQuery);
  useEffect(() => {
    setLimit(9);
  }, []);
  const [filterValues, setFilterValues] = useState({
    price: { gte: 0, lte: 110 },
    availability: [],
    productType: [],
    brand: [],
    color: [],
    material: [],
    size: [],
  });

  const toggleItem = (index: number) => {
    setOpenItem((prevItems) =>
      prevItems.includes(index)
        ? prevItems.filter((item) => item !== index)
        : [...prevItems, index]
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setFilterValues((prev) => {
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

  console.log(filterValues);

  const handleToggle = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    toggleItem(index);
  };
  const sidebarItems = [
    {
      id: 2,
      title: "Availability",
      open: openItem.includes(2),
      items: [
        {
          type: "checkbox",
          name: "availability",
          value: 1,
          label: "In stock",
          count: 34,
        },
        {
          type: "checkbox",
          name: "availability",
          value: 0,
          label: "Out of stock",
          count: 18,
        },
      ],
    },
    {
      id: 3,
      title: "Product type",
      open: openItem.includes(3),
      items: CategoryQuery?.data?.metadata?.map((item: ICategory) => ({
        type: "checkbox",
        name: "productType",
        value: item.category_name,
        label: item.category_name,
        count: 3,
      })),
    },
    {
      id: 4,
      title: "Brand",
      open: openItem.includes(4),
      items: [...Array(12)].map((_, index) => ({
        type: "checkbox",
        name: "brand",
        value: `Vendor ${index + 1}`,
        label: `Vendor ${index + 1}`,
        count: 3,
      })),
    },
    {
      id: 5,
      title: "Color",
      open: openItem.includes(5),
      items: [
        "black",
        "blue",
        "gold",
        "gray",
        "green",
        "magenta",
        "maroon",
        "navy",
        "orange",
        "pink",
        "purple",
        "red",
        "violet",
        "white",
        "yellow",
      ].map((color, index) => ({
        type: "checkbox",
        name: "brand",
        value: color,
        label: color,
        count: 6,
      })),
    },
    {
      id: 6,
      title: "Material",
      open: openItem.includes(6),
      items: ["fiber", "leather", "metal", "resin", "slag"].map(
        (material, index) => ({
          type: "checkbox",
          name: "material",
          value: material,
          label: material,
          count: 3,
        })
      ),
    },
    {
      id: 7,
      title: "Size",
      open: openItem.includes(7),
      items: ["s", "m", "l", "xl", "xxl"].map((size, index) => ({
        type: "checkbox",
        name: "size",
        value: size,
        label: size,
        count: 13 - index,
      })),
    },
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
              <h5 className="title widget-collapse-show">Price</h5>
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
                      ? `Price: $${filterValues?.price?.gte} - $${filterValues?.price?.lte}`
                      : "selected"}
                  </span>
                  <button className="underline hover:text-[#00BFC5]">
                    Reset
                  </button>
                </div>
                <div className="checkbox-container categories-list sidebar-price-filter flex">
                  <div className="filter-range-from flex  items-center pr-2 *:me-1 ">
                    <span className="text-[#838383]">$</span>
                    <input
                      className="w-14 placeholder-gray-300 "
                      name="price.gte"
                      id="Filter-price-1"
                      type="number"
                      placeholder="0"
                      min={0}
                      max={110.0}
                      value={filterValues.price.gte}
                      onChange={handleChange}
                    />
                    <label className="text-[#838383]" htmlFor="Filter-price-1">
                      From
                    </label>
                  </div>
                  <div className="filter-price-range-to flex  items-center *:me-1 ">
                    <span className="text-[#838383]">$</span>
                    <input
                      className="w-[70px] placeholder-gray-300 "
                      name="price.lte"
                      id="Filter-price-1"
                      type="number"
                      placeholder="110.0"
                      min={0}
                      max={110.0}
                      value={filterValues.price.lte}
                      onChange={handleChange}
                    />
                    <label className="text-[#838383]" htmlFor="Filter-price-1">
                      To
                    </label>
                  </div>
                </div>
                <button className="mt-10 bg-black text-white px-5 py-2">
                  Filter
                </button>
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
                <div className="sidebar-body widget-collapse-hide">
                  <div className="filter-value-counter flex justify-between items-center">
                    <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                      selected
                    </span>
                    <button className="underline hover:text-[#00BFC5]">
                      Reset
                    </button>
                  </div>
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
