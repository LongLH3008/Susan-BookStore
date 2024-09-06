import { SendRequest } from "@/config";

export const getCartByUser = async (user_id: string) => {
	return await SendRequest("GET", `cart/${user_id}`);
};

export const AddToCart = async (arg: ICartNewProduct) => {
	arg["product_quantity"] = 1;
	return await SendRequest("POST", `cart/addproduct/${arg.user_id}`, arg);
};

export const Increase = async (arg: ICartRecalculate) => {
	return await SendRequest("GET", `cart/increment-quantity/${arg.user_id}/${arg.product_id}`);
};

export const Decrease = async (arg: ICartRecalculate) => {
	return await SendRequest("GET", `cart/decrement-quantity/${arg.user_id}/${arg.product_id}`);
};

export const RemoveFromCart = async (arg: ICartRecalculate) => {
	console.log(arg);
	return await SendRequest("DELETE", `cart/${arg.user_id}/${arg.product_id}`);
};
