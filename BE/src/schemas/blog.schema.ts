import joi from "joi";

const blogValidationSchema = joi.object({
  blog_title: joi.string().required().messages({
    "string.empty": "Tiêu đề bài viết là bắt buộc",
    "any.required": "Trường 'Tiêu đề bài viết' là bắt buộc",
  }),
  blog_content: joi.string().required().messages({
    "string.empty": "Nội dung bài viết là bắt buộc",
    "any.required": "Trường 'Nội dung bài viết' là bắt buộc",
  }),
  blog_author: joi.string().required().messages({
    "string.empty": "Tác giả là bắt buộc",
    "any.required": "Trường 'Tác giả' là bắt buộc",
  }),
  blog_tags: joi.array().items(joi.string()).required().messages({
    "any.required": "Nhãn bài viết là bắt buộc",
  }),
  blog_image: joi.string().required().messages({
    "string.empty": "Ảnh bài viết là bắt buộc",
    "any.required": "Trường 'Ảnh bài viết' là bắt buộc",
  }),
});

export default blogValidationSchema;
