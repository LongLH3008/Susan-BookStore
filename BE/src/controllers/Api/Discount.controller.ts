import { Response } from "express";
import { Request } from "express-jwt";
import { SuccessResponse } from "../../cores/succes.response";
import DiscountService from "../../Services/Discount.service";


class DiscountController {
    static async create(req: Request, res: Response): Promise<any> {
        const Discount = await DiscountService.createDiscount(req.body);
        return new SuccessResponse({
            message: "create Discount successfully",
            metadata: Discount,
        }).send(res);
    }
    static async getAll(req: Request, res: Response): Promise<any> {
        const Discount = await DiscountService.getAll(req.query);
        return new SuccessResponse({
            message: "create Discount successfully",
            metadata: Discount,
        }).send(res);
    }
    static async getDiscountsByProductId(req: Request, res: Response): Promise<any> {
        const Discount = await DiscountService.getDiscountByProduct(req.params);
        return new SuccessResponse({
            message: "get Discounts successfully",
            metadata: Discount,
        }).send(res);
    }
    static async getAllProductsWithDiscountCode(req: Request, res: Response): Promise<any> {
        const { code } = req.params
        const Discount = await DiscountService.getAllDiscountCodesWithProduct({ code, ...req.query });
        return new SuccessResponse({
            message: "get Products successfully",
            metadata: Discount,
        }).send(res);
    }
    static async active(req: Request, res: Response): Promise<any> {
        const Discount = await DiscountService.activeDiscount(req.body);
        return new SuccessResponse({
            message: "active Discount successfully",
            metadata: Discount,
        }).send(res);
    }
    static async inActive(req: Request, res: Response): Promise<any> {
        const Discount = await DiscountService.inActiveDiscount(req.body);
        return new SuccessResponse({
            message: "inActive Discount successfully",
            metadata: Discount,
        }).send(res);
    }
    static async cancelDiscount(req: Request, res: Response): Promise<any> {
        const Discount = await DiscountService.inActiveDiscount(req.body);
        return new SuccessResponse({
            message: "cancel Discount successfully",
            metadata: Discount,
        }).send(res);
    }




}

export default DiscountController;
