import mongoose from "mongoose"

export interface IComment {
    comment_product_id: mongoose.Schema.Types.ObjectId | string
    comment_user_id: mongoose.Schema.Types.ObjectId | string
    comment_parent_id: mongoose.Schema.Types.ObjectId | null
    comment_content: string
    comment_like_number: number
    createAt: Date | string
    updateAt: Date | string

}