import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import {
  SlideImgaeBookNext,
  SlideImgaeBookPrev,
} from "./SlideImageBookButtons";

interface Image {
  id: string;
  url: string;
  _id: string;
}
interface imageProb {
  coverImage: string | undefined;
  Image: Array<Image>;
}
const BookImage = ({ coverImage, Image }: imageProb) => {
  const [mainImage, setMainImage] = useState(coverImage);

  const handleImageClick = (src: string) => {
    setMainImage(src);
  };

  return (
    <>
      <div className="">
        <div className="w-full border border-gray-200">
          <img
            src={mainImage || coverImage}
            alt="Main"
            className="m-auto object-cover h-[70vh]"
          />
        </div>
        <div
          // className={`${
          //   Image.length == 0 ? "hidden" : ""
          // } my-5 lg:w-full sm:w-[200px]`}
          className="my-5 lg:w-full sm:w-[200px]"
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper sliderbanner relative "
          >
            {Image?.map((image: Image) => (
              <SwiperSlide key={image?._id}>
                <div
                  className="border border-gray-200 cursor-pointer"
                  onClick={() => handleImageClick(image?.url)}
                >
                  <img
                    src={image?.url}
                    alt=""
                    className="h-24 object-cover m-auto"
                  />
                </div>
              </SwiperSlide>
            ))}

            <SlideImgaeBookNext />
            <SlideImgaeBookPrev />
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default BookImage;
