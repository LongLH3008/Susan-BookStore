import { Link, useLocation } from "react-router-dom";
import * as img from "@/assets/img";

const Breadcrumb = ({ title }: { title: string }) => {
	const location = useLocation();
	const from = location.state?.from;

	return (
		<div
			style={{ backgroundImage: `url(${img.bannerBreadcrumb}` }}
			className={`bg-center bg-no-repeat bg-cover h-[336px] py-[130px] min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] w-full *:text-[#333333]`}
		>
			<div className="h-[75px] flex flex-col justify-center items-center">
				<h1 className="text-center text-[35px] font-semibold mb-1">{title}</h1>
				{from && (
					<div className="flex justify-center items-center gap-2 text-[14px]">
						<Link to={`${from}`} state={{ from: location.pathname }} className="underline">
							{from == "/" ? "Home" : from.split("/")[1].charAt(0).toUpperCase() + from.slice(2)}
						</Link>
						<i className="fa-solid fa-angle-right text-zinc-500 text-[12px]"></i>
						<span className="text-[#00BFC5]">{title}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Breadcrumb;
