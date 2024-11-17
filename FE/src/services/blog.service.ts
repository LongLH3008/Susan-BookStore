import { IBlog } from "@/common/interfaces/blog";
import { SendRequest } from "@/config";

type filter = {
  limit?: number;
  page?: number;
  search?: string;
};

export const getBlogById = async (_id: string) => {
  return await SendRequest("GET", `blog/${_id}`);
};
export const getBlogBySlug = async (slug: string) => {
  return await SendRequest("GET", `blog/by/${slug}`);
};
export const getBlogs = async (arg: filter) => {
  const params = new URLSearchParams();

  if (arg.page !== undefined) params.append("page", String(arg.page));
  if (arg.limit !== undefined) params.append("limit", String(arg.limit));
  if (arg.search !== undefined) params.append("search", arg.search);
  return await SendRequest("GET", `/blog?${params.toString()}`);
};

export const deleteBlog = async (id: string) => {
  console.log(id);

  return await SendRequest("DELETE", `blog/${id}`);
};

export const createBlog = async (blog: IBlog) => {
  const response = await SendRequest("POST", `blog/add`, blog);
  return response;
};

export const updateBlog = async (blog: IBlog, id: string) => {
  console.log("id", id);
  const response = await SendRequest("PUT", `blog/update/${id}`, blog);
  return response;
};
