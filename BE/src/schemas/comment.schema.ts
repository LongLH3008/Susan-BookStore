import joi from "joi"
const commentSchema = joi.object({
    comment_product_id: joi.string().required().messages({
        "string.empty": "Sản phẩm được bình luận là bắt buộc",
        "any.required": "Trường 'Sản phẩm được bình luận' là bắt buộc",
    }),
    comment_user_id: joi.string().required().messages({
        "string.empty": "Người dùng bình luận là bắt buộc",
        "any.required": "Trường 'Người dùng bình luận' là bắt buộc",
    }),

    comment_content: joi.string().required().messages({
        "string.empty": "Nội dung bình luận là bắt buộc",
        "any.required": "Trường 'Nội dung bình luận' là bắt buộc",
    }),
    comment_like_number: joi.number().min(0).default(0).messages({
        "number.base": "Số lượt thích phải là một số",
        "number.min": "Số lượt thích phải lớn hơn hoặc bằng 0",
    }),
});

export default commentSchema