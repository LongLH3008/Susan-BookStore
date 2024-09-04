import mongoose from "mongoose";
import {
  ConflictError,
  ResourceNotFoundError,
  ValidationError,
} from "../cores/error.response";
import Blog from "../models/Blog.model";
import { validate } from "../schemas";
import blogSchema from "../schemas/blog.schema";
import { deleteNullObject } from "../utils";
import { BlogDTO } from "./dtos/Blog.dto";
import { IComment } from "../interfaces/models/IBlog";
class BlogService {
  static async create(data: BlogDTO) {
    try {
      validate(blogSchema, data);
      const foundBlog = await Blog.findOne({ blog_title: data.blog_title });
      if (foundBlog) throw new ConflictError("This blog already exists");

      const newBlog = await Blog.create(data);
      return newBlog;
    } catch (error: any) {
      // Log the error for debugging
      console.error("Error creating blog:", error);
      throw new ValidationError(error.message || "Validation error occurred.");
    }
  }
  static async incrementViews(blogId: string, userId: any) {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new Error("Blog not found");
    }
    if (!blog.viewedBy.includes(userId)) {
      blog.blog_views += 1;
      blog.viewedBy.push(userId);
      await blog.save();
    }
    return blog;
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

  // Add a new comment to a blog
  static async addComment(blogId: string, comment: IComment): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      throw new ValidationError("Invalid blog ID");
    }

    const blog = await Blog.findById(blogId);
    if (!blog) throw new ResourceNotFoundError("Blog not found");

    blog.blog_comments.push(comment);
    await blog.save();

    return blog;
  }

  // Update an existing comment
  static async updateComment(
    blogId: string,
    commentId: string,
    updatedComment: Partial<IComment>
  ): Promise<any> {
    if (
      !mongoose.Types.ObjectId.isValid(blogId) ||
      !mongoose.Types.ObjectId.isValid(commentId)
    ) {
      throw new ValidationError("Invalid blog or comment ID");
    }

    const blog: any = await Blog.findById(blogId);
    if (!blog) throw new ResourceNotFoundError("Blog not found");

    const comment = blog.blog_comments.id(commentId);
    if (!comment) throw new ResourceNotFoundError("Comment not found");

    comment.set(updatedComment);
    await blog.save();

    return blog;
  }

  // Delete a comment
  static async deleteComment(blogId: string, commentId: string): Promise<any> {
    if (
      !mongoose.Types.ObjectId.isValid(blogId) ||
      !mongoose.Types.ObjectId.isValid(commentId)
    ) {
      throw new ValidationError("Invalid blog or comment ID");
    }

    const blog: any = await Blog.findById(blogId);
    if (!blog) throw new ResourceNotFoundError("Blog not found");

    const comment = await blog.blog_comments.id(commentId);
    if (!comment) throw new ResourceNotFoundError("Comment not found");

    blog.blog_comments.pull({ _id: commentId });
    await blog.save();
    return blog;
  }

  // Get all comments for a blog
  static async getComments(blogId: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      throw new ValidationError("Invalid blog ID");
    }

    const blog = await Blog.findById(blogId).select("blog_comments");
    if (!blog) throw new ResourceNotFoundError("Blog not found");
    return blog.blog_comments;
  }

  static async likeComment(
    blogId: string,
    commentId: string,
    userId: string
  ): Promise<any> {
    // Validate blogId, commentId, and userId
    if (
      !mongoose.Types.ObjectId.isValid(blogId) ||
      !mongoose.Types.ObjectId.isValid(commentId)
    ) {
      throw new ValidationError("Invalid blog or comment ID");
    }

    const blog : any = await Blog.findById(blogId);
    if (!blog) throw new ResourceNotFoundError("Blog not found");

    const comment = blog.blog_comments.id(commentId);
    if (!comment) throw new ResourceNotFoundError("Comment not found");

    if (comment.likedBy.includes(userId)) {
      throw new ValidationError("User has already liked this comment");
    }

    comment.comment_likes += 1;
    comment.likedBy.push(userId);

    await blog.save();

    return blog;
  }
}
export default BlogService;
