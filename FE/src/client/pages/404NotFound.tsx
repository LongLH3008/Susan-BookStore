import * as img from "@/assets/img";
import { Link } from "react-router-dom";

type Props = {};

const NotFound404 = (props: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] w-full h-screen flex justify-start items-center">
			<div className="flex flex-col items-start justify-start">
				<div className="flex gap-10 justify-start items-start">
					<img className="w-1/3" src={img.notfound} alt="" />
					<div>
						<p className="text-[100px] font-bold">404</p>
						<div className="flex items-center">Oops , this page not found</div>
						<Link to={"/"} className="border-b pr-1 border-black py-1 w-fit">
							Return home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound404;
