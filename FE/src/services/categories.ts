import { SendRequest } from "@/config";

type filter = {
  limit?: number;
  page?: number;
  search?: string;
};
export const getCategoryById = async (_id: string) => {
  return await SendRequest("GET", `categories/${_id}`);
};

export const getCategories = async (arg: filter) => {
  const params = `?page=${arg.page ?? ""}&limit=${arg.limit ?? ""}`;
  return await SendRequest("GET", `categories/${params}`);
};
