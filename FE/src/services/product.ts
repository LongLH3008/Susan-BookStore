import { IProduct } from "@/common/interfaces/product";
import { SendRequest } from "@/config";
import { Book } from "@/schemas/product";

const base_URL = `http://localhost:5000/api/v1/`;

type filter = {
  limit?: number;
  page?: number;
  search?: string;
};
export const fetchProducts = async (arg: filter) => {
  try {
    const params = `?page=${arg.page ?? ""}&limit=${arg.limit ?? ""}`;
    return await SendRequest("GET", `${base_URL}books${params}`);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const fetchProductById = async (id: string) => {
  const response = await SendRequest("GET", `${base_URL}books/${id}`);
  return response;
};
export const deleteProduct = async (id: string) => {
  return await SendRequest("DELETE", `${base_URL}books`, null, id);
};

export const addProduct = async (data: Book) => {
  return await SendRequest("POST", `${base_URL}books`, data);
};
export const editProduct = async (data: Book, id: string) => {
  return await SendRequest("PUT", `${base_URL}books`, data, id);
};
export const fetchCategory = async () => {
  return await SendRequest("GET", `${base_URL}categories`);
};
export const fetchComment = async () => {
  try {
    return await SendRequest("GET", `${base_URL}comments`);
  } catch (error) {
    console.error(`Error fetching comments:`, error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    return await SendRequest("GET", `${base_URL}user`);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
