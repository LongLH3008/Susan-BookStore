import { userState } from "@/common/hooks/useAuth";
import Breadcrumb from "@/components/(website)/breadcrumb/breadcrumb";
import DataCart from "./DataCart";
import LocalCart from "./LocalCart";

const Cart = () => {
	const { id } = userState();

	return (
		<>
			<Breadcrumb title="Giỏ hàng" />
			{id ? <DataCart id={id} /> : <LocalCart />}
		</>
	);
};

export default Cart;
