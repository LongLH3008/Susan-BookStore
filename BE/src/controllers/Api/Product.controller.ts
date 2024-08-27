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
    static async getById(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        return new SuccessResponse({
            message: "get Product successfully",
            metadata: await ProductService.getProductById({ id })
        }).send(res)
    }

    static async searchByFilter(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "search Product successfully",
            metadata: await ProductService.getProductByQuery(req.query)
        }).send(res)
    }
    static async deleteOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        return new SuccessResponse({
            message: "delete Product successfully",
            metadata: await ProductService.deleteProduct({ id })
        }).send(res)
    }
    static async updateOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        return new SuccessResponse({
            message: "update than hcong Product successfully",
            metadata: await ProductService.updateProduct(id, req.body)
        }).send(res)
    }
    static async updateVariation(req: Request, res: Response): Promise<any> {
        const { product_id, variant_id } = req.query
        return new SuccessResponse({
            message: "update than hcong Product successfully",
            metadata: await ProductService.updateVariation(product_id, variant_id, req.body)
        }).send(res)
    }
    static async unActiveProduct(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        return new SuccessResponse({
            message: "unActive Product successfully",
            metadata: await ProductService.unActiveProduct({ id })
        }).send(res)
    }
    static async activeProduct(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        return new SuccessResponse({
            message: "Active Product successfully",
            metadata: await ProductService.activeProduct({ id })
        }).send(res)
    }


}

export default ProductController