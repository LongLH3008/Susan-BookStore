"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const COLLECTION_NAME = "Blog";
const DOCUMENT_NAME = "Blogs";
const blogSchema = new mongoose_1.default.Schema({
    blog_title: { type: String, required: true },
    blog_content: { type: String, required: true },
    blog_author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    blog_tags: { type: [String], required: true },
    blog_slug: { type: String, required: true, unique: true },
    blog_image: { type: String, required: true },
    blog_views: { type: Number, default: 0 },
    blog_comments: [
        {
            comment_author: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Users",
                required: true,
            },
            comment_content: { type: String, required: true },
            comment_likes: { type: Number, default: 0 },
            likedBy: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users" }],
            comment_createdAt: { type: Date, default: Date.now },
            comment_updatedAt: { type: Date, default: Date.now },
        },
    ],
    viewedBy: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users" }],
}, {
    timestamps: { createdAt: true, updatedAt: true },
    collection: COLLECTION_NAME,
});
const Blog = mongoose_1.default.model(DOCUMENT_NAME, blogSchema);
exports.default = Blog;
