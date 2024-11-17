import Joi from "joi";

export const checkoutValidate = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Tên bắt buộc",
        "string.empty": "Tên không được để trống",
    }),
    // email: Joi.string().Joi.email({ tlds: false }).required().messages({
    //     "any.required": "Email bắt buộc",
    //     "string.empty": "Email không được để trống",
    // }),
    phone: Joi.string().required().pattern(new RegExp(`^(84|0[3|5|7|8|9])[0-9]{8}$`)).messages({
        "any.required": "Số điện thoại bắt buộc",
        "string.empty": "Số điện thoại không được để trống",
        "string.pattern.base": "Số điện thoại không đúng",
    }),
    address: Joi.string().required().messages({
        "any.required": "Địa chỉ bắt buộc",
        "string.empty": "Địa chỉ không được để trống",
    }),
    province: Joi.string().required().messages({
        "any.required": "Chưa chọn tỉnh / thành phố",
        "string.empty": "Chưa chọn tỉnh / thành phố",
    }),
    district: Joi.string().required().messages({
        "any.required": "Chưa chọn quận / huyện",
        "string.empty": "Chưa chọn quận / huyện",
    }),
    ward: Joi.string().required().messages({
        "any.required": "Chưa chọn phường / xã",
        "string.empty": "Chưa chọn phường / xã",
    }),
    wardCode: Joi.string().required().messages({
        "any.required": "Chưa chọn phường / xã",
        "string.empty": "Chưa chọn phường / xã",
    }),
    districtId: Joi.number().required().messages({
        "any.required": "Chưa chọn phường / xã",
        "string.empty": "Chưa chọn phường / xã",
    }),
});
