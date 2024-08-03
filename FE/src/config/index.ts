import axios from "axios";

export const API = {
	BASE: import.meta.env.VITE_API_URL,

	GOOGLE_CHECKAUTH: import.meta.env.VITE_GOOGLE_CHECK_AUTH,
	GOOGLE_LOGIN: import.meta.env.VITE_GOOGLE_LOGIN,
	GOOGLE_LOGOUT: import.meta.env.VITE_GOOGLE_LOGOUT,

	USER: import.meta.env.VITE_USER,
	USER_DETAIL: (id: string | number) => `${import.meta.env.VITE_USER}/${id}`,

	LOGIN: import.meta.env.VITE_LOGIN,
	REGISTER: import.meta.env.VITE_REGISTER,
	FORGOT_PW: import.meta.env.VITE_FORGOTPW,
	CHANGE_PW: import.meta.env.VITE_CHANGEPW,

	CATEGORIES: import.meta.env.VITE_CATEGORIES,
	CATEGORIES_DETAIL: (id: string | number) => `${import.meta.env.VITE_CATEGORIES}/${id}`,

	COMMENT: import.meta.env.VITE_COMMENT,
	COMMENT_PRODUCT: (idProduct: string | number) => `${import.meta.env.VITE_COMMENT}/${idProduct}`,

	PRODUCT: import.meta.env.VITE_PRODUCT,
	PRODUCT_DETAIL: (id: string | number) => `${import.meta.env.VITE_PRODUCT}/${id}`,

	BLOG: import.meta.env.VITE_BLOG,
	BLOG_DETAIL: (id: string | number) => `${import.meta.env.VITE_BLOG}/${id}`,

	ORDER_DETAIL: (id: string | number) => `${import.meta.env.VITE_ORDERS}/${id}`,

	CART_DETAIL: (id: string | number) => `${import.meta.env.VITE_CART}/${id}`,
	CART_INCRE: (idUser: string | number, idProduct: string | number) =>
		`${import.meta.env.VITE_CART_INCRE}/${idUser}/${idProduct}`,
	CART_DECRE: (idUser: string | number, idProduct: string | number) =>
		`${import.meta.env.VITE_CART_DECRE}/${idUser}/${idProduct}`,
};

const instance = axios.create({
	baseURL: `${API.BASE}`,
});

export const request = async (method: "GET" | "POST" | "PUT" | "DELETE", endpoint: string, data?: any, id?: any) => {
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
	return await request(method, url, data, id);
};

export const fetcher = async (url: string) => {
	return await request("GET", url);
};
