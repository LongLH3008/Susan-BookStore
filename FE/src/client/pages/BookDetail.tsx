import React from "react";
import BookImage from "../components/BookDetail/BookImage";
import BookText from "../components/BookDetail/BookText";
import BannerBook from "../components/BookDetail/BannerBook";

const BookDetail = () => {
  return (
    <>
      <div className="">
        <BannerBook />
        <div className="grid grid-cols-2 gap-8 min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
          <BookImage />
          <BookText />
        </div>
      </div>
    </>
  );
};

export default BookDetail;
