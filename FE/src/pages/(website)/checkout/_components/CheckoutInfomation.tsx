import Contact from "./Contact";
import Delivery from "./Delivery";
import Payment from "./Payment";
import ShippingMethod from "./ShippingMethod";

type Props = {};

const CheckoutInfomation = (props: Props) => {
	return (
		<div className="w-[44.5%] max-[1000px]:w-full flex justify-end items-start">
			<form action="" className="w-full h-full p-[33px] max-[1000px]:pr-0 pl-0 flex flex-col gap-[33px]">
				<Contact />
				<Delivery />
				<ShippingMethod />
				<Payment />
				<button
					type="submit"
					className="w-full rounded border border-zinc-300 h-[58px] font-medium hover:bg-zinc-800 hover:text-white duration-150 ease-in"
				>
					Pay Now
				</button>
				<div className="border-t  border-zinc-300 mt-10 text-zinc-500 text-[12px] pt-5">All rights reserved Susan Bookstore</div>
			</form>
		</div>
	);
};

export default CheckoutInfomation;
