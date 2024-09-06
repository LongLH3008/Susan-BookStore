import BookService from "../../Services/Book.service";
import { SuccessResponse } from "../../cores/succes.response";
import { Request, Response } from "express";

class BookController {
  static async create(req: Request, res: Response): Promise<any> {
    return new SuccessResponse({
      message: "Create book successfully",
      metadata: await BookService.create(req.body)
    }).send(res);
  }

  static async getAllBooks(req: Request, res: Response): Promise<any> {
    const { page = 1, limit = 10 } = req.query;
    return new SuccessResponse({
      message: "Get books successfully",
      metadata: await BookService.getAllBooks({ page: Number(page), limit: Number(limit) })
    }).send(res);
  }

  static async getByQuery(req: Request, res: Response): Promise<any> {
    return new SuccessResponse({
      message: "Get books successfully",
      metadata: await BookService.getBookByQuery(req.query)
    }).send(res);
  }

  static async getById(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    return new SuccessResponse({
      message: "Get book successfully",
      metadata: await BookService.getBookById(id)
    }).send(res);
  }

  static async updateOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    return new SuccessResponse({
      message: "Update book successfully",
      metadata: await BookService.updateBook(id, req.body)
    }).send(res);
  }

  static async deleteOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    return new SuccessResponse({
      message: "Delete book successfully",
      metadata: await BookService.deleteBook(id)
    }).send(res);
  }

  static async unActiveBook(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    return new SuccessResponse({
      message: "Deactivate book successfully",
      metadata: await BookService.unActiveBook(id)
    }).send(res);
  }

  static async activeBook(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    return new SuccessResponse({
      message: "Activate book successfully",
      metadata: await BookService.activeBook(id)
    }).send(res);
  }

  static async setDiscountByCategoryId(req: Request, res: Response): Promise<any> {
    const { category_id } = req.params;
    const { discount } = req.body;
    return new SuccessResponse({
      message: "Set discount for category successfully",
      metadata: await BookService.setDiscountByCategoryId(category_id, discount)
    }).send(res);
  }

  static async setDiscountToAll(req: Request, res: Response): Promise<any> {
    const { discount } = req.body;
    return new SuccessResponse({
      message: "Set discount for all books successfully",
      metadata: await BookService.setDiscountToAll(discount)
    }).send(res);
  }

  static async setDiscountByBookId(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { discount } = req.body;
    return new SuccessResponse({
      message: "Set discount for book successfully",
      metadata: await BookService.setDiscountByBookId(id, discount)
    }).send(res);
  }

  static async updateSoldNumber(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { quantity } = req.body;
    return new SuccessResponse({
      message: "Update sold number successfully",
      metadata: await BookService.updateSoldNumber(id, quantity)
    }).send(res);
  }

  
}

export default BookController;
