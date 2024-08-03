import useSWRMutation from "swr/mutation";
import { useToast } from "../common/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { API, useSWRRequest } from "../config";

export const login = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	return useSWRMutation("auth/login", useSWRRequest, {
		onSuccess: (data) => {
			navigate("/");
			toast("default", data.message, 4000);
		},
		onError: (error: any) => {
			if (error.code == "ERR_NETWORK") {
				toast("lostconnect", "Lost connection. Please try again later !");
			} else {
				toast("error", error.response.data.error);
			}
		},
	});
};

export const register = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	return useSWRMutation("auth/register", useSWRRequest, {
		onSuccess: () => {
			navigate("/login");
			toast("success", "Register successfully", 4000);
		},
		onError: (error: any) => {
			if (error.code == "ERR_NETWORK") {
				toast("lostconnect", "Lost connection. Please try again later !");
			} else {
				toast("error", error.response.data.error);
			}
		},
	});
};

const checkAuthentication = async () => {
	if ((window.location.href = "https://accounts.google.com")) console.log("aaa");
};

export const loginByGoogle = () => {
	setTimeout(() => {
		window.addEventListener("onload", checkAuthentication);
	}, 500);
	window.location.href = `${API.GOOGLE_LOGIN}`;
};
