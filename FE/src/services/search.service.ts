import { SendRequest } from "@/config";

type filter = {
  limit?: number;
  page?: number;
};
export const getKeywords = async (data: any) => {
  return await SendRequest("POST", `search`, data);
};

export const getBooksByKeyword = async (data: any, arg: filter) => {
  const params = new URLSearchParams();

  if (arg.page !== undefined) params.append("page", String(arg.page));
  if (arg.limit !== undefined) params.append("limit", String(arg.limit));
  return await SendRequest("POST", `searchbook?${params.toString()}`, data);
};
