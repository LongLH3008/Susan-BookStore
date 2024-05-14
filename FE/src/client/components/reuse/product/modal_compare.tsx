import React from "react";
import * as img from "@/assets/img";
import { Link } from "react-router-dom";

type Props = {};

const DetailCompareImg = () => {
	return (
		<td>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="w-[120px] h-[120px] overflow-hidden flex justify-center items-center">
					<img src={img.demo} alt="" />
				</div>
				<p>
					{/* status */}
					<span className="font-semibold text-red-700 mr-2">On sale</span>
					<span className="text-red-500">$ Price</span>
				</p>
				<Link to="/" className="hover:text-red-600 uppercase">
					View product
				</Link>
			</div>
		</td>
	);
};
const ModalCompare = (props: Props) => {
	return (
		<div
			id="modal_compare_product"
			tabIndex="-1"
			aria-hidden="true"
			className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
		>
			<div className="relative p-4 max-[986px]:w-full w-3/5 max-h-full">
				<div className="relative p-7 bg-white rounded-lg shadow dark:bg-gray-700 duration-[2s] ease-linear ">
					{/* <!-- Close Modal --> */}
					<button
						type="button"
						className="absolute right-2  top-2 text-gray-400 bg-transparent hover:bg-zinc-500 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="modal_compare_product"
					>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span className="sr-only">Close modal</span>
					</button>
					<table className="w-full mt-5 text-[14px] text-zinc-700 text-center">
						<tr className="*:p-[12px] border *:border-x">
							<th scope="col" className="w-[20%]">
								Action
							</th>
							<td>
								<i className="fa-solid fa-xmark"></i>
							</td>
							<td>
								<i className="fa-solid fa-xmark"></i>
							</td>
						</tr>
						<tr className="*:p-[12px] border *:border-x">
							<th scope="col" className="">
								Product name
							</th>
							<td>555 77 854</td>
							<td>555 77 854</td>
						</tr>
						<tr className="*:p-[12px] border *:border-x">
							<th scope="col" className="h-[227px]">
								Product image
							</th>
							<DetailCompareImg />
							<DetailCompareImg />
						</tr>
						<tr className="*:p-[12px] border *:border-x">
							<th scope="col" className="h-[100px]">
								Product description
							</th>
							<td>
								As opposed to using 'Content here, content here', making it look like readable English.
								Many desktop publishing packages and web page editors now use Lorem Ipsum as their
								default model text, and a search for 'lorem ipsum' will uncover many...
							</td>
							<td>
								As opposed to using 'Content here, content here', making it look like readable English.
								Many desktop publishing packages and web page editors now use Lorem Ipsum as their
								default model text, and a search for 'lorem ipsum' will uncover many...
							</td>
						</tr>
						<tr className="*:p-[12px] border *:border-x">
							<th scope="col" className="uppercase">
								availability
							</th>
							<td>Available In stock</td>
							<td>Available In stock</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ModalCompare;
