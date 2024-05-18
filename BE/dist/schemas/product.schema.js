"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const productSchema = joi_1.default.object({
    product_name: joi_1.default.string().required().messages({
        "string.empty": "Tên sản phẩm không được để trống",
        "any.required": 'Trường "Tên sản phẩm" là bắt buộc',
    }),
    product_thumb: joi_1.default.string().required().messages({
        "string.empty": "Ảnh đại diện không được để trống",
        "any.required": 'Trường "Ảnh đại diện" là bắt buộc',
    }),
    product_description: joi_1.default.string().required().messages({
        "string.empty": "Mô tả sản phẩm không được để trống",
        "any.required": 'Trường "Mô tả sản phẩm" là bắt buộc',
    }),
    product_price: joi_1.default.number().required().messages({
        "number.base": "Giá phải là một số",
        "any.required": "Trường giá là bắt buộc",
    }),
    product_quantity: joi_1.default.number().required().messages({
        "number.base": "Số lượng phải là một số",
        "any.required": "Trường số lượng là bắt buộc",
    }),
    product_type: joi_1.default.string().required().messages({
        "string.empty": "Loại sản phẩm không được để trống",
        "any.required": 'Trường "Loại sản phẩm" là bắt buộc',
    }),
    product_attributes: joi_1.default.object().required().messages({
        "any.required": "Trường thuộc tính sản phẩm là bắt buộc",
    }),
    product_image: joi_1.default.array().items(joi_1.default.object({
        image_id: joi_1.default.string(),
        image_url: joi_1.default.string().required().messages({
            "string.empty": "URL ảnh chi tiết không được để trống",
            "any.required": "Trường URL ảnh chi tiết là bắt buộc",
        }),
    })),
});
exports.default = productSchema;
