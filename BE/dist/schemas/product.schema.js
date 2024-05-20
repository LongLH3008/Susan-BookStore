"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const productSchema = joi_1.default.object({
    product_name: joi_1.default.string().required().messages({
        "string.empty": "Tên sản phẩm là bắt buộc",
        "any.required": "Trường 'Tên sản phẩm' là bắt buộc",
    }),
    product_thumb: joi_1.default.string().required().messages({
        "string.empty": "Ảnh đại diện sản phẩm là bắt buộc",
        "any.required": "Trường 'Ảnh đại diện sản phẩm' là bắt buộc",
    }),
    product_description: joi_1.default.string().required().messages({
        "string.empty": "Mô tả sản phẩm là bắt buộc",
        "any.required": "Trường 'Mô tả sản phẩm' là bắt buộc",
    }),
    product_variations: joi_1.default.array().required().messages({
        "any.required": "Phân loại sản phẩm là bắt buộc",
    }),
    product_categories: joi_1.default.array().required().messages({
        "string.empty": "Loại sản phẩm là bắt buộc",
        "any.required": "Trường 'Loại sản phẩm' là bắt buộc",
    }),
    product_price: joi_1.default.number().required().messages({
        "string.empty": "Giá sản phẩm là bắt buộc",
        "any.required": "Trường 'Giá sản phẩm' là bắt buộc",
    }),
    product_images: joi_1.default.array().items(joi_1.default.object({
        image_id: joi_1.default.string().allow(null, ""),
        image_url: joi_1.default.string().required().messages({
            "string.empty": "URL ảnh sản phẩm là bắt buộc",
            "any.required": "Trường 'URL ảnh sản phẩm' là bắt buộc",
        }),
    })),
    product_attributes: joi_1.default.object(),
});
exports.default = productSchema;
