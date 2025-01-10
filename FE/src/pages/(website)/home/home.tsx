import useBanner from "@/common/hooks/useBanner";
import { BlogProvider } from "@/common/hooks/useBlog";
import { CategoryProvider } from "@/common/hooks/useCategories";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import Banner from "./_components/banner";
import HomeProducts from "./_components/home_products";
import Home_review from "./_components/home_review";
import LatestBlogs from "./_components/latest_blogs";
import LatestProducts from "./_components/latest_products";

const Home = () => {
	const { DataBannerSale } = useBanner();

	const data = DataBannerSale?.data?.metadata?.data;
	console.log("data", data);

	return (
		<>
			<Banner />
			<section
				id=""
				className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[30px] mb-[80px] max-[968px]:pt-[100px] min-[968px]:mb-[100px]"
			>
				{DataBannerSale.isLoading ? (
					<>
						<Skeleton variant="rectangular" width="100%" height={300} />
						<Skeleton variant="rectangular" width="100%" height={300} />
					</>
				) : (
					<>
						<Link to={data[0]?.link || "/cua-hang"} className="">
							<img className="max-[768px]:w-full h-[300px]" src={data[0]?.image} alt="" />
						</Link>
						<Link to={data[1]?.link || "/cua-hang"}>
							<img className="max-[768px]:w-full h-[300px]" src={data[1]?.image} alt="" />
						</Link>
					</>
				)}
			</section>
			<CategoryProvider>
				<HomeProducts />
			</CategoryProvider>
			<section
				id=""
				className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[30px] mb-[80px]  min-[968px]:mb-[100px]"
			>
				{DataBannerSale.isLoading ? (
					<>
						<Skeleton variant="rectangular" width="100%" height={300} />
						<Skeleton variant="rectangular" width="100%" height={300} />
					</>
				) : (
					<>
						<Link to={data[2]?.link || "/cua-hang"} className="">
							<img className="max-[768px]:w-full h-[300px]" src={data[2]?.image} alt="" />
						</Link>
						<Link to={data[3]?.link || "/cua-hang"}>
							<img className="max-[768px]:w-full h-[300px]" src={data[3]?.image} alt="" />
						</Link>
					</>
				)}
			</section>
			<LatestProducts />

			{/* đánh giá */}
			<Home_review />
			<BlogProvider>
				<LatestBlogs />
			</BlogProvider>
		</>
	);
};

export default Home;
