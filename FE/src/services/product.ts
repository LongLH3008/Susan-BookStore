import { IProduct } from "@/common/interfaces/product";
import { SendRequest } from "@/config";

type filter = {
  limit?: number;
  page?: number;
  search?: string;
  category_ids?: string;
  sort?:
    | "ascByPrice"
    | "descByPrice"
    | "ascByRating"
    | "descByRating"
    | "ascByTitle"
    | "descByTitle";
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
};
export const fetchProducts = async (arg: filter) => {
  try {
    const params = new URLSearchParams();

    if (arg.page !== undefined) params.append("page", String(arg.page));
    if (arg.limit !== undefined) params.append("limit", String(arg.limit));
    if (arg.search !== undefined) params.append("search", arg.search);
    if (arg.category_ids !== undefined)
      params.append("category_ids", arg.category_ids);
    if (arg.sort !== undefined) params.append("sort", arg.sort);
    if (arg.minPrice !== undefined)
      params.append("minPrice", String(arg.minPrice));
    if (arg.maxPrice !== undefined)
      params.append("maxPrice", String(arg.maxPrice));
    if (arg.minRating !== undefined)
      params.append("minRating", String(arg.minRating));

    return await SendRequest("GET", `/books?${params.toString()}`);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProducttById = async (_id: string) => {
  return await SendRequest("GET", `/books/${_id}`);
};
export const getProducttBySlug = async (slug: string) => {
  return await SendRequest("GET", `/books/slug/${slug}`);
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
