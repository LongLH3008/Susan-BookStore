import { changePassword, checkOTP, confirmNewPassword, login, logout, register, requestOTP } from "@/services/auth.service";
import { getUserDetail } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { create } from "zustand";
import { ToastVariant } from "../interfaces/toast";
import { Authentication } from "../shared/authentication";

type ForgotPassword = "REQUEST_OTP" | "CHECK_OTP" | "CONFIRM_NEW_PASSWORD";

type useAuth = {
	action: "LOGIN" | "REGISTER" | "LOGOUT" | "CHANGE_PASSWORD" | ForgotPassword;
	onSuccess?: (data?: any) => void;
	onError?: (error?: any) => void;
};

type userState = {
	id: string;
	isActive: string;
	user_role: "user" | "admin" | "";
	AuthorUser: () => void;
	resetState: () => void;
};

export const userState = create<userState>((set) => ({
	id: "",
	isActive: "active",
	user_role: "",
	AuthorUser: async () => {
		const payload = Authentication();
		if (payload) {
			const user = await getUserDetail({ user_id: payload.id });
			console.log(user);
			set({ ...payload, isActive: user.metadata.user_status });
		}
	},
	resetState: () => {
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("accessToken");
		set({ id: "", user_role: "", isActive: 'active' });
	},
}));

export const useAuth = ({ action, onSuccess, onError }: useAuth) => {
	const { mutate, ...rest } = useMutation({
		mutationFn: async (args: any) => {
			try {
				let response;
				switch (action) {
					case "LOGIN":
						response = await login(args);
						break;
					case "REGISTER":
						response = await register(args);
						break;
					case "LOGOUT":
						response = await logout();
						break;
					case "CHANGE_PASSWORD":
						response = await changePassword(args);
						break;
					case "REQUEST_OTP":
						response = await requestOTP(args);
						break;
					case "CHECK_OTP":
						response = await checkOTP(args);
						break;
					case "CONFIRM_NEW_PASSWORD":
						response = await confirmNewPassword(args);
						break;
				}
				return response;
			} catch (error) {
				throw error;
			}
		},
		onSuccess: (response: any) => {
			if (action == "LOGIN") {
				const { accessToken, refreshToken } = response;
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);
			}
			if (action == "LOGOUT") {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
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

	const onSubmit: SubmitHandler<any> = async (args: any) => {
		mutate(args);
	};

	return { onSubmit, ...rest };
};
