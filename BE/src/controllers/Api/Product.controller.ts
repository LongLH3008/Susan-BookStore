import ProductService from "../../Services/Product.service";
import { SuccessResponse } from "../../cores/succes.response";
import { Request, Response } from "express";

class ProductController {

    static async create(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "create Product successfully",
            metadata: await ProductService.create(req.body)
        }).send(res)
    }
    static async getByQuery(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "get Products successfully",
            metadata: await ProductService.getProductByQuery(req.query)
        }).send(res)
    }

    static async searchByFilter(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "create Product successfully",
            metadata: await ProductService.getProductByQuery(req.query)
        }).send(res)
    }

}

export default ProductController