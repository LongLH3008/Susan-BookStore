import Joi from "joi";

export const changePassword = Joi.object({
	oldPassword: Joi.string().required().messages({
		"any.required": "Mật khẩu bắt buộc",
		"string.empty": "Mật khẩu không được để trống",
	}),
	newPassword: Joi.string()
		.min(6)
		.max(32)
		.required()
		.pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$"))
		.messages({
			"any.required": "Mật khẩu mới bắt buộc",
			"string.min": "Mật khẩu mới ít nhất 6 kí tự",
			"string.max": "Mật khẩu mới tối đa 32 kí tự",
			"string.pattern.base": "Tối thiểu 1 chữ cái viết hoa, 1 chữ thường và 1 kí tự đặc biệt",
			"string.empty": "Mật khẩu mới không được để trống",
		}),
	confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages({
		"any.only": "Mật khẩu mới không khớp",
		"any.required": "Nhập lại mật khẩu mới",
	}),
});

export const requestOTP = Joi.object({
	user_email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"any.required": "Email bắt buộc",
			"string.email": "Email không đúng định dạng",
			"string.empty": "Email không được để trống",
		}),
});

export const confirmNewPassword = Joi.object({
	newPassword: Joi.string()
		.min(6)
		.max(32)
		.required()
		.pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$"))
		.messages({
			"any.required": "Mật khẩu bắt buộc",
			"string.min": "Mật khẩu ít nhất 6 kí tự",
			"string.max": "Mật khẩu tối đa 32 kí tự",
			"string.pattern.base": "Tối thiểu 1 chữ cái viết hoa, 1 chữ thường và 1 kí tự đặc biệt",
			"string.empty": "Mật khẩu không được để trống",
		}),
	confirmedPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages({
		"any.only": "Mật khẩu không khớp",
		"any.required": "Nhập lại mật khẩu",
	}),
});

export const loginValidate = Joi.object({
	user_email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"any.required": "Email bắt buộc",
			"string.email": "Email không đúng định dạng",
			"string.empty": "Email không được để trống",
		}),
	user_password: Joi.string().min(6).required().messages({
		"any.required": "Mật khẩu bắt buộc",
		"string.min": "Mật khẩu ít nhất 6 kí tự",
		"string.empty": "Mật khẩu không được để trống",
	}),
});

export const registerValidate = Joi.object({
	user_name: Joi.string().required().min(5).max(20).messages({
		"any.required": "Tên bắt buộc",
		"string.min": "Tên tối thiếu 5 kí tự",
		"string.max": "Tên tối đa 20 kí tự",
		"string.empty": "Tên không được để trống",
	}),
	user_email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"any.required": "Email bắt buộc",
			"string.email": "Email không đúng định dạng",
			"string.empty": "Email không được để trống",
		}),
	user_password: Joi.string()
		.min(6)
		.max(32)
		.required()
		.pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$"))
		.messages({
			"any.required": "Mật khẩu bắt buộc",
			"string.min": "Mật khẩu ít nhất 6 kí tự",
			"string.max": "Mật khẩu tối đa 32 kí tự",
			"string.pattern.base": "Tối thiểu 1 chữ cái viết hoa, 1 chữ thường và 1 kí tự đặc biệt",
			"string.empty": "Mật khẩu không được để trống",
		}),
	user_confirmpassword: Joi.string().required().valid(Joi.ref("user_password")).messages({
		"any.only": "Mật khẩu không khớp",
		"any.required": "Nhập lại mật khẩu",
	}),
});
