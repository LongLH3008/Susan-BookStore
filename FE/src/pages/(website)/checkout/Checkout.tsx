import * as icon from "@/common/assets/icon";
import CheckoutInfomation from "./_components/CheckoutInfomation";
import CheckoutProducts from "./_components/CheckoutProducts";
import { Link } from "react-router-dom";
import ResponsiveCheckoutProducts from "./_components/ResponsiveCheckoutProducts";
import { userState } from "@/common/hooks/useAuth";
import { useEffect } from "react";

const Checkout = () => {
	const { AuthorUser } = userState();

	useEffect(() => {
		AuthorUser();
	}, []);

	return (
		<>
			<nav className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] flex justify-between items-center h-[67px] border-b border-zinc-300">
				<Link to={"/"}>
					<p className="text-[21px] font-semibold">Susan Bookstore</p>
				</Link>
				<Link
					to={"/cart"}
					state={{ from: location.pathname }}
					className="flex items-center gap-2 font-semibold"
				>
					Back to cart <img className="w-[25px]" src={icon.cartCheckout} alt="" />
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
