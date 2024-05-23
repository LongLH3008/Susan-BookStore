import { Request, Response } from "express";
import OrderService from "../../Services/Order.service";
import { SuccessResponse } from "../../cores/succes.response";

class OrderController {
  static async create(req: Request, res: Response): Promise<any> {
    try {
      const order = await OrderService.create(req.body);
      return new SuccessResponse({
        message: "Create Order successfully",
        metadata: order,
      }).send(res);
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error",
        stack: error.stack,
      });
    }
  }

  static async getOrderById(req: Request, res: Response) {
    const id = req.params.id;
    const order = await OrderService.getOrderById({ id });
    return new SuccessResponse({
      message: "get order successfully",
      metadata: order,
    }).send(res);
  }

  static async getAllOrder(req: Request, res: Response) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const order = await OrderService.getAllOrders({
      page: +page,
      limit: +limit,
    });
    return new SuccessResponse({
      message: "get all order successfully",
      metadata: order,
    }).send(res);
  }

  static async updateOrder(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const order = await OrderService.updateOrder({ id, updateData });
      return new SuccessResponse({
        message: "Update order successfully",
        metadata: order,
      }).send(res);
    } catch (error: any) {
      console.error("Error updating order:", error);
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error",
        stack: error.stack,
      });
    }
  }
  static async deleteOrder(req: Request, res: Response) {
    const id = req.params.id;
    const order = await OrderService.deleteOrder({ id });
    return new SuccessResponse({
      message: "delete order successfully",
      metadata: order,
    }).send(res);
  }
}

export default OrderController;
