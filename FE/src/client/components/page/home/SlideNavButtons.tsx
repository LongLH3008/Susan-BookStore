import { useSwiper } from "swiper/react";

export const SlideNavNext = () => {
  const swiper = useSwiper();

  return (
    <button
      className="bg-blue-300 px-8 py-6 *:text-[#797979] bg-white border-4 border-gray-200 hover:bg-[#000] hover:border-[#000] *:hover:text-[#fff] rounded-full absolute top-1/2 right-14 z-20 "
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
      className="bg-blue-300 px-8 py-6 *:text-[#797979] bg-white border-4 border-gray-200 hover:bg-[#000] hover:border-[#000] *:hover:text-[#fff] rounded-full absolute top-1/2 left-14 z-20 "
      onClick={() => swiper.slidePrev()}
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
};
