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
    comment_rating: joi.number().required().messages({
        "string.empty": "Số điểm đánh giá là bắt buộc",
        "any.required": "Trường 'Số điểm đánh giá' là bắt buộc",
    }),
});

export default commentSchema