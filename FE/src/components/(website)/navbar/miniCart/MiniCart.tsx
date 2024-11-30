import { userState } from "@/common/hooks/useAuth";
import LocalStorageCart from "./LocalStorageCart";
import DataCart from "./DataCart";

const DropdownMiniCart = () => {
	const { id } = userState();
	return <>{id ? <DataCart /> : <LocalStorageCart />}</>;
};

export default DropdownMiniCart;
