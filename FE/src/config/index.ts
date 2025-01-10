import axios from "axios";

export const API = {
  BASE: import.meta.env.VITE_API_URL,
  GOOGLE_CHECKAUTH: import.meta.env.VITE_GOOGLE_CHECK_AUTH,
  GOOGLE_LOGIN: import.meta.env.VITE_GOOGLE_LOGIN,
  GOOGLE_LOGOUT: import.meta.env.VITE_GOOGLE_LOGOUT,
  LOCATION: import.meta.env.API_LOCATION
};

export const instance = axios.create({
  baseURL: `http://localhost:5000/api/v1/`,
  withCredentials: true,
});

export const location = axios.create({
  baseURL: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data`,
  headers: { token: `c5793e8f-688e-11ef-8e53-0a00184fe694` }
})

export const SendRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
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
        result = await instance.put(`${endpoint}${id ? "/" + id : ""}`, data);
        break;
      case "DELETE":
        result = await instance.delete(`${endpoint}${id ? "/" + id : ""}`);
        break;
      case "PATCH":
        result = await instance.patch(`${endpoint}${id ? "/" + id : ""}`, data);
        break;
      default:
        throw new Error("Invalid HTTP method");
    }
    return result.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getLocation = async (arg: { location: 'province' | 'district' | 'ward', parent_id?: number }) => {
  try {
    let result;
    switch (arg.location) {
      case 'province':
        result = await location.get(`/province`);
        break;
      case 'district':
        result = await location.post(`/district`, { province_id: arg.parent_id });
        break;
      case 'ward':
        if (!arg.parent_id) return;
        result = await location.get(`/ward?district_id=${arg.parent_id}`);
        break;
      default:
        throw new Error("Invalid HTTP method");
    }
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const useSWRRequest = async (
  url: string,
  {
    arg,
  }: {
    arg: { method: "GET" | "POST" | "PUT" | "DELETE"; data?: any; id?: any };
  }
) => {
  const { method, data, id } = arg;
  return await SendRequest(method, url, data, id);
};

export const fetcher = async (url: string) => {
  return await SendRequest("GET", url);
};
