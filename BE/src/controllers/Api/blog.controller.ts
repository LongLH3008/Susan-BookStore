import { Response } from "express";
import { Request } from "express-jwt";
import BlogService from "../../Services/blog.service";
import { SuccessResponse } from "../../cores/succes.response";

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
}

export default BlogController;