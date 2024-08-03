import Banner from "./_components/banner";
import * as img from "@/common/assets/img";
import * as icon from "@/common/assets/icon";
import HomeProducts from "./_components/home_products";
import { Link } from "react-router-dom";
import LatestProducts from "./_components/latest_products";
import LatestBlogs from "./_components/latest_blogs";
import Subcribe from "../../../components/(website)/subcribe/subcribe";

type Props = {};

const Home = (props: Props) => {
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
			<HomeProducts />
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
			<LatestProducts />
			<section
				style={{
					backgroundImage: `url(${img.CTA_Banner})`,
				}}
				className="bg-center bg-no-repeat bg-cover w-full h-[500px] grid place-items-center py-[100px] mb-[100px]"
			>
				<div className="z-10 flex flex-col justify-between items-center h-full w-[80%] md:w-[60%]  lg:w-[40%]">
					<img className="w-[85px] h-[100px]" src={img.AuthorCta} alt="" />
					<p className="text-[14px] text-center leading-7 text-zinc-500">
						"Books are the portals to infinite worlds, where imagination reigns supreme and
						knowledge knows no bounds. Let the wisdom of the ages and the creativity of authors
						guide your mind and spirit. Open a book today, and unlock the treasures that await
						within!"
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
