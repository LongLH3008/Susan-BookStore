import { SendRequest } from "@/config";

export const getBlogById = async (_id: string) => {
  return await SendRequest("GET", `blog/${_id}`);
};

export const getBlogs = async () => {
  return await SendRequest("GET", `blog`);
};
export const deleteBlog = async (id: string) => {
  return await SendRequest("DELETE", `blog/`, id);
};
