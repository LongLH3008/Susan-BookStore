import Joi from "joi";

export const requestOTP = Joi.object({
	user_email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"any.required": "Email required",
			"string.email": "Email invalid",
			"string.empty": "Email is not allow empty string",
		}),
});

export const confirmNewPassword = Joi.object({
	newPassword: Joi.string()
		.min(6)
		.max(32)
		.required()
		.pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$"))
		.messages({
			"any.required": "Password required",
			"string.min": "Password at least 6 characters",
			"string.max": "Password at most 32 characters",
			"string.pattern.base": "At least 1 uppercase, 1 digit, and 1 special",
			"string.empty": "Password is not allow empty string",
		}),
	confirmedPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages({
		"any.only": "Password not match",
		"any.required": "Repassword is not allow empty string",
	}),
});

export const loginValidate = Joi.object({
	user_email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"any.required": "Email required",
			"string.email": "Email invalid",
			"string.empty": "Email is not allow empty string",
		}),
	user_password: Joi.string().min(6).required().messages({
		"any.required": "Password required",
		"string.min": "Password at least 6 characters",
		"string.empty": "Password is not allow empty string",
	}),
});

export const registerValidate = Joi.object({
	user_name: Joi.string().required().min(5).max(20).messages({
		"any.required": "Name required",
		"string.min": "Name at least 5 characters",
		"string.max": "Name at most 20 characters",
		"string.empty": "Name is not allow empty string",
	}),
	user_email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"any.required": "Email required",
			"string.email": "Email invalid",
			"string.empty": "Email is not allow empty string",
		}),
	user_password: Joi.string()
		.min(6)
		.max(32)
		.required()
		.pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$"))
		.messages({
			"any.required": "Password required",
			"string.min": "Password at least 6 characters",
			"string.max": "Password at most 32 characters",
			"string.pattern.base": "At least 1 uppercase, 1 digit, and 1 special",
			"string.empty": "Password is not allow empty string",
		}),
	user_confirmpassword: Joi.string().required().valid(Joi.ref("user_password")).messages({
		"any.only": "Password not match",
		"any.required": "Repassword is not allow empty string",
	}),
});
