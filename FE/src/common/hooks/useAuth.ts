import { checkOTP, confirmNewPassword, login, register, requestOTP } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { SubmitHandler } from "react-hook-form";
import { create } from "zustand";
import { getCookie } from "../shared/cookie";
import { Authentication } from "../shared/authentication";

type ForgotPassword = "REQUEST_OTP" | "CHECK_OTP" | "CONFIRM_NEW_PASSWORD";

type useAuth = {
	action: "LOGIN" | "REGISTER" | "LOGOUT" | "CHANGE_PASSWORD" | ForgotPassword;
	onSuccess?: (data?: any) => void;
	onError?: (error?: any) => void;
};

type userState = {
	id: string;
	user_role: "user" | "admin" | "";
	AuthorUser: () => void;
	resetState: () => void;
};

export const userState = create<userState>((set) => ({
	id: "",
	user_role: "",
	AuthorUser: () => {
		const payload = Authentication();
		if (payload) {
			set({ ...payload });
		}
	},
	resetState: () => {
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("accessToken");
		set({ id: "", user_role: "" });
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
						break;
					case "CHANGE_PASSWORD":
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
				localStorage.remove("accessToken");
				localStorage.remove("refreshToken");
			}
			onSuccess && onSuccess({ status: "SUCCESS", message: response });
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

	const onSubmit: SubmitHandler<any> = async (args: any) => {
		mutate(args);
	};

	return { onSubmit, ...rest };
};
