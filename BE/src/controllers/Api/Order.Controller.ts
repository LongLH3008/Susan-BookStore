import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/succes.response";
import OrderService from "../../Services/Order.service";

class OrderController {
    static async checkoutReview(req: Request, res: Response): Promise<any> {

        return new SuccessResponse({
            message: "Review added successfully",
            metadata: await OrderService.checkOutReview(req.body)
        }).send(res);
    }

    static async handleCreateOrder(req: Request, res: Response): Promise<any> {

        return new SuccessResponse({
            message: "Review added successfully",
            metadata: await OrderService.handleCreateOrder(req.body)
        }).send(res);
    }


}

export default OrderController;
