import axios from "axios";

export const API = {
	BASE: import.meta.env.VITE_API_URL,
	GOOGLE_CHECKAUTH: import.meta.env.VITE_GOOGLE_CHECK_AUTH,
	GOOGLE_LOGIN: import.meta.env.VITE_GOOGLE_LOGIN,
	GOOGLE_LOGOUT: import.meta.env.VITE_GOOGLE_LOGOUT,
};

export const instance = axios.create({
	baseURL: `${API.BASE}`,
	withCredentials: true,
});

export const SendRequest = async (
	method: "GET" | "POST" | "PUT" | "DELETE",
	endpoint: string,
	data?: any,
	id?: any
) => {
	try {
		let result;
		switch (method) {
			case "GET":
				result = await instance.get(endpoint);
				break;
			case "POST":
				result = await instance.post(endpoint, data);
				break;
			case "PUT":
				result = await instance.put(`${endpoint}/${id}`, data);
				break;
			case "DELETE":
				result = await instance.delete(`${endpoint}/${id}`);
				break;
			default:
				throw new Error("Invalid HTTP method");
		}
		console.log(result);
		return result.data;
	} catch (error: any) {
		console.log(error);
		throw error;
	}
};

export const useSWRRequest = async (
	url: string,
	{ arg }: { arg: { method: "GET" | "POST" | "PUT" | "DELETE"; data?: any; id?: any } }
) => {
	const { method, data, id } = arg;
	return await SendRequest(method, url, data, id);
};

export const fetcher = async (url: string) => {
	return await SendRequest("GET", url);
};
