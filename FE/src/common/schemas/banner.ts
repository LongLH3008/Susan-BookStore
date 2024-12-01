import Joi from "joi";

export const BannerHomeValidate = Joi.object({
  title: Joi.string().min(3).required().messages({
    "any.required": "Tiêu đề là bắt buộc",
    "string.empty": "Tiêu đề không được để trống",
  }),

  subtitle: Joi.string().required().messages({
    "any.required": "Phụ đề là bắt buộc",
    "string.empty": "Phụ đề không được để trống",
  }),
  description: Joi.string().required().messages({
    "any.required": "Mô tả là bắt buộc",
    "string.empty": "Mô tả không được để trống",
  }),
  position: Joi.string().required().messages({
    "any.required": "Vị trí chữ là bắt buộc",
    "string.empty": "Vị trí chữ không được để trống",
  }),
});
