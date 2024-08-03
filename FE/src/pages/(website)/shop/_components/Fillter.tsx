import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

type Props = {};

const Left = (props: Props) => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index: any) => {
    setOpenItem(openItem === index ? null : index);
  };

  const handleToggle = (
    index: any,
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
                {openItem === 1 ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem === 1 && (
              <div className="sidebar-body">
                <div className="filter-value-counter">
                  <span className="filter-value-selected border border-dashed border-gray-500 rounded-full px-2 inline-block my-3">
                    selected
                  </span>
                </div>
                <div className="checkbox-container categories-list sidebar-price-filter flex">
                  <div className="filter-range-from flex flex-col items-start  pr-3">
                    <span>$</span>
                    <input
                      name="filter.v.price.gte"
                      id="Filter-price-1"
                      type="number"
                      min={0}
                      max={110.0}
                    />
                    <label htmlFor="Filter-price-1">From</label>
                  </div>
                  <div className="filter-price-range-to flex flex-col items-start">
                    <span>$</span>
                    <input
                      name="filter.v.price.lte"
                      id="Filter-price-1"
                      type="number"
                      min={0}
                      max={110.0}
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
                {openItem === 2 ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem === 2 && (
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
                        name="filter.v.availability"
                        id="Filter-availability-1"
                        className="custom-control-input"
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
                        name="filter.v.availability"
                        defaultValue={0}
                        className="custom-control-input"
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
                {openItem === 3 ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem === 3 && (
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
                {openItem === 4 ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem === 4 && (
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
                {openItem === 5 ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem === 5 && (
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
                          name="filter.v.option.color"
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
                {openItem === 6 ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem === 6 && (
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
                            name="filter.v.option.material"
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
                {openItem === 7 ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            {openItem === 7 && (
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
                          name="filter.v.option.size"
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
