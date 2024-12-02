import useBanner from "@/common/hooks/useBanner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideNavNext, SlideNavPrev } from "./SlideNavButtons";
import { IBannerHome } from "@/common/interfaces/banner";

const Banner = () => {
  const { DataBanners } = useBanner();
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
          {DataBanners.data?.metadata?.data.map(
            (data: IBannerHome, index: number) => (
              <SwiperSlide
                key={index}
                className={`w-full xl:h-[87vh] lg:h-[65vh] sm:h-[50vh] min-[320px]:h-[40vh]  bg-cover min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]`}
                style={{
                  backgroundImage: `url(${data.image})`,
                }}
              >
                <div
                  className={` lg:my-32 min-[320px]:my-10 *:text-[#333333] flex flex-col items-${data.position}`}
                >
                  <h4 className="xl:text-3xl uppercase ">{data.title}</h4>
                  <h2 className="xl:text-[75px] lg:text-5xl min-[320px]:text-3xl font-bold uppercase my-3 animate-bounce-x ">
                    {data.subtitle}
                  </h2>
                  <p className="sm:w-[650px] min-[320px]:w-[70%]">
                    {data.description}
                  </p>
                  <button className="lg:text-2xl sm:text-xl font-semibold border-4 border-[#333333] lg:px-10 sm:px-6 min-[320px]:px-4 lg:py-5 sm:py-4 min-[320px]:py-2 rounded-full my-10 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700">
                    Shop Now
                  </button>
                </div>
              </SwiperSlide>
            )
          )}

          <SlideNavNext />
          <SlideNavPrev />
        </Swiper>
      </div>
    </>
  );
};

export default Banner;
