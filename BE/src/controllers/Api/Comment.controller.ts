import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/succes.response";
import CommentService from "../../Services/Comment.service";

class CommentController {
    static async create(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "create Comment successfully",
            metadata: await CommentService.create(req.body)
        }).send(res)
    }
    static async getCommentsByUserId(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        return new SuccessResponse({
            message: "get Comment successfully",
            metadata: await CommentService.getCommentsByUserId({ comment_user_id: id, page: +page, limit: +limit })
        }).send(res)
    }
    static async getCommentsByProductId(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        return new SuccessResponse({
            message: "get categories successfully",
            metadata: await CommentService.getCommentsByProductId({ comment_product_id: id, page: +page, limit: +limit })
        }).send(res)
    }
    static async update(req: Request, res: Response): Promise<any> {
        const id = req.params.id

        return new SuccessResponse({
            message: "update Comment successfully",
            metadata: await CommentService.updateComment({ id, ...req.body })
        }).send(res)
    }
    static async delete(req: Request, res: Response): Promise<any> {
        const id = req.params.id

        return new SuccessResponse({
            message: "delete Comment successfully",
            metadata: await CommentService.deleteComment({ id })
        }).send(res)
    }
}
export default CommentController