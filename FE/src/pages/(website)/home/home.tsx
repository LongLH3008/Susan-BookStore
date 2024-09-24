import * as icon from "@/common/assets/icon";
import * as img from "@/common/assets/img";
import { CategoryProvider } from "@/common/hooks/useCategories";
import { ProductProvider } from "@/common/hooks/useProduct";
import { Link } from "react-router-dom";
import Subcribe from "../../../components/(website)/subcribe/subcribe";
import Banner from "./_components/banner";
import HomeProducts from "./_components/home_products";
import LatestBlogs from "./_components/latest_blogs";
import LatestProducts from "./_components/latest_products";


const Home = () => {
	return (
		<>
			<Banner />
			<section
				id=""
				className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[30px] mb-[80px] max-[968px]:pt-[100px] min-[968px]:mb-[100px]"
			>
				<Link to="/" className="">
					<img className="max-[768px]:w-full" src={img.Subbanner1} alt="" />
				</Link>
				<Link to="/">
					<img className="max-[768px]:w-full" src={img.Subbanner2} alt="" />
				</Link>
			</section>
			<ProductProvider>
				<CategoryProvider>
					<HomeProducts />
				</CategoryProvider>
			</ProductProvider>
			<section
				id=""
				className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[30px] mb-[80px]  min-[968px]:mb-[100px]"
			>
				<Link to="/" className="">
					<img className="max-[768px]:w-full" src={img.Subbanner3} alt="" />
				</Link>
				<Link to="/">
					<img className="max-[768px]:w-full" src={img.Subbanner4} alt="" />
				</Link>
			</section>
			<ProductProvider>
				<LatestProducts />
			</ProductProvider>
			<section
				style={{
					backgroundImage: `url(${img.CTA_Banner})`,
				}}
				className="bg-center bg-no-repeat bg-cover w-full h-[500px] grid place-items-center py-[100px] mb-[100px]"
			>
				<div className="z-10 flex flex-col justify-between items-center h-full w-[80%] md:w-[60%]  lg:w-[40%]">
					<img className="w-[85px] h-[100px]" src={img.AuthorCta} alt="" />
					<p className="text-[14px] text-center leading-7 text-zinc-500">
						"Sách là cánh cổng dẫn đến những thế giới vô tận, nơi trí tưởng tượng ngự trị tối
						cao và kiến ​​thức không có giới hạn. Hãy để trí tuệ của mọi thời đại và sự sáng tạo
						của các tác giả hướng dẫn tâm trí và tinh thần của bạn. Hãy mở một cuốn sách ngay
						hôm nay và mở khóa những kho báu đang chờ đợi bên trong!"
					</p>
					<img src={icon.iconCta} alt="" />
					<p className="tracking-[6px] font-semibold text-[14px]">Nidesss Cooper</p>
				</div>
			</section>
			<LatestBlogs />
			<Subcribe />
		</>
	);
};

export default Home;
