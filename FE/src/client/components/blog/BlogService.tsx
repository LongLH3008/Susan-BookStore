import React from "react";

const BlogService = () => {
  return (
    <>
      <div className="search">
        <h3 className="font-semibold text-xl">Search</h3>
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
    </>
  );
};

export default BlogService;
