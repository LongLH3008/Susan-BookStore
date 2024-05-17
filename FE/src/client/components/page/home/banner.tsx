import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Banner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: true,
        // }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="w-full h-[600px] bg-banner-home4 bg-cover">
          <div className="mx-48 my-32 *:text-[#333333] ">
            <h4 className="text-3xl uppercase ">New Arrivals</h4>
            <h2 className="text-[75px] font-bold uppercase my-3 animate-bounce-x ">
              Led Desk Brand
            </h2>
            <p className="w-[650px] ">
              Next generation LED lamp. A multi-function LED lamp that is
              environmentally friendly and soft on the eyes.
            </p>
            <button className="text-2xl font-semibold border-4 border-[#333333] py-5 px-10 rounded-full my-10 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700">
              Shop Now
            </button>
          </div>
        </SwiperSlide>

        <SwiperSlide className="w-full h-[600px] bg-banner-home2 bg-cover">
          <div className="mx-48 my-32 *:text-[#333333]  *:text-center">
            <h4 className="text-3xl uppercase ">New Arrivals</h4>
            <h2 className="text-[75px] font-bold uppercase my-3 animate-bounce-x ">
              Led Desk Brand
            </h2>
            <p className="m-auto w-[650px] ">
              Next generation LED lamp. A multi-function LED lamp that is
              environmentally friendly and soft on the eyes.
            </p>
            <div className="flex justify-center">
              <button className=" text-2xl font-semibold border-4 border-[#333333] py-5 px-10 rounded-full my-10 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700 ">
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full h-[600px] bg-banner-home3 bg-cover">
          <div className="mx-48 my-32 *:text-[#333333]  *:text-end">
            <h4 className="text-3xl uppercase ">New Arrivals</h4>
            <h2 className="text-[75px] font-bold uppercase my-3 animate-bounce-x ">
              Led Desk Brand
            </h2>
            <p className="text-right  ">
              Next generation LED lamp. A multi-function LED lamp that is
              environmentally friendly and soft on the eyes.
            </p>
            <div className="flex justify-end">
              <button className="text-2xl font-semibold border-4 border-[#333333] py-5 px-10 rounded-full my-10 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700">
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="w-full h-[600px] bg-banner-home6 bg-cover">
          <div className="mx-48 my-32 *:text-[#333333]  *:text-end">
            <h4 className="text-3xl uppercase ">New Arrivals</h4>
            <h2 className="text-[75px] font-bold uppercase my-3 animate-bounce-x ">
              Led Desk Brand
            </h2>
            <p className="text-right  ">
              Next generation LED lamp. A multi-function LED lamp that is
              environmentally friendly and soft on the eyes.
            </p>
            <div className="flex justify-end">
              <button className="text-2xl font-semibold border-4 border-[#333333] py-5 px-10 rounded-full my-10 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700">
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>
        <div
          ref={prevRef}
          className="swiper-button-prev hover:bg-[#000] ml-20	 py-3 px-10 rounded-full border border-gray-400 bg-transparent hover:border-0 h-[80px] "
        ></div>
        <div
          ref={nextRef}
          className="swiper-button-next hover:bg-[#000]  mr-20 py-3 px-10 rounded-full border border-gray-400 bg-transparent hover:border-0 h-[80px] "
        ></div>
      </Swiper>
    </>
  );
};

export default Banner;