import { Response } from "express";
import { Request } from "express-jwt";
import BlogService from "../../Services/blog.service";
import { SuccessResponse } from "../../cores/succes.response";
import mongoose from "mongoose";
import { ValidationError } from "../../cores/error.response";

class BlogController {
  static async create(req: Request, res: Response): Promise<any> {
    const blog = await BlogService.create(req.body);
    return new SuccessResponse({
      message: "Create blog successfully",
      metadata: blog,
    }).send(res);
  }

  static async getAllBlogs(req: Request, res: Response): Promise<any> {
    const blogs = await BlogService.getAllBlogs();
    return new SuccessResponse({
      message: "Get all blogs successfully",
      metadata: blogs,
    }).send(res);
  }
  static async views(req: Request, res: Response): Promise<any> {
    const userId = req.params.userId;
    const blogId = req.params.blogId;
    // Ensure the blog ID is valid
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      throw new ValidationError("Invalid blog ID");
    }

    const blog = await BlogService.incrementViews(blogId, userId);

    return new SuccessResponse({
      message: "Blog views incremented successfully",
      metadata: blog,
    }).send(res);
  }

  static async getOneBlog(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BlogService.getBlogById({ id });
    return new SuccessResponse({
      message: "Get blog successfully",
      metadata: blog,
    }).send(res);
  }

  static async deleteBlog(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BlogService.deleteBlog({ id });
    return new SuccessResponse({
      message: "Delete blog successfully",
      metadata: blog,
    }).send(res);
  }
  static async updateBlog(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const updatedBlog = await BlogService.updateBlog(id, req.body);
    return new SuccessResponse({
      message: "Update blog successfully",
      metadata: updatedBlog ?? {},
    }).send(res);
  }

  // Add a comment to a blog
  static async addComment(req: Request, res: Response): Promise<any> {
    try {
      const blogId = req.params.blogId;
      const comment = req.body;

      // Validate comment data here if needed
      const updatedBlog = await BlogService.addComment(blogId, comment);

      return new SuccessResponse({
        message: "Comment added successfully",
        metadata: updatedBlog,
      }).send(res);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  // Update an existing comment
  static async updateComment(req: Request, res: Response): Promise<any> {
    try {
      const blogId = req.params.blogId;
      const commentId = req.params.commentId;
      const updatedComment = req.body;

      const updatedBlog = await BlogService.updateComment(
        blogId,
        commentId,
        updatedComment
      );

      return new SuccessResponse({
        message: "Comment updated successfully",
        metadata: updatedBlog,
      }).send(res);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  // Delete a comment
  static async deleteComment(req: Request, res: Response): Promise<any> {
    try {
      const blogId = req.params.blogId;
      const commentId = req.params.commentId;

      const updatedBlog = await BlogService.deleteComment(blogId, commentId);

      return new SuccessResponse({
        message: "Comment deleted successfully",
        metadata: updatedBlog,
      }).send(res);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  // Get all comments for a blog
  static async getComments(req: Request, res: Response): Promise<any> {
    try {
      const blogId = req.params.blogId;

      const comments = await BlogService.getComments(blogId);

      return new SuccessResponse({
        message: "Comments retrieved successfully",
        metadata: comments,
      }).send(res);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async likeComment(req: Request, res: Response): Promise<any> {
    try {
      const {blogId, commentId } = req.params;
      // Check if user exists in request
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }
    const userId = req.user._id;
      const blog = await BlogService.likeComment(blogId, commentId, userId);
      return new SuccessResponse({
        message: "Comment liked successfully",
        metadata: blog,
      }).send(res);
    } catch (error : any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

export default BlogController;
