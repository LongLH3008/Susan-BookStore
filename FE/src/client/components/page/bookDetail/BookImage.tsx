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

const BookImage = () => {
  const [mainImage, setMainImage] = useState(
    "https://susan-demo.myshopify.com/cdn/shop/products/7_0703c71f-03e5-4502-b7cc-ce60c55e74de_600x800.jpg?v=1569231186"
  );

  const handleImageClick = (src: any) => {
    setMainImage(src);
  };

  return (
    <>
      <div className="">
        <div className="w-full border border-gray-200">
          <img src={mainImage} alt="" />
        </div>
        <div className="my-5">
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
            className="mySwiper sliderbanner relative"
          >
            <SwiperSlide>
              <div
                className="border border-gray-200"
                onClick={() =>
                  handleImageClick(
                    "https://susan-demo.myshopify.com/cdn/shop/products/11_600x800.jpg?v=1569231186"
                  )
                }
              >
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/11_600x800.jpg?v=1569231186"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="border border-gray-200"
                onClick={() =>
                  handleImageClick(
                    "https://susan-demo.myshopify.com/cdn/shop/products/7_0703c71f-03e5-4502-b7cc-ce60c55e74de_600x800.jpg?v=1569231186"
                  )
                }
              >
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/7_0703c71f-03e5-4502-b7cc-ce60c55e74de_600x800.jpg?v=1569231186"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="border border-gray-200"
                onClick={() =>
                  handleImageClick(
                    "https://susan-demo.myshopify.com/cdn/shop/products/8_4953a517-3945-478c-9e98-925e2b1000c0_600x800.jpg?v=1569231186"
                  )
                }
              >
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/8_4953a517-3945-478c-9e98-925e2b1000c0_600x800.jpg?v=1569231186"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="border border-gray-200"
                onClick={() =>
                  handleImageClick(
                    "https://susan-demo.myshopify.com/cdn/shop/products/9_87e6deda-26c2-4645-90b2-efc6d0fb17d4_600x800.jpg?v=1569231186"
                  )
                }
              >
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/9_87e6deda-26c2-4645-90b2-efc6d0fb17d4_600x800.jpg?v=1569231186"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="border border-gray-200"
                onClick={() =>
                  handleImageClick(
                    "https://susan-demo.myshopify.com/cdn/shop/products/10_913061f8-a25d-4ca1-9878-5ef8fd61bc6e_600x800.jpg?v=1569231186"
                  )
                }
              >
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/10_913061f8-a25d-4ca1-9878-5ef8fd61bc6e_600x800.jpg?v=1569231186"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="border border-gray-200"
                onClick={() =>
                  handleImageClick(
                    "https://susan-demo.myshopify.com/cdn/shop/products/4_b155f66b-76de-44a2-a3e9-ca89308d9bc3_600x800.jpg?v=1569231152"
                  )
                }
              >
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/4_b155f66b-76de-44a2-a3e9-ca89308d9bc3_600x800.jpg?v=1569231152"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SlideImgaeBookNext />
            <SlideImgaeBookPrev />
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default BookImage;
