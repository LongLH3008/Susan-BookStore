import { SendRequest } from "@/config";

const base_URL = `http://localhost:5000/api/v1/`;

type filter = {
  limit?: number;
  page?: number;
  search?: string;
};
export const fetchProducts = async (arg: filter) => {
  try {
    const params = `?page=${arg.page ?? ""}&limit=${
      arg.limit ?? ""
    }&search=${encodeURIComponent(arg.search ?? "")}`;
    return await SendRequest("GET", `${base_URL}products${params}`);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchCategoryById = async (categoryId: string) => {
  try {
    return await SendRequest("GET", `${base_URL}categories/${categoryId}`);
  } catch (error) {
    console.error(`Error fetching category with id ${categoryId}:`, error);
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
