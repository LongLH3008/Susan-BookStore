"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const IDiscount_1 = require("../interfaces/models/IDiscount");
const discountSchema = joi_1.default.object({
    discount_name: joi_1.default.string().required().messages({
        "string.empty": "Tên mã giảm giá là bắt buộc",
        "any.required": "Trường 'Tên mã giảm giá' là bắt buộc",
    }),
    discount_code: joi_1.default.string().required().messages({
        "string.empty": "Mã giảm giá là bắt buộc",
        "any.required": "Trường 'Mã giảm giá' là bắt buộc",
    }),
    discount_type: joi_1.default.string().required().messages({
        "string.empty": "Loại mã giảm giá là bắt buộc",
        "any.required": "Trường 'Loại mã giảm giá' là bắt buộc",
    }).valid(...Object.values(IDiscount_1.DiscountType)),
    discount_value: joi_1.default.number().required().messages({
        "number.base": "Giá trị giảm giá phải là một số",
        "any.required": "Trường 'Giá trị giảm giá' là bắt buộc",
    }),
    discount_applies_to: joi_1.default.string().required().messages({
        "string.empty": "Áp dụng với là bắt buộc",
        "any.required": "Trường 'Áp dụng với' là bắt buộc",
    }).valid(...Object.values(IDiscount_1.DiscountApplyTo)),
    discount_product_ids: joi_1.default.array().items(joi_1.default.string()).default([]),
    discount_category_ids: joi_1.default.array().items(joi_1.default.string()).default([]),
    discount_stock: joi_1.default.number().required().messages({
        "number.base": "Số lần sử dụng của mã giảm giá phải là một số",
        "any.required": "Trường 'Số lần sử dụng của mã giảm giá' là bắt buộc",
    }),
    discount_min_order_value: joi_1.default.number().required().messages({
        "number.base": "Giá trị đơn hàng tối thiểu phải là một số",
        "any.required": "Trường 'Giá trị đơn hàng tối thiểu' là bắt buộc",
    }),
    discount_max_use_per_user: joi_1.default.number().required().messages({
        "number.base": "Số lần sử dụng tối đa phải là một số",
        "any.required": "Trường 'Số lần sử dụng tối đa' là bắt buộc",
    }),
    discount_user_used: joi_1.default.array().items(joi_1.default.string()).default([]),
    discount_is_active: joi_1.default.boolean(),
    discount_start_date: joi_1.default.date().required().messages({
        "any.required": "Ngày bắt đầu là bắt buộc",
    }),
    discount_end_date: joi_1.default.date().required().messages({
        "any.required": "Ngày kết thúc là bắt buộc",
    }),
});
exports.default = discountSchema;
