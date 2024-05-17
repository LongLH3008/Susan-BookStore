import React from "react";
import BannerBook from "../components/page/bookDetail/BannerBook";
import BookImage from "../components/page/bookDetail/BookImage";
import BookText from "../components/page/bookDetail/BookText";

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
