import { IProduct } from "@/common/interfaces/product";
import { SendRequest } from "@/config";

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
export const deleteProduct = async (id: string) => {
  try {
    console.log("Gọi API với ID:", id);
    return await SendRequest("DELETE", `${base_URL}products`, null, id);
  } catch (error) {
    console.error("Error delete products:", error);
    throw error;
  }
};

export const addProduct = async (data: IProduct) => {
  try {
    const response = await SendRequest("POST", `${base_URL}products`, data);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error adding product: ${errorMessage}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
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
