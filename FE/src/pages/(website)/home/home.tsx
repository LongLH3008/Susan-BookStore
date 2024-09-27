import * as icon from "@/common/assets/icon";
import * as img from "@/common/assets/img";
import { CategoryProvider } from "@/common/hooks/useCategories";
import { Link } from "react-router-dom";
import Subcribe from "../../../components/(website)/subcribe/subcribe";
import Banner from "./_components/banner";
import HomeProducts from "./_components/home_products";
import LatestBlogs from "./_components/latest_blogs";
import LatestProducts from "./_components/latest_products";
import Home_review from "./_components/home_review";

const Home = () => {
  return (
    <>
      <Banner />
      <section
        id=""
        className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[30px] mb-[80px] max-[968px]:pt-[100px] min-[968px]:mb-[100px]"
      >
        <Link to="/cua-hang" className="">
          <img className="max-[768px]:w-full" src={img.Subbanner1} alt="" />
        </Link>
        <Link to="/cua-hang">
          <img className="max-[768px]:w-full" src={img.Subbanner2} alt="" />
        </Link>
      </section>
      <CategoryProvider>
        <HomeProducts />
      </CategoryProvider>
      <section
        id=""
        className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[30px] mb-[80px]  min-[968px]:mb-[100px]"
      >
        <Link to="/cua-hang" className="">
          <img className="max-[768px]:w-full" src={img.Subbanner3} alt="" />
        </Link>
        <Link to="/cua-hang">
          <img className="max-[768px]:w-full" src={img.Subbanner4} alt="" />
        </Link>
      </section>
      <LatestProducts />

      {/* đánh giá */}
      <Home_review />
      <LatestBlogs />
      <Subcribe />
    </>
  );
};

export default Home;
