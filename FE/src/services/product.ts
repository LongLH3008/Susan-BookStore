import { SendRequest } from "@/config";
const base_URL = `http://localhost:5000/api/v1/`;
export const fetchProducts = async (
  limit: number,
  page: number,
  search: string
) => {
  try {
    const params = `?limit=${limit}&page=${page}&search=${encodeURIComponent(
      search
    )}`;
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
