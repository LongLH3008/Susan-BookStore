// import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { SlideNavNext, SlideNavPrev } from "./SlideNavButtons";

const Banner = () => {
  return (
    <>
      <div className="relative ">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper sliderbanner "
        >
          <SwiperSlide className="w-full xl:h-[87vh] lg:h-[65vh] sm:h-[50vh] min-[320px]:h-[40vh] bg-banner-home4 bg-cover min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
            <div className=" lg:my-32 min-[320px]:my-10 *:text-[#333333] ">
              <h4 className="xl:text-3xl uppercase ">New Arrivals</h4>
              <h2 className="xl:text-[75px] lg:text-5xl min-[320px]:text-3xl font-bold uppercase my-3 animate-bounce-x ">
                Led Desk Brand
              </h2>
              <p className="sm:w-[650px] min-[320px]:w-[70%]">
                Next generation LED lamp. A multi-function LED lamp that is
                environmentally friendly and soft on the eyes.
              </p>
              <button className="lg:text-2xl sm:text-xl font-semibold border-4 border-[#333333] lg:px-10 sm:px-6 min-[320px]:px-4 lg:py-5 sm:py-4 min-[320px]:py-2 rounded-full my-10 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700">
                Shop Now
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="w-full xl:h-[87vh] lg:h-[65vh] sm:h-[50vh] min-[320px]:h-[40vh] bg-banner-home2 bg-cover min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
            <div className=" lg:my-32 min-[320px]:my-10 *:text-[#333333]  *:text-center">
              <h4 className="xl:text-3xl uppercase ">New Arrivals</h4>
              <h2 className="xl:text-[75px] lg:text-5xl min-[320px]:text-3xl font-bold uppercase my-3 animate-bounce-x ">
                Led Desk Brand
              </h2>
              <p className="m-auto sm:w-[650px] min-[320px]:w-[70%]">
                Next generation LED lamp. A multi-function LED lamp that is
                environmentally friendly and soft on the eyes.
              </p>
              <div className="flex justify-center">
                <button className=" lg:text-2xl sm:text-xl font-semibold border-4 border-[#333333] lg:px-10 sm:px-6 min-[320px]:px-4 lg:py-5 sm:py-4 min-[320px]:py-2 rounded-full my-10 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700 ">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full xl:h-[87vh] lg:h-[65vh] sm:h-[50vh] min-[320px]:h-[40vh] bg-banner-home3 bg-cover min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
            <div className=" lg:my-32 min-[320px]:my-10 *:text-[#333333]  *:text-end">
              <h4 className="xl:text-3xl uppercase ">New Arrivals</h4>
              <h2 className="xl:text-[75px] lg:text-5xl min-[320px]:text-3xl font-bold uppercase my-3 animate-bounce-x ">
                Led Desk Brand
              </h2>
              <p className="text-right  ">
                Next generation LED lamp. A multi-function LED lamp that is
                environmentally friendly and soft on the eyes.
              </p>
              <div className="flex justify-end">
                <button className="lg:text-2xl sm:text-xl font-semibold border-4 border-[#333333] lg:px-10 sm:px-6 min-[320px]:px-4 lg:py-5 sm:py-4 min-[320px]:py-2 rounded-full my-10 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="w-full xl:h-[87vh] lg:h-[65vh] sm:h-[50vh] min-[320px]:h-[40vh] bg-banner-home6 bg-cover min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
            <div className=" lg:my-32 min-[320px]:my-10 *:text-[#333333]  *:text-end">
              <h4 className="xl:text-3xl uppercase ">New Arrivals</h4>
              <h2 className="xl:text-[75px] lg:text-5xl min-[320px]:text-3xl font-bold uppercase my-3 animate-bounce-x ">
                Led Desk Brand
              </h2>
              <p className="text-right  ">
                Next generation LED lamp. A multi-function LED lamp that is
                environmentally friendly and soft on the eyes.
              </p>
              <div className="flex justify-end">
                <button className="lg:text-2xl sm:text-xl font-semibold border-4 border-[#333333] lg:px-10 sm:px-6 min-[320px]:px-4 lg:py-5 sm:py-4 min-[320px]:py-2 rounded-full my-10 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SlideNavNext />
          <SlideNavPrev />
        </Swiper>
      </div>
    </>
  );
};

export default Banner;
