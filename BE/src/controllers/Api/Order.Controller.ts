import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/succes.response";
import OrderService from "../../Services/Order.service";

class OrderController {
  static async checkoutReview(req: Request, res: Response): Promise<any> {
    return new SuccessResponse({
      message: "Review added successfully",
      metadata: await OrderService.checkOutReview(req.body),
    }).send(res);
  }

  static async handleCreateOrder(req: Request, res: Response): Promise<any> {
    return new SuccessResponse({
      message: "Review added successfully",
      metadata: await OrderService.handleCreateOrder(req.body),
    }).send(res);
  }

  // search order code
  static async SearchOrderCode(req: Request, res: Response): Promise<any> {
    return new SuccessResponse({
      metadata: await OrderService.SearchOrderCode(req.query),
    }).send(res);
  }

  // listorder client
  static async listOrderClient(req: Request, res: Response): Promise<any> {
    return new SuccessResponse({
      metadata: await OrderService.GetAllOrderWithPaginationAndUser(req.query),
    }).send(res);
  }

  // listorder admin
  static async listOrderAdmin(req: Request, res: Response): Promise<any> {
    return new SuccessResponse({
      metadata: await OrderService.ListOrderPaginateAdmin(req.query),
    }).send(res);
  }
  // detail order
  static async DetailOrder(req: Request, res: Response): Promise<any> {
    return new SuccessResponse({
      metadata: await OrderService.DetailOrder(req.params.id),
    }).send(res);
  }

  // update iscomnent
  static async UpdateIsComment(req: Request, res: Response): Promise<any> {
    return new SuccessResponse({
      metadata: await OrderService.Updateiscomment(req.body.orderId, req.body.bookId, req.body.isComment),
    }).send(res);
  }
}

export default OrderController;
