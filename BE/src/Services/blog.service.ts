import { ConflictError, ResourceNotFoundError } from "../cores/error.response";
import Blog from "../models/Blog.model";
import { validate } from "../schemas";
import blogSchema from "../schemas/blog.schema";
import { deleteNullObject } from "../utils";
import { BlogDTO } from "./dtos/Blog.dto";


class BlogService {
  static async create(data: BlogDTO) {
    validate(blogSchema, data); // Xác thực dữ liệu
    const foundBlog = await Blog.findOne({ blog_title: data.blog_title });
    if (foundBlog) throw new ConflictError("this blog already exists");
    const newBlog = await Blog.create(data);
    return newBlog;
  }

  static async getAllBlogs() {
    const blogs = await Blog.find({}).lean();
    return blogs;
  }

  static async getBlogById({ id }: { id: string }) {
    const blog = await Blog.findOne({ _id: id });
    if (!blog) throw new ResourceNotFoundError("this blog not found");
    return blog;
  }

  static async deleteBlog({ id }: { id: string }) {
    const blog = await Blog.findByIdAndDelete({ _id: id });
    if (!blog) throw new ResourceNotFoundError("this blog not found");
    return blog;
  }

  static async updateBlog(id: string, data: Partial<BlogDTO>) {
    const updateObject = deleteNullObject(data);
    const foundBlog = await Blog.findOne({ _id: id });
    if (!foundBlog) throw new ResourceNotFoundError("this blog not found");
    const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, updateObject, {
      new: true,
    });
    return updatedBlog;
  }
}
export default BlogService;