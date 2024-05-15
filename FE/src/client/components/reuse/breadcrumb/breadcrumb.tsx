import React from "react";
import { Link, useParams } from "react-router-dom";

type Props = {
	current: string;
	from: string;
};

const Breadcrumb = ({ current, from }: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] w-full bg-[#F4F4F4] mb-11 py-36 *:text-[#333333]">
			<div className="">
                <h1 className="text-center text-[43px] font-semibold">{current}</h1>
				<div className=" flex justify-center items-center *:px-2 mt-4">
                    <Link to="/">{from}</Link>
					<i className="fa-solid fa-angle-right "></i>
                    <p className="text-[#00BFC5]">{current}</p>
				</div>
			</div>
		</div>
	);
};

export default Breadcrumb;
