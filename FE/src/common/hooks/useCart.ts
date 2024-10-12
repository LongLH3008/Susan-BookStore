import * as CartService from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { ToastVariant } from "../interfaces/toast";
import { debounce } from "../shared/debounce";

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
			onSuccess && onSuccess({ status: ToastVariant.ADD_TO_CART, message: response });
			queryClient.invalidateQueries({ queryKey: ["cart"] });
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
