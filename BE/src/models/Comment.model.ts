import mongoose from "mongoose"
import { IComment } from "../interfaces/models/IComment";

const COLLECTION_NAME = "Comment";
const DOCUMENT_NAME = "Comments";

export interface ICommentModel extends IComment, mongoose.Document { }

const CommentSchema = new mongoose.Schema<ICommentModel>(
    {
        comment_product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        comment_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comment_parent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments",
            default: null,
        },
        comment_content: {
            type: String,
            required: true,
        },
        comment_like_number: {
            type: Number,
            default: 0,
        },

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const Comment = mongoose.model<ICommentModel>(DOCUMENT_NAME, CommentSchema);
export default Comment
