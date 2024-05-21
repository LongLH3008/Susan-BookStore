import { ConflictError, ResourceNotFoundError } from "../cores/error.response";
import Blog from "../models/Blog.model";
import { validate } from "../schemas";
import blogSchema from "../schemas/blog.schema";
import { deleteNullObject } from "../utils";

class BlogService {
  static async create({
    blog_title,
    blog_content,
    blog_author,
    blog_tags = [],
  }: any) {
    // validate(blogSchema, { blog_title, blog_content, blog_author, blog_tags });
    const foundBlog = await Blog.findOne({ blog_title });
    if (foundBlog) throw new ConflictError("this blog already exists");
    const newBlog = await Blog.create({
      blog_title,
      blog_content,
      blog_author,
      blog_tags,
    });
    return newBlog;
  }

  static async getAllBlogs() {
    const blogs = await Blog.find({}).lean();
    return blogs;
  }

  static async getBlogById({ id }: { id: string }) {
    const blogs = await Blog.findOne({ _id: id });
    if (!blogs) throw new ResourceNotFoundError("this blog not found");
    return blogs;
  }

  static async deleteBlog({ id }: { id: string }) {
    const blog = await Blog.findByIdAndDelete({ _id: id });
    if (!blog) throw new ResourceNotFoundError("this blog not found");
    return blog;
  }

  static async updateBlog(id: string, data: any) {
    const updateObject = deleteNullObject(data);
    const foundBlog = await Blog.findOne({ _id: id });
    if (!foundBlog) throw new ResourceNotFoundError("this blog not found");
    const updateBlog = await Blog.findOneAndUpdate({ _id: id }, updateObject, {
      new: true,
    });
    return updateBlog;
  }
}
export default BlogService;
