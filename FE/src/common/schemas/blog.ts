import Joi from "joi";

export const BlogValidate = Joi.object({
  blog_title: Joi.string().min(3).required().messages({
    "any.required": "Tiêu đề là bắt buộc",
    "string.empty": "Tiêu đề không được để trống",
  }),
  blog_tags: Joi.alternatives()
    .try(Joi.array().items(Joi.string()).optional(), Joi.string().optional())
    .messages({
      "string.empty": "Thẻ không được để trống",
    }),
});
