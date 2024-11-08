import { IBlog } from "@/common/interfaces/blog";
import { SendRequest } from "@/config";

export const getBlogById = async (_id: string) => {
  return await SendRequest("GET", `blog/${_id}`);
};
export const getBlogBySlug = async (slug: string) => {
  return await SendRequest("GET", `blog/by/${slug}`);
};
export const getBlogs = async () => {
  return await SendRequest("GET", `blog`);
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
