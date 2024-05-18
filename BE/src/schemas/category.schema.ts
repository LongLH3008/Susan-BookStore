import joi from "joi"

const categorySchema = joi.object({
    category_name: joi.string().required().messages({
        "string.empty": "Tên danh mục là bắt buộc",
        "any.required": "Trường 'Tên danh mục' là bắt buộc",
    }),
    category_thumb: joi.string().required().messages({
        "string.empty": "Ảnh đại diện danh mục là bắt buộc",
        "any.required": "Trường 'Ảnh đại diện danh mục' là bắt buộc",
    }),
    is_active: joi.boolean(),
});

export default categorySchema
