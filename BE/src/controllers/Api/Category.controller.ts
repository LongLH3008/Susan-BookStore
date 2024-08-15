import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/succes.response";
import { CategoryService } from "../../Services/Category.service";

class CategoryController {
    static async create(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "create category successfully",
            metadata: await CategoryService.create(req.body)
        }).send(res)
    }
    static async getOne(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        return new SuccessResponse({
            message: "get category successfully",
            metadata: await CategoryService.getOne({ id })
        }).send(res)
    }
    static async getAll(req: Request, res: Response): Promise<any> {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        return new SuccessResponse({
            message: "get categories successfully",
            metadata: await CategoryService.getAll({ page: +page, limit: +limit })
        }).send(res)
    }
    static async update(req: Request, res: Response): Promise<any> {
        const id = req.params.id

        return new SuccessResponse({
            message: "update category successfully",
            metadata: await CategoryService.update({ id, ...req.body })
        }).send(res)
    }
    static async delete(req: Request, res: Response): Promise<any> {
        const id = req.params.id

        return new SuccessResponse({
            message: "delete category successfully",
            metadata: await CategoryService.delete({ id })
        }).send(res)
    }
    static async active(req: Request, res: Response): Promise<any> {
        const id = req.params.id

        return new SuccessResponse({
            message: "active category successfully",
            metadata: await CategoryService.active({ id })
        }).send(res)
    }
    static async inActive(req: Request, res: Response): Promise<any> {
        const id = req.params.id

        return new SuccessResponse({
            message: "inActive category successfully",
            metadata: await CategoryService.inActive({ id })
        }).send(res)
    }
}
export default CategoryController