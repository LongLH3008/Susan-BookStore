import * as img from "@/assets/img";
import { useEffect, useState } from "react";
import ItemInCheckout from "./ItemInCheckout";

type Props = {};

const CheckoutProducts = (props: Props) => {
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScroll(window.scrollY);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={`
			${scroll > 5 && "sticky top-0 left-[54.2%] h-screen"}
			max-[1000px]:hidden w-[55.5%] max-h-full bg-zinc-50 border-l flex flex-col justify-start items-start p-[30px] md:pr-[5.3%] xl:pr-[13%] 2xl:pr-[21%]`}
		>
			<ItemInCheckout />
			<ItemInCheckout />
			<ItemInCheckout />
			<div className="w-full mt-10 flex flex-col gap-2 *:flex *:justify-between *:items-center">
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Subtotal</p>
					<p>55.00</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Shipping</p>
					<p>0.17</p>
				</div>
				<div className="text-zinc-700 text-[18px] font-semibold">
					<p>Total</p>
					<p>
						<span className="text-[13px] text-zinc-400 mr-1">USD</span>
						<span>$55.17</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutProducts;
