import * as img from "@/common/assets/img";
import { Link } from "react-router-dom";
import BlogComment from "./BlogComment";
const BlogPost = () => {
	return (
		<>
			<div className="sm:col-span-3 ">
				<div className=" border border-[#efefef] p-7">
					<h2 className="text-3xl font-semibold text-[#292929] text-center my-7">
						Testing has a signficant info number of benefits
					</h2>
					<div className="flex divide-x divide-gray-400 *:px-5 justify-center mb-9">
						<p className="text-[#999999]">
							<i className="fa-solid fa-circle-user mr-2"></i>
							Posted By: <span className="text-[#707070]">Susan Demo Admin</span>
						</p>
						<p className="text-[#999999]">
							<i className="fa-regular fa-calendar-days mr-2"></i>
							Posted On: <span className="text-[#333333]">Jan 25, 2022</span>
						</p>
					</div>
					<img src={img.demoBlog} alt="" className="w-full object-cover h-auto" />
					<div className="*:mt-10 *:text-[#707070]">
						<div className="py-7 px-12 border ml-10 border-l-[7px] border-l-[#00bfc5] *:text-[12px]">
							<p>
								Lorem ipsum deleniti repellendus nam deserunt vitae ullam amet quos!
								Nesciunt, quo. Lorem, ipsum dolor. Lorem ipsum dolor sit amet
								consectetur adipisicing elit. Quod, vitae numquam! VitaeLorem ipsum
								dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti
								repellendus nam deserunt vitae ullam amet quos! Nesciunt, quo. Lorem,
								ipsum dolor.
							</p>
						</div>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti
							repellendus nam deserunt vitae ullam amet quos! Nesciunt, quo. Lorem, ipsum
							dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, vitae
							numquam! Vitae alias ullam voluptatibus asperiores fugit ea soluta consectetur
							adipisci enim, impedit odit quisquam, ut, numquam voluptatem quas cum!
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, vitae numquam!
							Vitae alias ullam voluptatibus asperiores fugit ea soluta consectetur adipisci
							enim, impedit odit quisquam, u Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae ullam
							amet quos! Nesciunt, quo. Lorem, ipsum dolor. Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Quod, vitae numquam! Vitae alias ullam
							voluptatibus asperiores fugit ea soluta consectetur adipisci enim, impedit
							odit quisquam, ut, numquam voluptatem quas cum!
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti
							repellendus nam deserunt vitae ullam amet quos! Nesciunt, quo. Lorem, ipsum
							dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, vitae
							numquam! Vitae alias ullam voluptatibus asperiores fugit ea soluta consectetur
							adipisci enim, impedit odit quisquam, ut, numquam voluptatem quas cum!
							repellendus nam deserunt vitae ullam amet quos! Nesciunt, quo. Lorem, ipsum
							dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, vitae
							numquam! Vitae alias ullam voluptatibus asperiores fugit ea soluta consectetur
							adipisci enim, impedit odit quisquam, ut, numquam voluptatem quas cum!
						</p>
					</div>
					<div id="tags " className="my-7 border-t-2 border-b-2 py-2 border-[#e0e0e0]">
						<p className="text-[#999999] text-[17px] ">
							Tags :{" "}
							<Link
								to="/"
								className="italic hover:text-[#00BFC5] text-gray-900 text-[13px]"
							>
								Library
							</Link>{" "}
							,{" "}
							<Link
								to="/"
								className="italic hover:text-[#00BFC5] text-gray-900 text-[13px]"
							>
								Notebook{" "}
							</Link>
						</p>
					</div>
					<div className="flex justify-center mb-10 *:mx-2 ">
						<i className="hover:text-white text-[#1de1f2] fa-brands fa-twitter border hover:bg-[#1de1f2] p-3 rounded-full"></i>
						<i className="hover:text-white text-[#526faf] fa-brands fa-facebook-f border hover:bg-[#526faf] py-3 px-4  rounded-full"></i>
						<i className="hover:text-white text-[#dd5245] fa-brands fa-google border hover:bg-[#dd5245] p-3 rounded-full"></i>
						<i className="hover:text-white text-[#bd081b] fa-brands fa-pinterest border hover:bg-[#bd081b] p-3 rounded-full"></i>
					</div>
				</div>
				<BlogComment />
			</div>
		</>
	);
};

export default BlogPost;
