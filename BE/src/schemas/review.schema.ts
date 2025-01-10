import Joi from "joi";

export const reviewCreateSchema = Joi.object({
    userId: Joi.string().required().messages({
      "string.empty": "ID người dùng là bắt buộc",
      "any.required": "Trường 'ID người dùng' là bắt buộc",
    }),
    rating: Joi.number().min(0).max(5).required().messages({
      "number.base": "Đánh giá phải là số",
      "number.min": "Đánh giá phải từ 0 đến 5",
      "number.max": "Đánh giá phải từ 0 đến 5",
      "any.required": "Trường 'Đánh giá' là bắt buộc",
    }),
    comment: Joi.string().required().messages({
      "string.empty": "Nội dung đánh giá là bắt buộc",
      "any.required": "Trường 'Nội dung đánh giá' là bắt buộc",
    }),
  });
  
  export const reviewUpdateSchema = Joi.object({
    rating: Joi.number().min(0).max(5).messages({
      "number.base": "Đánh giá phải là số",
      "number.min": "Đánh giá phải từ 0 đến 5",
      "number.max": "Đánh giá phải từ 0 đến 5",
    }),
    comment: Joi.string().messages({
      "string.empty": "Nội dung đánh giá không được để trống",
    }),
  }).min(1).messages({
    "object.min": "Phải có ít nhất một trường để cập nhật",
  });