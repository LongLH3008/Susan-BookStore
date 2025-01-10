import * as icon from "@/common/assets/icon";
import * as img from "@/common/assets/img";
import { IReview } from "@/common/interfaces/review";
import { getUsers } from "@/services/auth.service";
import { getReviews } from "@/services/review.service";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Review All"],
    queryFn: () => getReviews(),
  });
  const { data: Users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  const findUserById = (userId: string) => {
    if (!Array.isArray(Users?.metadata?.allUsers)) return null;
    return Users?.metadata?.allUsers.find((user: IUser) => user._id === userId);
  };
  // Lọc ra các review không phải mảng rỗng
  const nonEmptyReviews = data?.metadata?.reviews
    .filter((item: any) => item?.reviews?.length > 0)
    .flatMap((item: any) => item.reviews);
  // console.log(nonEmptyReviews);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
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
          {nonEmptyReviews.length === 0 ? (
            <SwiperSlide className="flex items-center justify-center">
              <CircularProgress />
            </SwiperSlide>
          ) : (
            nonEmptyReviews?.map((review: IReview) => {
              const user = findUserById(review?.userId);
              return (
                <SwiperSlide key={review?._id}>
                  <div className="w-8/12 z-10 flex flex-col justify-between items-center m-auto *:py-2 ">
                    <img
                      className="w-[85px] h-[100px] object-cover"
                      src={
                        user?.user_avatar ||
                        "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                      }
                      alt={user?.user_name}
                    />
                    <p className="text-[14px] text-center leading-7 text-zinc-500">
                      "{review?.comment}"
                    </p>
                    <img src={icon.iconCta} alt="" />
                    <p className="tracking-[6px] font-semibold text-[14px]">
                      {user?.user_name}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })
          )}

          <SlideBookNext />
          <SlideBookPrev />
        </Swiper>
      </section>
    </>
  );
};

export default Home_review;
