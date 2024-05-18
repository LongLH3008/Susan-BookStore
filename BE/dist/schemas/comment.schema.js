"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const commentSchema = joi_1.default.object({
    comment_product_id: joi_1.default.string().required().messages({
        "string.empty": "Sản phẩm được bình luận là bắt buộc",
        "any.required": "Trường 'Sản phẩm được bình luận' là bắt buộc",
    }),
    comment_user_id: joi_1.default.string().required().messages({
        "string.empty": "Người dùng bình luận là bắt buộc",
        "any.required": "Trường 'Người dùng bình luận' là bắt buộc",
    }),
    comment_content: joi_1.default.string().required().messages({
        "string.empty": "Nội dung bình luận là bắt buộc",
        "any.required": "Trường 'Nội dung bình luận' là bắt buộc",
    }),
    comment_like_number: joi_1.default.number().min(0).default(0).messages({
        "number.base": "Số lượt thích phải là một số",
        "number.min": "Số lượt thích phải lớn hơn hoặc bằng 0",
    }),
});
exports.default = commentSchema;
