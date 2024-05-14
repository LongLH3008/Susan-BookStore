import React from "react";
import { Link } from "react-router-dom";

const BlogService = () => {
  return (
    <>
      <div className="grid-cols-1">
        {/* Search */}
        <div className="search pb-10  border-b-2 border-gray-200">
          <h3 className="font-semibold text-xl text-[#292929]">Search</h3>
          <form className="max-w-md mx-auto mt-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 ps-4 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-stone-800 focus:border-y-stone-800 dark:bg-gray-700 dark:border-gray-800 dark:placeholder-gray-800 dark:text-white dark:focus:ring-stone-800 dark:focus:border-stone-800"
                placeholder="Search out store"
                required
              />
              <button
                type="submit"
                className="text-gray-950  absolute end-2.5 bottom-2.5  focus:ring-4 focus:outline-none  font-medium  text-sm   px-2"
              >
                <svg
                  className="w-4 h-4 text-slate-950 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        {/* End Search */}
        {/* Custom Menu */}
        <div className="customMenu py-10 border-b-2 border-gray-200">
          <h3 className="text-xl font-semibold mb-5 text-[#292929]">
            Custom Menu
          </h3>
          <ul className="*:my-4 *:text-[#707070]">
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                Our Office
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                Delivery
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                Our Store
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                Guarantee
              </Link>
            </li>{" "}
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                Buy Gift
              </Link>
            </li>
          </ul>
        </div>
        {/* End Custom Menu */}
        {/* Recent Post */}
        <div className="recentPost py-10 border-b-2 border-gray-200">
          <h3 className="text-xl font-semibold text-[#292929]">Recent Post</h3>
          <div className="*:py-5">
            <div className="flex">
              <img
                className="w-1/3 pr-2"
                src="https://susan-demo.myshopify.com/cdn/shop/articles/reading-books-might-help-you-live-longer-according-to-new-research-1_medium.jpg?v=1567855567"
                alt=""
              />
              <div className="">
                <h4 className="font-semibold max-w-[170px] overflow-hidden truncate text-[13px] text-[#292929]">
                  Testing has a signficant info number of benefits
                </h4>
                <p className="text-[#707070] text-xs ">Jan 25, 2022</p>
              </div>
            </div>
          </div>
        </div>
        {/* End Recent Post */}
        {/* Archive */}
        <div className="Archive py-10 border-b-2 border-gray-200">
          <h3 className="text-xl font-semibold text-[#292929] mb-5">Archive</h3>
          <ul className="*:text-[#707070] *:my-2">
            <li className="font-bold">January 2022</li>
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                Testing has a signficant info number of benefits
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                International activities of the Frankfurt Book
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                Reading has a signficant info number of benefits
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#00BFC5]" to="/">
                The London Book Fair is to be packed with exciting
              </Link>
            </li>
          </ul>
        </div>
        {/* End Archive */}
        {/* Tags */}
        <div className="tags py-10">
          <h3 className="text-xl font-semibold text-[#292929] mb-5">Tags</h3>
          <div className="flex flex-wrap">
            <Link
              to="/"
              className="text-gray-900 hover:text-white border border-gray-200 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Book
            </Link>
            <Link
              to="/"
              className="text-gray-900 hover:text-white border border-gray-200 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Library
            </Link>
            <Link
              to="/"
              className="text-gray-900 hover:text-white border border-gray-200 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Notebook
            </Link>
            <Link
              to="/"
              className="text-gray-900 hover:text-white border border-gray-200 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Pen
            </Link>
          </div>
        </div>
        {/* End Tags */}
      </div>
    </>
  );
};

export default BlogService;
