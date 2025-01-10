import * as CartService from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { create } from "zustand";
import { ToastVariant } from "../interfaces/toast";
import { debounce } from "../shared/debounce";

type quantityHandle = {
	quantity: number,
	itemQuantity: number,
	changeQuantity: (arg: number) => void;
	setItemQuantity: (arg: number) => void;
}

export const quantityHandle = create<quantityHandle>((set) => ({
	quantity: 1,
	itemQuantity: 0,
	changeQuantity: (arg) => {
		set({ quantity: arg })
	},
	setItemQuantity: (arg) => {
		set({ itemQuantity: arg })
	}
}))

type cartData = {
	data: ICart[],
	get: (arg: string) => void;
	add: (arg: ICartNewProduct) => void;
	increase: (arg: ICartRecalculate) => void;
	decrease: (arg: ICartRecalculate) => void;
	remove: (arg: ICartRecalculate) => void;
	select: (arg: ICartSelectToCheckout) => void;
}

export const cartData = create<cartData>((set) => ({
	data: [],
	get: async (arg: string) => {
		const res = await CartService.getCartByUser(arg);
		if (!res) return;
		const { cart_products } = res.metadata;
		set({ data: cart_products });
	},
	add: async (arg: ICartNewProduct) => {
		const res = await CartService.AddToCart(arg);
		if (!res) return;
		const { cart_products } = res.metadata;
		console.log(cart_products);
		set({ data: cart_products });
	},
	increase: async (arg: ICartRecalculate) => {
		const res = await CartService.Increase(arg);
		if (!res) return;
		const { cart_products } = res.metadata;
		set({ data: cart_products });
	},
	decrease: async (arg: ICartRecalculate) => {
		const res = await CartService.Decrease(arg);
		if (!res) return;
		const { cart_products } = res.metadata;
		set({ data: cart_products });
	},
	remove: async (arg: ICartRecalculate) => {
		const res = await CartService.RemoveFromCart(arg);
		if (!res) return;
		const { cart_products } = res.metadata;
		set({ data: cart_products });
	},
	select: async (arg: ICartSelectToCheckout) => {
		const res = await CartService.SelectToCheckout(arg);
		if (!res) return;
		const { cart_products } = res.metadata;
		set({ data: cart_products });
	}
}))

type useCart = {
	action: "ADD" | "REMOVE" | "INCREASE" | "DECREASE" | "SELECT_TO_CHECKOUT";
	onSuccess?: (data?: any) => void;
	onError?: (error?: any) => void;
};

export const useCart = ({ action, onSuccess, onError }: useCart) => {
	const queryClient = useQueryClient();
	const { mutate, ...rest } = useMutation({
		mutationFn: async (args: any) => {
			try {
				let response;
				switch (action) {
					case "ADD":
						console.log(args);
						response = await CartService.AddToCart(args);
						break;
					case "REMOVE":
						response = await CartService.RemoveFromCart(args);
						break;
					case "INCREASE":
						response = await CartService.Increase(args);
						break;
					case "DECREASE":
						response = await CartService.Decrease(args);
						break;
					case "SELECT_TO_CHECKOUT":
						response = await CartService.SelectToCheckout(args);
						break;
				}
				return response;
			} catch (error) {
				throw error;
			}
		},
		onSuccess: (response: any) => {
			queryClient.invalidateQueries({ queryKey: ["cart"], exact: true });
			onSuccess && onSuccess({ status: ToastVariant.ADD_TO_CART, message: response });
		},
		onError: (error: any) => {
			console.log(error);

			onError &&
				onError(
					error.response
						? {
							status: "ERROR",
							message: error.response.data.message ?? error.response.data.error,
						}
						: { status: "LOST_CONNECT", message: error.message }
				);
		},
	});

	const onAction: SubmitHandler<any> = async (args: any) => {
		if (
			args.action == "REMOVE" ||
			args.action == "INCREASE" ||
			args.action == "DECREASE" ||
			args.action == "SELECT_TO_CHECKOUT"
		) {
			return debounce(() => mutate(args));
		}
		mutate(args);
	};

	return { onAction, ...rest };
};
