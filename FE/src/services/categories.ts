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
  const params = `?page=${arg.page ?? ""}&limit=${
    arg.limit ?? ""
  }&search=${encodeURIComponent(arg.search ?? "")}`;
  return await SendRequest("GET", `categories/${params}`);
};
export const deleteCategory = async (id: string) => {
  console.log("Gọi API với ID:", id);
  return await SendRequest("DELETE", `categories`, null, id);
};
export const inactivect = async (categories: any) => {
  console.log(categories);
  const response = await SendRequest(
    "PATCH",
    `categories`,
    {
      is_active: categories.is_active,
    },
    categories.id + "/inactive"
  );
  return response;
};
export const active = async (categories: any) => {
  console.log(categories);
  const response = await SendRequest(
    "PATCH",
    `categories`,
    {
      is_active: categories.is_active,
    },
    categories.id + "/active"
  );
  return response;
};
export const updateCategory = async (categories: any) => {
  console.log(categories);
  const response = await SendRequest(
    "PATCH",
    `categories`,
    categories,
    categories.id
  );
  return response;
};
export const createCategory = async (categories: any) => {
  console.log(categories);
  const response = await SendRequest("POST", `categories`, categories);
  return response;
};
