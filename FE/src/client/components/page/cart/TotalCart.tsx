import * as icon from "@/assets/icon";

type Props = {};

const ItemTotal = () => {
	return (
		<div className="w-full relative flex justify-between items-start">
			<span className="">
				<p className="text-[15px] text-zinc-700">6. Variable with soldout</p>
				<p className="text-zinc-500 text-[12px]">s / green</p>
			</span>
			<p className="text-[14px] text-zinc-700">
				<span className="mr-1 line-through text-zinc-500">$55.00</span> $55.00 x 1
			</p>
			<p className="ml-[2%] text-[15px]">$55.00</p>
		</div>
	);
};

const TotalCart = (props: Props) => {
	return (
		<div className="border-zinc-300 flex flex-col justify-between max-[1000px]:mt-5 max-[1000px]:border-t max-[1000px]:pt-5 min-[1000px]:col-span-2 min-[1000px]:border-l min-[1000px]:pl-[30px]">
			<div>
				<div className="flex justify-between justify-items-center mb-10">
					<div className="h-full py-2 text-[20px] font-[400]">Total Cart</div>
					<div className="flex justify-between items-center gap-2 border p-2 rounded-sm border-zinc-500">
						<img className="w-[20px]" src={icon.cartCheckout} alt="" />
						<span>01</span>
					</div>
				</div>
				<div className="flex flex-col max-h-[300px] gap-4 overflow-hidden overflow-y-scroll overscrollHidden">
					<ItemTotal />
					<ItemTotal />
					<ItemTotal />
					<ItemTotal />
					<ItemTotal />
					<ItemTotal />
				</div>
			</div>
			<div className="border-t border-zinc-300 mt-8 pt-10">
				<div className="flex justify-between items-center text-[15px]">
					<p>Discount</p>
					<p>- $55.00</p>
				</div>
				<div className="flex justify-between items-center text-xl mt-2">
					<p className="">Total</p>
					<p>$55.00</p>
				</div>
			</div>
		</div>
	);
};

export default TotalCart;
