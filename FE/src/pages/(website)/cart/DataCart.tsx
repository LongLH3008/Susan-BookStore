import { getCartByUser } from "@/services/cart.service";
import { useQuery } from "@tanstack/react-query";
import CartProducts from "./_components/CartProduct";
import TotalCart from "./_components/TotalCart";

const DataCart = ({ id }: { id: string }) => {
	const { data: cart } = useQuery({
		queryKey: ["cart"],
		queryFn: async () => await getCartByUser(id),
	});
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid min-[1000px]:grid-cols-5 h-fit py-[80px] relative poppins">
			<CartProducts dataCart={cart?.metadata.cart_products} />
			<TotalCart dataCart={cart?.metadata.cart_products} />
		</div>
	);
};

export default DataCart;
