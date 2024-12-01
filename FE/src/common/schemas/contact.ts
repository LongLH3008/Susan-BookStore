import Joi from "joi";

export const contactSchema = Joi.object({
    full_name: Joi.string().required().messages({
        'string.empty': 'Chưa nhập họ tên',
        'string.required': 'Chưa nhập họ tên',
    }),
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.empty': 'Chưa nhập email',
        'string.required': 'Chưa nhập email',
        'string.email': 'Email không hợp lệ',
    }),
    subject: Joi.string().required().min(5).max(50).messages({
        'string.empty': 'Chưa nhập tiêu đề',
        'string.required': 'Chưa nhập tiêu đề',
        'string.min': "Nội dung từ 5 - 50 kí tự",
        'string.max': "Nội dung từ 5 - 50 kí tự",
    }),
    content: Joi.string().required().min(20).max(300).messages({
        'string.empty': 'Chưa nhập nội dung',
        'string.required': 'Chưa nhập nội dung',
        'string.min': "Nội dung từ 20 - 300 kí tự",
        'string.max': "Nội dung từ 20 - 300 kí tự",
    })
})