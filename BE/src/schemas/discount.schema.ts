import Joi from 'joi';
import { DiscountApplyTo, DiscountType } from '../interfaces/models/IDiscount';

const discountCreateSchema = Joi.object({
  discount_name: Joi.string().required().messages({
    'string.base': 'Tên mã giảm giá phải là một chuỗi',
    'string.empty': 'Tên mã giảm giá không được để trống',
    'any.required': 'Tên mã giảm giá là bắt buộc',
  }),

  discount_code: Joi.string().required().messages({
    'string.base': 'Mã giảm giá phải là một chuỗi',
    'string.empty': 'Mã giảm giá không được để trống',
    'any.required': 'Mã giảm giá là bắt buộc',
  }),

  discount_type: Joi.string().valid(...Object.values(DiscountType)).required().messages({
    'string.base': 'Loại giảm giá phải là một chuỗi',
    'any.only': 'Loại giảm giá phải là một trong các giá trị: {#values}',
    'any.required': 'Loại giảm giá là bắt buộc',
  }),

  discount_description: Joi.string().allow('').optional().messages({
    'string.base': 'Mô tả giảm giá phải là một chuỗi',
  }),

  discount_value: Joi.number().required().messages({
    'number.base': 'Giá trị giảm giá phải là một số',
    'any.required': 'Giá trị giảm giá là bắt buộc',
  }),

  discount_applies_to: Joi.string().valid(...Object.values(DiscountApplyTo)).required().messages({
    'string.base': 'Áp dụng cho phải là một chuỗi',
    'any.only': 'Áp dụng cho phải là một trong các giá trị: {#values}',
    'any.required': 'Áp dụng cho là bắt buộc',
  }),

  discount_product_ids: Joi.array().items(Joi.string()).when('discount_applies_to', {
    is: DiscountApplyTo.specific,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }).messages({
    'array.base': 'Danh sách ID sản phẩm phải là một mảng',
    'array.items': 'ID sản phẩm phải là chuỗi',
    'any.required': 'Danh sách ID sản phẩm là bắt buộc khi áp dụng cho sản phẩm cụ thể',
  }),

  discount_category_ids: Joi.array().items(Joi.string()).when('discount_applies_to', {
    is: DiscountApplyTo.category,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }).messages({
    'array.base': 'Danh sách ID danh mục phải là một mảng',
    'array.items': 'ID danh mục phải là chuỗi',
    'any.required': 'Danh sách ID danh mục là bắt buộc khi áp dụng cho danh mục',
  }),

  discount_stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Số lượng mã giảm giá phải là một số',
    'number.integer': 'Số lượng mã giảm giá phải là số nguyên',
    'number.min': 'Số lượng mã giảm giá phải lớn hơn hoặc bằng 0',
    'any.required': 'Số lượng mã giảm giá là bắt buộc',
  }),

  discount_min_order_value: Joi.number().min(0).required().messages({
    'number.base': 'Giá trị đơn hàng tối thiểu phải là một số',
    'number.min': 'Giá trị đơn hàng tối thiểu phải lớn hơn hoặc bằng 0',
    'any.required': 'Giá trị đơn hàng tối thiểu là bắt buộc',
  }),

  discount_max_use_per_user: Joi.number().integer().min(1).required().messages({
    'number.base': 'Số lần sử dụng tối đa cho mỗi người dùng phải là một số',
    'number.integer': 'Số lần sử dụng tối đa cho mỗi người dùng phải là số nguyên',
    'number.min': 'Số lần sử dụng tối đa cho mỗi người dùng phải lớn hơn hoặc bằng 1',
    'any.required': 'Số lần sử dụng tối đa cho mỗi người dùng là bắt buộc',
  }),

  discount_start_date: Joi.date().required().messages({
    'date.base': 'Ngày bắt đầu phải là một ngày hợp lệ',
    'any.required': 'Ngày bắt đầu là bắt buộc',
  }),

  discount_end_date: Joi.date().greater(Joi.ref('discount_start_date')).required().messages({
    'date.base': 'Ngày kết thúc phải là một ngày hợp lệ',
    'date.greater': 'Ngày kết thúc phải sau ngày bắt đầu',
    'any.required': 'Ngày kết thúc là bắt buộc',
  }),

  discount_is_active: Joi.boolean().default(true).messages({
    'boolean.base': 'Trạng thái hoạt động phải là true hoặc false',
  }),
});

const discountUpdateSchema = discountCreateSchema.fork(
  Object.keys(discountCreateSchema.describe().keys),
  (schema) => schema.optional()
);

const discountQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Số trang phải là một số',
    'number.integer': 'Số trang phải là số nguyên',
    'number.min': 'Số trang phải lớn hơn hoặc bằng 1',
  }),
  limit: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Giới hạn phải là một số',
    'number.integer': 'Giới hạn phải là số nguyên',
    'number.min': 'Giới hạn phải lớn hơn hoặc bằng 1',
  }),
  code: Joi.string().optional().messages({
    'string.base': 'Mã giảm giá phải là một chuỗi',
  }),
});

export { discountCreateSchema, discountUpdateSchema, discountQuerySchema };
