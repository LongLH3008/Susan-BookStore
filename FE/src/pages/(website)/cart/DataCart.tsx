import { cartData } from "@/common/hooks/useCart";
import CartProducts from "./_components/CartProduct";
import TotalCart from "./_components/TotalCart";

const DataCart = ({ id }: { id: string }) => {
	const { data: cart } = cartData();
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid min-[1000px]:grid-cols-5 h-fit py-5 lg:py-[80px] relative poppins">
			<CartProducts dataCart={cart} />
			<TotalCart dataCart={cart} />
		</div>
	);
};

export default DataCart;
