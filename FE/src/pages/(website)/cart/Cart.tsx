import CartProducts from "./_components/CartProduct";
import TotalCart from "./_components/TotalCart";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb";

type Props = {};

const Cart = (props: Props) => {
	return (
		<>
			<Breadcrumb title="Your Shopping Cart" />
			<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid min-[1000px]:grid-cols-5 h-fit py-[80px] relative poppins">
				<CartProducts />
				<TotalCart />
			</div>
		</>
	);
};

export default Cart;
