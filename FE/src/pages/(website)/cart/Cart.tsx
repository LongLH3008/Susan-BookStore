import CartProducts from "./_components/CartProduct";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb";
import { userState } from "@/common/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getCartByUser } from "@/services/cart";
import TotalCart from "./_components/TotalCart";

const Cart = () => {
	const { id } = userState();
	const { data: cart } = useQuery({
		queryKey: ["cart"],
		queryFn: async () => await getCartByUser(id),
	});

	return (
		<>
			<Breadcrumb title="Your Shopping Cart" />
			{cart && (
				<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid min-[1000px]:grid-cols-5 h-fit py-[80px] relative poppins">
					<CartProducts user_id={id} dataCart={cart?.metadata.cart_products} />
					<TotalCart dataCart={cart?.metadata.cart_products} />
				</div>
			)}
		</>
	);
};

export default Cart;
