import * as img from "@/common/assets/img";
import { Link } from "react-router-dom";

type Props = {};

const Blog = (props: Props) => {
	return (
		<div className="relative flex flex-col justify-between h-[425px]">
			<div className="flex justify-center items-center overflow-hidden h-[222px]">
				<img src={img.demoBlog} alt="" className="w-full h-full" />
				{/* Time  */}
				<span className="absolute top-[6%] left-[6%] rounded-full w-[70px] h-[70px] bg-white flex flex-col justify-center items-center">
					<p className="text-[#929292] font-[500]">Jan</p>
					<p className="text-xl text-zinc-700 font-bold">25</p>
				</span>
			</div>
			<div className="flex flex-col justify-between h-[182px]">
				<Link
					to="/blog_detail"
					state={{ from: location.pathname }}
					className="hover:text-[#00BFC5] text-zinc-700 font-semibold text-[18px]"
				>
					Testing has a signficant info number of benefits
				</Link>
				<p className="text-[#9d9d9d] text-[14px]">
					<span className="text-[#333]">Jan 25 2022</span> _ by: <span>Author</span>
				</p>
				<p className="text-[#707070] text-[14px]">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum...
				</p>
				<Link
					to="/blog_detail"
					state={{ from: location.pathname }}
					className="hover:text-[#00BFC5] text-zinc-700 font-[500] text-[14px] w-fit border-b-2 py-1"
				>
					Read more
				</Link>
			</div>
		</div>
	);
};

export default Blog;
