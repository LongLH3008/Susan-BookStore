import { Response } from "express";
import { Request } from "express-jwt";
import DiscountService from "../../Services/Discount.service";
import { SuccessResponse } from "../../cores/succes.response";

class DiscountController {
    static async create(req: Request, res: Response): Promise<any> {
        const discount = await DiscountService.createDiscount(req.body);
        return new SuccessResponse({
            message: "Discount created successfully",
            metadata: discount,
        }).send(res);
    }

    static async getAll(req: Request, res: Response): Promise<any> {
        const discounts = await DiscountService.getAllDiscounts(req.query);
        return new SuccessResponse({
            message: "Discounts retrieved successfully",
            metadata: discounts,
        }).send(res);
    }

    static async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        const discounts = await DiscountService.getDiscount(id);
        return new SuccessResponse({
            message: "Discounts retrieved successfully",
            metadata: discounts as any,
        }).send(res);
    }

    static async getAllAdmin(req: Request, res: Response): Promise<any> {
        const discounts = await DiscountService.getAllDiscountsAdmin(req.query);
        return new SuccessResponse({
            message: "Discounts retrieved successfully",
            metadata: discounts,
        }).send(res);
    }

    static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const updatedDiscount = await DiscountService.updateDiscount(id, req.body);
        return new SuccessResponse({
            message: "Discount updated successfully",
            metadata: updatedDiscount,
        }).send(res);
    }

    static async delete(req: Request, res: Response): Promise<any> {
        const { code } = req.params;
        const deletedDiscount = await DiscountService.deleteDiscount(code);
        return new SuccessResponse({
            message: "Discount deleted successfully",
            metadata: deletedDiscount || {},
        }).send(res);
    }

    static async getDiscountsByBook(req: Request, res: Response): Promise<any> {
        const { bookId } = req.params;
        const discounts = await DiscountService.getDiscountByBook(bookId);
        return new SuccessResponse({
            message: "Discounts for book retrieved successfully",
            metadata: discounts,
        }).send(res);
    }

    static async activate(req: Request, res: Response): Promise<any> {
        const { code } = req.body;
        const result = await DiscountService.activateDiscount(code);
        return new SuccessResponse({
            message: "Discount activated successfully",
            metadata: result,
        }).send(res);
    }

    static async deactivate(req: Request, res: Response): Promise<any> {
        const { code } = req.body;
        const result = await DiscountService.deactivateDiscount(code);
        return new SuccessResponse({
            message: "Discount deactivated successfully",
            metadata: result,
        }).send(res);
    }

    static async cancelDiscount(req: Request, res: Response): Promise<any> {
        const { code, userId } = req.body;
        const result = await DiscountService.cancelDiscount(code, userId);
        return new SuccessResponse({
            message: "Discount cancelled successfully",
            metadata: result,
        }).send(res);
    }

    static async getDiscountAmount(req: Request, res: Response): Promise<any> {
        const amount = await DiscountService.getDiscountAmount2(req.body);
        return new SuccessResponse({
            message: "Discount amount calculated successfully",
            metadata: amount,
        }).send(res);
    }
}

export default DiscountController;
