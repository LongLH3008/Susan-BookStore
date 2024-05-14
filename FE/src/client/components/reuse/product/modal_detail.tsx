import * as img from "@/assets/img";

type Props = {};

const ModalDetail = (props: Props) => {
	return (
		<div
			id="modal_detail_product"
			tabIndex="-1"
			aria-hidden="true"
			className="hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 max-[768px]:p-2 max-[1100px]:p-10  justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
		>
			<div className="relative max-[1100px]:w-full w-3/5 max-h-full">
				<div className="max-[968px]:w-full relative bg-white rounded-lg shadow dark:bg-gray-700 duration-[2s] ease-linear ">
					<button
						type="button"
						className="absolute right-2  top-2 text-gray-400 bg-transparent hover:bg-zinc-500 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="modal_detail_product"
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
					<div className="grid max  sm:grid-cols-2 p-5">
						<span className="h-[465px] flex justify-center items-center overflow-hidden border">
							<img className="h-full" src={img.demo} alt="" />
						</span>
						<div className=" flex flex-col gap-[1rem] pt-10 sm:pt-0 sm:ps-10">
							<h3 className="text-zinc-700 text-[26px] font-semibold">Test Name Product</h3>
							<div className="*:text-[20px]">
								<span className="line-through text-zinc-500">$ OldPrice</span>
								<span className="text-[#00BFC5] ms-3">$ NewPrice</span>
							</div>
							<p className="text-[#707070] text-[14px] mt-3">
								Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus
								id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
								repellendus.
							</p>
							<select className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-sm ring-0 outline-none focus:border-zinc-500 block w-full p-2.5 ">
								<option defaultValue=''>Choose a value</option>
								<option value="US">United States</option>
								<option value="CA">Canada</option>
								<option value="FR">France</option>
								<option value="DE">Germany</option>
							</select>
							<div className="mt-5 flex justify-between sm:justify-start gap-10">
								<div className="relative grid grid-cols-3 w-[100px] border">
									<button
										type="button"
										id="decrement-button"
										data-input-counter-decrement="quantity-input"
										className="grid place-items-center border-r text-zinc-500 font-normal text-[13px]"
									>
										<i className="fa-solid fa-minus"></i>
									</button>
									<input
										type="text"
										id="quantity-input"
										data-input-counter
										aria-describedby="helper-text-explanation"
										className="border-0 px-2 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="1"
										min={0}
										max={20}
										required
										disabled
									/>
									<button
										type="button"
										id="increment-button"
										data-input-counter-increment="quantity-input"
										className="grid place-items-center border-s text-zinc-500 font-normal text-[13px]"
									>
										<i className="fa-solid fa-plus"></i>
									</button>
								</div>
								<button className="px-[25px] py-[8px] bg-zinc-900 hover:bg-zinc-600 text-white">Add to Cart</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalDetail;
