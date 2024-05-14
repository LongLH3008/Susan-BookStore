import React from "react";

type Props = {};

const Subcribe = (props: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] py-[100px]">
			<p className="mb-[5px] text-[15px] text-zinc-500 text-center">
				Special Ofers For Subscribers
			</p>
			<div className="mb-[20px] text-center text-3xl text-zinc-800 font-medium tracking-wide">
				10% Member Discount
			</div>
			<p className="mb-[50px] text-[15px] text-zinc-500 text-center">
				Subscribe to our newsletters now and stay up to date with new collections, the latest lookbooks and
				exclusive offers.
			</p>
			<form className="w-full grid place-items-center">
				<div className="min-[500px]:w-[70%] sm:w-[55%] flex border-2 border-zinc-300 rounded-sm py-[10px] h-[55px]">
					<input
						type="search"
						className="text-[12px] block w-full p-4 ps-10 text-sm outline-none text-gray-900 ring-0 border-0"
						placeholder="Your email address"
						required
					/>
					<button
						type="submit"
						className="w-1/3 text-zinc-800 hover:text-[#00BFC5] text-[14px] font-bold uppercase text-sm px-4 py-2 border-l-2 border-zinc-300"
					>
						Subcribe
					</button>
				</div>
			</form>
		</div>
	);
};

export default Subcribe;
