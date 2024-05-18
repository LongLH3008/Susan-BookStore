import joi from "joi"
import { DiscountApplyTo, DiscountType } from "../interfaces/models/IDiscount";
const discountSchema = joi.object({
    discount_name: joi.string().required().messages({
        "string.empty": "Tên mã giảm giá là bắt buộc",
        "any.required": "Trường 'Tên mã giảm giá' là bắt buộc",
    }),
    discount_code: joi.string().required().messages({
        "string.empty": "Mã giảm giá là bắt buộc",
        "any.required": "Trường 'Mã giảm giá' là bắt buộc",
    }),
    discount_type: joi.string().required().messages({
        "string.empty": "Loại mã giảm giá là bắt buộc",
        "any.required": "Trường 'Loại mã giảm giá' là bắt buộc",
    }).valid(...Object.values(DiscountType)),
    discount_value: joi.number().required().messages({
        "number.base": "Giá trị giảm giá phải là một số",
        "any.required": "Trường 'Giá trị giảm giá' là bắt buộc",
    }),
    discount_applies_to: joi.string().required().messages({
        "string.empty": "Áp dụng với là bắt buộc",
        "any.required": "Trường 'Áp dụng với' là bắt buộc",
    }).valid(...Object.values(DiscountApplyTo)),
    discount_product_ids: joi.array().items(joi.string()).default([]),
    discount_category_ids: joi.array().items(joi.string()).default([]),
    discount_stock: joi.number().required().messages({
        "number.base": "Số lần sử dụng của mã giảm giá phải là một số",
        "any.required": "Trường 'Số lần sử dụng của mã giảm giá' là bắt buộc",
    }),
    discount_min_order_value: joi.number().required().messages({
        "number.base": "Giá trị đơn hàng tối thiểu phải là một số",
        "any.required": "Trường 'Giá trị đơn hàng tối thiểu' là bắt buộc",
    }),
    discount_max_use_per_user: joi.number().required().messages({
        "number.base": "Số lần sử dụng tối đa phải là một số",
        "any.required": "Trường 'Số lần sử dụng tối đa' là bắt buộc",
    }),
    discount_user_used: joi.array().items(joi.string()).default([]),
    discount_is_active: joi.boolean(),
    discount_start_date: joi.date().required().messages({
        "any.required": "Ngày bắt đầu là bắt buộc",
    }),
    discount_end_date: joi.date().required().messages({
        "any.required": "Ngày kết thúc là bắt buộc",
    }),
});

export default discountSchema