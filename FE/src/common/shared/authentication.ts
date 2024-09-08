import { jwtDecode } from "jwt-decode";

export const Authentication = () => {
	const accessToken = localStorage.getItem("accessToken");
	console.log(accessToken);

	if (!accessToken) return;
	try {
		const { id, user_role } = jwtDecode<IPayloadAuthToken>(accessToken);
		console.log(id, user_role);
		if (id && user_role) {
			return { id, user_role };
		}
		return false;
	} catch (error) {
		console.error("Invalid token", error);
		return false;
	}
};
