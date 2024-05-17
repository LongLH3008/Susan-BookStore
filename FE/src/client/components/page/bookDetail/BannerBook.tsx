import React from "react";
import { Link } from "react-router-dom";

const BannerBook = () => {
  return (
    <>
      <div
        className={`min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] w-full bg-banner-blog bg-cover bg-center  mb-11 py-24 *:text-[#333333]`}
      >
        <div className="">
          <h1 className="text-center text-[43px] font-semibold">
            4. Soldout product
          </h1>
          <div className=" flex justify-center items-center *:px-2 mt-4">
            <Link className="hover:text-[#00BFC5]" to="/">
              Home
            </Link>

            <i className="fa-solid fa-angle-right "></i>
            <p className="text-[#00BFC5]">4. Soldout product</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerBook;
