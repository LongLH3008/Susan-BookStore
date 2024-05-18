import joi from "joi"

const blogSchema = joi.object({
    title: joi.string().required().messages({
        "string.empty": "Tiêu đề bài viết là bắt buộc",
        "any.required": "Trường 'Tiêu đề bài viết' là bắt buộc",
    }),
    content: joi.string().required().messages({
        "string.empty": "Nội dung bài viết là bắt buộc",
        "any.required": "Trường 'Nội dung bài viết' là bắt buộc",
    }),
    author: joi.string().required().messages({
        "string.empty": "Tác giả là bắt buộc",
        "any.required": "Trường 'Tác giả' là bắt buộc",
    }),
    tags: joi.array().items(joi.string()).required().messages({
        "any.required": "Nhãn bài viết là bắt buộc",
    }),
});
export default blogSchema
