import { Response } from "express";
import { Request } from "express-jwt";
import { SuccessResponse } from "../../cores/succes.response";
import BlogService from "../../Services/blog.service";

class blogController {
  static async create(req: Request, res: Response): Promise<any> {
    const blog = await BlogService.create(req.body);
    return new SuccessResponse({
      message: "create blog successfully",
      metadata: blog,
    }).send(res);
  }

  static async getAllBlog(req: Request, res: Response) {
    const blog = await BlogService.getAllBlogs();
    return new SuccessResponse({
      message: "get all blog successfully",
      metadata: blog,
    }).send(res);
  }

  static async getOneBlog(req: Request, res: Response) {
    const id = req.params.id;
    const blog = await BlogService.getBlogById({ id });
    return new SuccessResponse({
      message: "get blog successfully",
      metadata: blog,
    }).send(res);
  }

  static async deleteBlog(req: Request, res: Response) {
    const id = req.params.id;
    const blog = await BlogService.deleteBlog({ id });
    return new SuccessResponse({
      message: "delete blog successfully",
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

export default blogController;
