import Joi from "joi";

export const BlogValidate = Joi.object({
  blog_title: Joi.string().min(3).required().messages({
    "any.required": "Tiêu đề là bắt buộc",
    "string.empty": "Tiêu đề không được để trống",
  }),
  blog_author: Joi.string().min(3).required().messages({
    "any.required": "Tên tác giả là bắt buộc",
    "string.empty": "Tên tác giả không được để trống",
  }),
});
