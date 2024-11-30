import { useLocalStorageCart } from "@/common/hooks/useLocalStorageCart";
import CartProducts from "./_components/CartProduct";
import TotalCart from "./_components/TotalCart";

const LocalCart = () => {
	const { cart_products } = useLocalStorageCart();
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid min-[1000px]:grid-cols-5 h-fit py-[80px] relative poppins">
			<CartProducts dataCart={cart_products} />
			<TotalCart dataCart={cart_products} />
		</div>
	);
};

export default LocalCart;
