"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const categorySchema = joi_1.default.object({
    category_name: joi_1.default.string().required().messages({
        "string.empty": "Tên danh mục là bắt buộc",
        "any.required": "Trường 'Tên danh mục' là bắt buộc",
    }),
    category_thumb: joi_1.default.string().required().messages({
        "string.empty": "Ảnh đại diện danh mục là bắt buộc",
        "any.required": "Trường 'Ảnh đại diện danh mục' là bắt buộc",
    }),
    is_active: joi_1.default.boolean(),
});
exports.default = categorySchema;
