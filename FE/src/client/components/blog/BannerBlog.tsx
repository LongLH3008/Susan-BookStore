import * as img from "@/assets/img";
import React from "react";
import { Link } from "react-router-dom";

const BannerBlog = () => {
  return (
    <>
      <div
        className={`min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] w-full bg-banner-blog bg-cover bg-center  mb-11 py-24 *:text-[#333333]`}
      >
        <div className="">
          {/* <img src="../src/assets/img/headerBlog.webp" alt="" /> */}
          <h1 className="text-center text-[43px] font-semibold">News</h1>
          <div className=" flex justify-center items-center *:px-2 mt-4">
            <Link to="/">Home</Link>
            <i className="fa-solid fa-angle-right "></i>
            <p className="text-[#00BFC5]">New</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerBlog;
