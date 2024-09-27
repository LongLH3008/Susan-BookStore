import * as icon from "@/common/assets/icon";
import * as img from "@/common/assets/img";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// import required modules

export const SlideBookNext = () => {
  const swiper = useSwiper();

  return (
    <button
      className="flex justify-center items-center w-[50px] h-[50px] rounded-full hover:bg-gray-200  px-8 py-6 *:text-[#333333]  absolute top-[35%] -right-0 z-20 "
      onClick={() => swiper.slideNext()}
    >
      <i className="fa-solid fa-chevron-right text-xl"></i>
    </button>
  );
};
export const SlideBookPrev = () => {
  const swiper = useSwiper();

  return (
    <button
      className="flex justify-center items-center w-[50px] h-[50px] rounded-full hover:bg-gray-200  px-8 py-6 *:text-[#333333]  absolute top-[35%] -left-0 z-20 "
      onClick={() => swiper.slidePrev()}
    >
      <i className="fa-solid fa-chevron-left text-xl"></i>
    </button>
  );
};

const Home_review = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${img.CTA_Banner})`,
        }}
        className="bg-center bg-no-repeat bg-cover w-full h-[500px] grid place-items-center py-[100px] mb-[100px]"
      >
        <Swiper
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="mySwiper h-full w-9/12 "
        >
          <SwiperSlide>
            <div className="w-8/12 z-10 flex flex-col justify-between items-center m-auto *:py-2 ">
              <img
                className="w-[85px] h-[100px] object-cover"
                src={img.AuthorCta}
                alt=""
              />
              <p className="text-[14px] text-center leading-7 text-zinc-500">
                "Sách là cánh cổng đến những thế giới vô tận , noi trí tưởng
                tượng ngự trị tối cao và kiến thức không có giới hạn . Hãy để
                trí tuệ của mọi thời đại và sự sáng tạo của các tác giả hướng
                dẫn tâm trí và tinh thần của bạn. Hãy mở một cuốn sách ngay hôm
                nay và mở khóa những kho báu đang chờ đợi bên trong!"
              </p>
              <img src={icon.iconCta} alt="" />
              <p className="tracking-[6px] font-semibold text-[14px]">
                Nidesss Cooper
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-8/12 z-10 flex flex-col justify-between items-center m-auto *:py-2">
              <img
                className="w-[85px] h-[100px] object-cover"
                src={img.AuthorCta}
                alt=""
              />
              <p className="text-[14px] text-center leading-7 text-zinc-500">
                "Sách là cánh cổng đến những thế giới vô tận , noi trí tưởng
                tượng ngự trị tối cao và kiến thức không có giới hạn "
              </p>
              <img src={icon.iconCta} alt="" />
              <p className="tracking-[6px] font-semibold text-[14px]">
                Nidesss Cooper
              </p>
            </div>
          </SwiperSlide>
          <SlideBookNext />
          <SlideBookPrev />
        </Swiper>
      </section>
    </>
  );
};

export default Home_review;
