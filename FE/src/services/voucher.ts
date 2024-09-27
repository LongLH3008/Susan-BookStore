import { ToastVariant } from "@/common/interfaces/toast";
import { IVoucher } from "@/common/interfaces/voucher";
import { SendRequest } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

export const getAllVoucher = async () => {
	return await SendRequest("GET", "discounts");
};

const createVoucher = async (arg: IVoucher) => {
	return await SendRequest("POST", "discounts", arg);
};

export const getBookVoucher = async (bookID: string) => {
	return await SendRequest("GET", "discounts/book/" + bookID);
};

const removeVoucher = async (code: string) => {
	return await SendRequest("DELETE", "discounts/" + code);
};

const updateVoucher = async (arg: IVoucher) => {
	return await SendRequest("PUT", "discounts/" + arg._id, arg);
};

const activateVoucher = async (code: string) => {
	return await SendRequest("POST", "discounts/activate", { code });
};

const deactivateVoucher = async (code: string) => {
	return await SendRequest("POST", "discounts/deactivate", { code });
};

const deactiveVoucherForUser = async (arg: { code: string; userId: string }) => {
	return await SendRequest("POST", "discount/cancel", arg);
};

type voucherService = {
	action: "GET" | "CREATE" | "UPDATE" | "REMOVE";
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
				}
				return response;
			} catch (error) {
				throw error;
			}
		},
		onSuccess: (response: any) => {
			if (action == "CREATE" || action == "UPDATE" || action == "REMOVE") {
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
