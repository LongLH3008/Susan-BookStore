import * as icon from "@/assets/icon";
import CheckoutInfomation from "../components/page/checkout/CheckoutInfomation";
import CheckoutProducts from "../components/page/checkout/CheckoutProducts";
import { Link } from "react-router-dom";
import ResponsiveCheckoutProducts from "../components/page/checkout/ResponsiveCheckoutProducts";

type Props = {};

const Checkout = (props: Props) => {
	return (
		<>
			<nav className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] flex justify-between items-center h-[67px] border-b border-zinc-300">
				<Link to={"/"}>
					<p className="text-[21px] font-semibold">Susan Bookstore</p>
				</Link>
				<Link to={"/cart"}>
					<img className="w-[25px]" src={icon.cartCheckout} alt="" />
				</Link>
			</nav>
			<ResponsiveCheckoutProducts />
			<div className="min-[320px]:px-[5%] xl:pl-[11.5%] 2xl:pl-[17.5%] min-[1000px]:pr-0 flex w-full relative">
				<CheckoutInfomation />
				<CheckoutProducts />
			</div>
		</>
	);
};

export default Checkout;
