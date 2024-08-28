import Joi from 'joi';
import { DiscountApplyTo, DiscountType } from '../interfaces/models/IDiscount';

const discountSchema = Joi.object({
  // Discount name
  discount_name: Joi.string().required().messages({
    'string.base': 'Discount name must be a string',
    'string.empty': 'Discount name is required',
  }),

  // Discount code
  discount_code: Joi.string().required().messages({
    'string.base': 'Discount code must be a string',
    'string.empty': 'Discount code is required',
  }),

  // Discount type
  discount_type: Joi.string().valid(...Object.values(DiscountType)).default(DiscountType.percentage).messages({
    'string.base': 'Discount type must be a string',
    'any.only': 'Discount type must be one of: {#values}',
  }),

  // Discount description
  discount_description: Joi.string().default('').messages({
    'string.base': 'Discount description must be a string',
  }),

  // Discount value
  discount_value: Joi.number().required().messages({
    'number.base': 'Discount value must be a number',
    'any.required': 'Discount value is required',
  }),

  // Discount applies to
  discount_applies_to: Joi.string().valid(...Object.values(DiscountApplyTo)).default(DiscountApplyTo.all).messages({
    'string.base': 'Discount applies to must be a string',
    'any.only': 'Discount applies to must be one of: {#values}',
  }),

  // Discount product IDs
  discount_product_ids: Joi.array().items(Joi.string()).default([]).messages({
    'array.base': 'Discount product IDs must be an array',
    'array.items': 'Discount product IDs must be strings',
  }),

  // Discount category IDs
  discount_category_ids: Joi.array().items(Joi.string()).default([]).messages({
    'array.base': 'Discount category IDs must be an array',
    'array.items': 'Discount category IDs must be strings',
  }),

  // Discount stock
  discount_stock: Joi.number().required().messages({
    'number.base': 'Discount stock must be a number',
    'any.required': 'Discount stock is required',
  }),

  // Minimum order value
  discount_min_order_value: Joi.number().required().messages({
    'number.base': 'Minimum order value must be a number',
    'any.required': 'Minimum order value is required',
  }),

  // Maximum usage per user
  discount_max_use_per_user: Joi.number().required().default(1).messages({
    'number.base': 'Maximum usage per user must be a number',
    'any.required': 'Maximum usage per user is required',
  }),

  // Users who have used the discount
  discount_users_used: Joi.array().items(Joi.string()).default([]).messages({
    'array.base': 'Discount users used must be an array',
    'array.items': 'Discount users used must be strings',
  }),

  // Discount start date
  discount_start_date: Joi.date().required().messages({
    'date.base': 'Discount start date must be a valid date',
    'any.required': 'Discount start date is required',
  }),

  // Discount end date
  discount_end_date: Joi.date().required().messages({
    'date.base': 'Discount end date must be a valid date',
    'any.required': 'Discount end date is required',
  }),

  // Discount active status
  discount_is_active: Joi.boolean().default(true).messages({
    'boolean.base': 'Discount active status must be a boolean',
  }),
});

export default discountSchema;