import { useSwiper } from "swiper/react";

export const SlideNavNext = () => {
  const swiper = useSwiper();

  return (
    <button
      className="btn_banner_home lg:px-8 sm:px-6 min-[320px]:px-4 lg:py-6 sm:py-4 min-[320px]:py-2 *:text-[#797979] bg-white border-4 border-gray-200 hover:bg-[#333333] hover:border-[#333333] *:hover:text-[#fff] rounded-full absolute top-[45%] right-14 z-20  hidden "
      onClick={() => swiper.slideNext()}
    >
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );
};
export const SlideNavPrev = () => {
  const swiper = useSwiper();

  return (
    <button
      className="btn_banner_home lg:px-8 sm:px-6 min-[320px]:px-4 lg:py-6 sm:py-4 min-[320px]:py-2 *:text-[#797979] bg-white border-4 border-gray-200 hover:bg-[#333333] hover:border-[#333333] *:hover:text-[#fff] rounded-full absolute top-[45%] left-14 z-20  hidden "
      onClick={() => swiper.slidePrev()}
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
};
