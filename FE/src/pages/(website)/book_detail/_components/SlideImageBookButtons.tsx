import { useSwiper } from "swiper/react";

export const SlideImgaeBookNext = () => {
  const swiper = useSwiper();

  return (
    <button
      className="btn_banner_home px-8 py-6 *:text-[#333333]  absolute top-[17%] -right-8 z-20 "
      onClick={() => swiper.slideNext()}
    >
      <i className="fa-solid fa-chevron-right text-xl"></i>
    </button>
  );
};
export const SlideImgaeBookPrev = () => {
  const swiper = useSwiper();

  return (
    <button
      className="btn_banner_home px-8 py-6 *:text-[#333333]  absolute top-[17%] -left-8 z-20 "
      onClick={() => swiper.slidePrev()}
    >
      <i className="fa-solid fa-chevron-left text-xl"></i>
    </button>
  );
};
