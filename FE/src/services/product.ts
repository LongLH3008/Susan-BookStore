import { IProduct } from "@/common/interfaces/product";
import { SendRequest } from "@/config";

type filter = {
  limit?: number;
  page?: number;
  search?: string;
};
export const fetchProducts = async (arg: filter) => {
  try {
    const params = `?page=${arg.page ?? ""}&limit=${arg.limit ?? ""}`;
    return await SendRequest("GET", `/books${params}`);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const getProducttById = async (_id: string) => {
  return await SendRequest("GET", `/books/${_id}`);
};

export const deleteProduct = async (id: string) => {
  try {
    console.log("Gọi API với ID:", id);
    return await SendRequest("DELETE", `/books`, null, id);
  } catch (error) {
    console.error("Error delete products:", error);
    throw error;
  }
};

export const addProduct = async (data: IProduct) => {
  try {
    const response = await SendRequest("POST", `/books`, data);
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
    return await SendRequest("GET", `/comments`);
  } catch (error) {
    console.error(`Error fetching comments:`, error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    return await SendRequest("GET", `/user`);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
