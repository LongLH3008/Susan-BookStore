"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const COLLECTION_NAME = "Cart";
const DOCUMENT_NAME = "Carts";
const blogSchema = new mongoose_1.default.Schema({
    blog_title: { type: String, required: true },
    blog_content: { type: String, required: true },
    blog_author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users", required: true },
    blog_tags: { type: [String], required: true },
}, {
    timestamps: { updatedAt: true },
    collection: COLLECTION_NAME
});
const Blog = mongoose_1.default.model(DOCUMENT_NAME, blogSchema);
exports.default = Blog;
