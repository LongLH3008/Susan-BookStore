import { userState } from "@/common/hooks/useAuth";
import LocalStorageCart from "./LocalStorageCart";
import DataCart from "./DataCart";

const DropdownMiniCart = () => {
	const { id } = userState();
	return <>{id ? <DataCart user_id={id} /> : <LocalStorageCart />}</>;
};

export default DropdownMiniCart;
