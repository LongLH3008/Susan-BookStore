import Joi from "joi";

export const voucherValidate = Joi.object({
	discount_product_ids: Joi.array(),
	discount_category_ids: Joi.array(),
	discount_name: Joi.string().required().messages({
		"any.required": "Tên voucher bắt buộc",
		"string.empty": "Tên voucher không được để trống",
	}),
	discount_code: Joi.string().required().messages({
		"any.required": "Mã voucher bắt buộc",
		"string.empty": "Mã voucher không được để trống",
	}),
	discount_type: Joi.string().required().valid("percentage", "fixed_amount").messages({
		"any.required": "Loại voucher bắt buộc",
		"any.only": "Loại voucher bắt buộc",
	}),
	discount_description: Joi.string().allow(""),
	discount_value: Joi.number().required().messages({
		"any.required": "Voucher bắt buộc phải có giá trị giảm giá",
	}),
	discount_applies_to: Joi.string().required().valid("all", "specific", "category").messages({
		"any.required": "Sản phẩm / Chương trình áp dụng bắt buộc",
		"any.only": "Sản phẩm / Chương trình áp dụng bắt buộc",
	}),
	discount_stock: Joi.number().required().messages({
		"any.required": "Số lượng voucher bắt buộc",
	}),
	discount_is_active: Joi.boolean().default(true),
	discount_min_order_value: Joi.number().min(0).default(200000),
	discount_max_use_per_user: Joi.number().min(1).default(4),
	discount_start_date: Joi.date().iso().default("2024-09-22T14:18:37.487Z"),
	discount_end_date: Joi.date().iso().greater(Joi.ref("discount_start_date")).default("2024-09-29T14:18:37.487Z"),
});
