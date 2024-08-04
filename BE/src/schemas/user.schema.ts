import joi, { ref, valid } from "joi";
const userSchema = joi.object({
	user_name: joi.string().messages({
		"string.empty": "Tên không được để trống",
	}),
	user_email: joi.string().email().required().messages({
		"string.empty": "Email không được để trống",
		"any.required": 'Trường "Email" là bắt buộc',
		"string.email": "Email không đúng định dạng",
	}),
	user_phone_number: joi
		.string()
		.pattern(/^[0-9]{10}$/)
		.messages({
			"string.pattern.base": "Giá trị phải là số điện thoại hợp lệ",
			"string.empty": "Trường không được để trống",
		}),
	user_password: joi.string().min(6).required().messages({
		"string.empty": "Mật khẩu không được để trống",
		"any.required": "Trường mật khẩu là bắt buộc",
		"string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
	}),
	user_confirmpassword: joi.string().valid(ref("user_password")).required().messages({
		"string.required": "Trường xác nhận mật khẩu là bắt buộc",
	}),
	user_address: joi.string().messages({
		"string.empty": "Dia chi không được để trống",
	}),
});

export const loginSchema = joi.object({
	user_email: joi.string().email().required().messages({
		"string.empty": "Email không được để trống",
		"any.required": 'Trường "Email" là bắt buộc',
		"string.email": "Email không đúng định dạng",
	}),
	user_password: joi.string().min(6).required().messages({
		"string.empty": "Mật khẩu không được để trống",
		"any.required": "Trường mật khẩu là bắt buộc",
		"string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
	}),
});

export const userGoogleSchema = joi.object({
	user_name: joi.string().required().messages({
		"string.empty": "Tên không được để trống",
		"any.required": "trường này là bắt buộc",
	}),
	user_email: joi.string().required().email().messages({
		"string.empty": "Email không được để trống",
		"any.required": "trường này là bắt buộc",
		"string.email": "Email không hợp lệ ",
	}),
});

export default userSchema;
