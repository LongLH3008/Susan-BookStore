import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

type Props = {};

const Left = (props: Props) => {
  const [openItem, setOpenItem] = useState<number[]>([]);
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

  // console.log(filterValues);

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
                <div className="filter-value-counter">
                  <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                    selected
                  </span>
                </div>
                <div className="checkbox-container categories-list sidebar-price-filter flex">
                  <div className="filter-range-from flex  items-center pr-3 *:me-1">
                    <span>$</span>
                    <input
                      className="w-20"
                      name="price.gte"
                      id="Filter-price-1"
                      type="number"
                      placeholder="0"
                      min={0}
                      max={110.0}
                      value={filterValues.price.gte}
                      onChange={handleChange}
                    />
                    <label htmlFor="Filter-price-1">From</label>
                  </div>
                  <div className="filter-price-range-to flex  items-center *:me-1">
                    <span>$</span>
                    <input
                      className="w-20"
                      name="price.lte"
                      id="Filter-price-1"
                      type="number"
                      placeholder="110.0"
                      min={0}
                      max={110.0}
                      value={filterValues.price.lte}
                      onChange={handleChange}
                    />
                    <label htmlFor="Filter-price-1">To</label>
                  </div>
                </div>
                <button className="mt-10 bg-black text-white px-5 py-2">
                  Filter
                </button>
              </div>
            )}
          </div>
          <div className="blog-sidebar">
            <div className="flex justify-between items-center">
              <h5 className="title widget-collapse-show">Availability</h5>
              <button onClick={(event) => handleToggle(2, event)}>
                {openItem.includes(2) ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem.includes(2) && (
              <div className="sidebar-body widget-collapse-hide  ">
                <div className="filter-value-counter">
                  <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                    0 selected
                  </span>
                </div>
                <ul className="checkbox-container categories-list ">
                  <li>
                    <div className="custom-control custom-checkbox hover:text-[#00BFC5] ">
                      <input
                        type="checkbox"
                        name="availability"
                        defaultValue={1}
                        id="Filter-availability-1"
                        className="custom-control-input"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="Filter-availability-1"
                        className="custom-control-label px-2"
                      >
                        In stock{" "}
                        <span className="count_value float-end">(34)</span>
                      </label>
                      <span className="checkmark" />
                    </div>
                  </li>
                  <li>
                    <div className="custom-control custom-checkbox hover:text-[#00BFC5]">
                      <input
                        type="checkbox"
                        name="availability"
                        defaultValue={0}
                        className="custom-control-input"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="Filter-availability-2"
                        className="custom-control-label px-2"
                      >
                        Out of stock{" "}
                        <span className="count_value float-end">(18)</span>
                      </label>
                      <span className="checkmark" />
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="blog-sidebar">
            <div className="flex justify-between items-center">
              <h5 className="title widget-collapse-show">Product type</h5>
              <button onClick={(event) => handleToggle(3, event)}>
                {openItem.includes(3) ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem.includes(3) && (
              <div className="sidebar-body widget-collapse-hide ">
                <div className="filter-value-counter">
                  <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                    0 selected
                  </span>
                </div>
                <ul className="checkbox-container categories-list">
                  {[...Array(12)].map((_, index) => (
                    <li key={index}>
                      <div className="custom-control custom-checkbox hover:text-[#00BFC5]">
                        <input
                          type="checkbox"
                          name="filter.p.product_type"
                          defaultValue={`Type ${index + 1}`}
                          id={`Filter-product-type-${index + 1}`}
                          className="custom-control-input"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor={`Filter-product-type-${index + 1}`}
                          className="custom-control-label px-2"
                        >
                          {`Type ${index + 1}`}{" "}
                          <span className="count_value float-end">(3)</span>
                        </label>
                        <span className="checkmark" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="blog-sidebar">
            <div className="flex justify-between items-center">
              <h5 className="title widget-collapse-show">Brand</h5>
              <button onClick={(event) => handleToggle(4, event)}>
                {openItem.includes(4) ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem.includes(4) && (
              <div className="sidebar-body widget-collapse-hide ">
                <div className="filter-value-counter">
                  <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                    0 selected
                  </span>
                </div>
                <ul className="checkbox-container categories-list">
                  {[...Array(12)].map((_, index) => (
                    <li key={index}>
                      <div className="custom-control custom-checkbox hover:text-[#00BFC5]">
                        <input
                          type="checkbox"
                          name="filter.p.vendor"
                          defaultValue={`Vendor ${index + 1}`}
                          id={`Filter-brand-${index + 1}`}
                          className="custom-control-input"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor={`Filter-brand-${index + 1}`}
                          className="custom-control-label px-2"
                        >
                          {`Vendor ${index + 1}`}{" "}
                          <span className="count_value float-end">(3)</span>
                        </label>
                        <span className="checkmark" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="blog-sidebar">
            <div className="flex justify-between items-center">
              <h5 className="title widget-collapse-show">Color</h5>
              <button onClick={(event) => handleToggle(5, event)}>
                {openItem.includes(5) ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem.includes(5) && (
              <div className="sidebar-body widget-collapse-hide">
                <div className="filter-value-counter">
                  <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                    0 selected
                  </span>
                </div>
                <ul className="checkbox-container categories-list">
                  {[
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
                  ].map((color, index) => (
                    <li key={index}>
                      <div className="custom-control custom-checkbox hover:text-[#00BFC5]">
                        <input
                          type="checkbox"
                          name="option.color"
                          defaultValue={color}
                          id={`Filter-color-${index + 1}`}
                          className="custom-control-input"
                        />
                        <label
                          htmlFor={`Filter-color-${index + 1}`}
                          className="custom-control-label px-2"
                        >
                          {color}{" "}
                          <span className="count_value float-end">(6)</span>
                        </label>
                        <span className="checkmark" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="blog-sidebar">
            <div className="flex justify-between items-center">
              <h5 className="title widget-collapse-show">Material</h5>
              <button onClick={(event) => handleToggle(6, event)}>
                {openItem.includes(6) ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem.includes(6) && (
              <div className="sidebar-body widget-collapse-hide ">
                <div className="filter-value-counter">
                  <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                    0 selected
                  </span>
                </div>
                <ul className="checkbox-container categories-list">
                  {["fiber", "leather", "metal", "resin", "slag"].map(
                    (material, index) => (
                      <li key={index}>
                        <div className="custom-control custom-checkbox hover:text-[#00BFC5]">
                          <input
                            type="checkbox"
                            name="option.material"
                            defaultValue={material}
                            id={`Filter-material-${index + 1}`}
                            className="custom-control-input"
                          />
                          <label
                            htmlFor={`Filter-material-${index + 1}`}
                            className="custom-control-label px-2"
                          >
                            {material}{" "}
                            <span className="count_value float-end">(3)</span>
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
          <div className="blog-sidebar">
            <div className="flex justify-between items-center">
              <h5 className="title widget-collapse-show">Size</h5>
              <button onClick={(event) => handleToggle(7, event)}>
                {openItem.includes(7) ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem.includes(7) && (
              <div className="sidebar-body widget-collapse-hide ">
                <div className="filter-value-counter">
                  <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                    0 selected
                  </span>
                </div>
                <ul className="checkbox-container categories-list">
                  {["s", "m", "l", "xl", "xxl"].map((size, index) => (
                    <li key={index}>
                      <div className="custom-control custom-checkbox hover:text-[#00BFC5]">
                        <input
                          type="checkbox"
                          name="option.size"
                          defaultValue={size}
                          id={`Filter-size-${index + 1}`}
                          className="custom-control-input"
                        />
                        <label
                          htmlFor={`Filter-size-${index + 1}`}
                          className="custom-control-label px-2"
                        >
                          {size}{" "}
                          <span className="count_value float-end">
                            ({13 - index})
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
        </form>
      </div>
    </div>
  );
};

export default Left;
