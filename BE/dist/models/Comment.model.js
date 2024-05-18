"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const COLLECTION_NAME = "Comment";
const DOCUMENT_NAME = "Comments";
const CommentSchema = new mongoose_1.default.Schema({
    comment_product_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    comment_user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment_parent_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
const Comment = mongoose_1.default.model(DOCUMENT_NAME, CommentSchema);
exports.default = Comment;
