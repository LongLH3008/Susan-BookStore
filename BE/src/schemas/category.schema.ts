import joi from "joi"

const categorySchema = joi.object({
    category_name: joi.string().required().messages({
        "string.empty": "Tên danh mục là bắt buộc",
        "any.required": "Trường 'Tên danh mục' là bắt buộc",
    }),


});

export default categorySchema
