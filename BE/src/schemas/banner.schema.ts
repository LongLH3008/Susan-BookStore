import Joi from "joi";
const bannerValidateSchema = Joi.object({
    banner_Title: Joi.string().required().messages({
        "string.empty": "Tên bài viết là bắt buộc",
        "any.required": "Trường 'Tên bài viết' là bắt buộc",
    }),
    banner_Images: Joi.array().required().messages({
        "string.empty": "Ảnh bài viết là bắt buộc",
        "any.required": "Trường 'Nội dung bài viết' là bắt buộc",
    }),
    advertisement_images: Joi.array().required().messages({
        "string.empty": "Ảnh bài viết là bắt buộc",
        "any.required": "Trường 'Ảnh bài viết' là bắt buộc",
    }),
    banner_Description: Joi.string().required().messages({
        "string.empty": "Tên bài viết là bắt buộc",
        "any.required": "Trường 'Tên bài viết' là bắt buộc",
    }),
    is_active: Joi.boolean().default(true).messages({
        'boolean.base': 'Tr Rolled hoạt động ph Crimea true hotright false',
    }),
})
export default bannerValidateSchema;