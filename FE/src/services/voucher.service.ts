import { ToastVariant } from "@/common/interfaces/toast";
import { IVoucher } from "@/common/interfaces/voucher";
import { SendRequest } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

export const getAllVoucher = async () => {
	return await SendRequest("GET", "discounts");
};

export const getAllVoucherAdmin = async () => {
	return await SendRequest("GET", "discounts/admin");
};

const createVoucher = async (arg: IVoucher) => {
	console.log(arg);
	return await SendRequest("POST", "discounts", arg);
};

export const getDetailVoucher = async (code: string) => {
	return await SendRequest("GET", "discount/" + code);
};

const removeVoucher = async (code: string) => {
	return await SendRequest("DELETE", "discounts/" + code);
};

const updateVoucher = async (arg: IVoucher) => {
	let payload: Record<string, any> = { ...arg };
	delete payload['_id']
	return await SendRequest("PUT", "discounts/" + arg._id, payload);
};

const activateVoucher = async (code: string) => {
	return await SendRequest("POST", "discounts/activate", { code });
};

const deactivateVoucher = async (code: string) => {
	return await SendRequest("POST", "discounts/deactivate", { code });
};


type voucherService = {
	action: "GET" | "CREATE" | "UPDATE" | "REMOVE" | "ACTIVE" | "UNACTIVE";
	onSuccess?: (data?: any) => void;
	onError?: (error?: any) => void;
};

export const voucherService = ({ action, onSuccess, onError }: voucherService) => {
	const queryClient = useQueryClient();
	const { mutate, ...rest } = useMutation({
		mutationFn: async (args?: any) => {
			try {
				let response;
				switch (action) {
					case "GET":
						response = await getAllVoucher();
						break;
					case "CREATE":
						response = await createVoucher(args);
						break;
					case "UPDATE":
						response = await updateVoucher(args);
						break;
					case "REMOVE":
						response = await removeVoucher(args);
						break;
					case "ACTIVE":
						response = await activateVoucher(args);
						break;
					case "UNACTIVE":
						response = await deactivateVoucher(args);
						break
				}
				return response;
			} catch (error) {
				throw error;
			}
		},
		onSuccess: (response: any) => {
			if (action !== "GET") {
				queryClient.invalidateQueries({ queryKey: ["voucher_list"] });
			}
			onSuccess && onSuccess({ status: ToastVariant.SUCCESS, message: response });
		},
		onError: (error: any) => {
			console.log(error);

			onError &&
				onError(
					error.response
						? {
							status: ToastVariant.ERROR,
							message: error.response.data.message ?? error.response.data.error,
						}
						: { status: ToastVariant.LOST_CONNECT, message: "Lỗi kết nối máy chủ" }
				);
		},
	});

	const onAction: SubmitHandler<any> = async (args?: any) => {
		mutate(args);
	};

	return { onAction, ...rest };
};
