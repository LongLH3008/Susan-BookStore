import { IBannerHome } from "@/common/interfaces/banner";

interface props {
  bannerHome: IBannerHome;
}
const BannerItem = ({ bannerHome }: props) => {
  console.log("image", bannerHome.image);

  return (
    <>
      <div
        className="w-full h-[400px] bg-cover lg:px-8 sm:px-6 min-[320px]:px-4 lg:py-6 sm:py-4 min-[320px]:py-2"
        style={{
          backgroundImage: `url(${bannerHome.image})`,
        }}
      >
        <div className=" lg:my-10 min-[320px]:my-10 *:text-[#333333] ">
          <h4 className="xl:text-xl uppercase ">{bannerHome.title}</h4>
          <h2 className="xl:text-[50px] lg:text-5xl min-[320px]:text-3xl font-bold uppercase my-3 animate-bounce-x ">
            {bannerHome.subtitle}
          </h2>
          <p className="sm:w-[650px] min-[320px]:w-[70%]">
            {bannerHome.description}
          </p>
          <button className="lg:text-xl sm:text-xl font-semibold border-4 border-[#333333] lg:px-10 sm:px-6 min-[320px]:px-4 lg:py-2 sm:py-3 min-[320px]:py-2 rounded-full my-20 hover:bg-[#333333] hover:text-white animate-bounce transition-transform duration-1500 transform translate-y-[-20px] delay-700">
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default BannerItem;
