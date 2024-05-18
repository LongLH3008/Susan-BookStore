"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const blogSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.empty": "Tiêu đề bài viết là bắt buộc",
        "any.required": "Trường 'Tiêu đề bài viết' là bắt buộc",
    }),
    content: joi_1.default.string().required().messages({
        "string.empty": "Nội dung bài viết là bắt buộc",
        "any.required": "Trường 'Nội dung bài viết' là bắt buộc",
    }),
    author: joi_1.default.string().required().messages({
        "string.empty": "Tác giả là bắt buộc",
        "any.required": "Trường 'Tác giả' là bắt buộc",
    }),
    tags: joi_1.default.array().items(joi_1.default.string()).required().messages({
        "any.required": "Nhãn bài viết là bắt buộc",
    }),
});
exports.default = blogSchema;
