import { ConflictError, ResourceNotFoundError } from "../cores/error.response"
import Comment from "../models/Comment.model"
import Product from "../models/Product.model"
import User from "../models/User.model"
import { validate } from "../schemas"
import commentSchema from "../schemas/comment.schema"

class CommentService {
    static async create({ comment_user_id, comment_product_id, comment_content, comment_rating }:
        { comment_user_id: string, comment_product_id: string, comment_content: string, comment_rating: number }) {

        validate(commentSchema, { comment_user_id, comment_product_id, comment_content, comment_rating })

        const foundProduct = await Product.findOne({ _id: comment_product_id })
        if (!foundProduct) throw new ResourceNotFoundError("this product not found")

        const foundUser = await User.findOne({ _id: comment_user_id })
        if (!foundUser) throw new ResourceNotFoundError("this user not found")

        const foundComment = await Comment.findOne({ comment_user_id, comment_product_id })
        if (foundComment) throw new ConflictError("You have already comment")

        const newComment = await Comment.create({ comment_user_id, comment_product_id, comment_content, comment_rating })
        return newComment

    }
    static async getCommentsByUserId({ comment_user_id, page, limit }:
        { comment_user_id: string, page: number, limit: number }) {
        const skip = (page - 1) * limit
        const foundUser = await User.findOne({ _id: comment_user_id })
        if (!foundUser) throw new ResourceNotFoundError("this user not found")
        const comments = await Comment.find({ comment_user_id }).skip(skip).limit(limit).lean()
        return comments
    }
    static async getCommentsByProductId({ comment_product_id, page, limit }:
        { comment_product_id: string, page: number, limit: number }) {
        const skip = (page - 1) * limit

        const foundProduct = await Product.findOne({ _id: comment_product_id })
        if (!foundProduct) throw new ResourceNotFoundError("this product not found")
        const comments = await Comment.find({ comment_product_id }).skip(skip).limit(limit).lean()
        return comments
    }
    static async updateComment({ id, comment_content, comment_rating }:
        { id: string, comment_content: string, comment_rating: number }) {

        const foundComment = await Comment.findOne({ _id: id })
        if (!foundComment) throw new ResourceNotFoundError("this comment not found")


        if (comment_content) foundComment.comment_content = comment_content
        if (comment_rating) foundComment.comment_rating = comment_rating
        await foundComment.save()
        return foundComment
    }
    static async deleteComment({ id }: { id: string }) {
        const foundComment = await Comment.findOne({ _id: id })
        if (!foundComment) throw new ResourceNotFoundError("this comment not found")

        return await Comment.deleteOne({ _id: id })
    }

}

export default CommentService