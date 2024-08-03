import Joi from "joi";

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
	user_firstname: Joi.string().min(3).max(13).allow("").messages({
		"string.min": "First name must be at least 3 characters",
		"string.max": "First name must be at most 13 characters",
	}),
	user_lastname: Joi.string().min(3).max(13).allow("").messages({
		"string.min": "Last name must be at least 3 characters",
		"string.max": "Last name must be at most 13 characters",
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
	user_repassword: Joi.string().required().valid(Joi.ref("user_password")).messages({
		"any.only": "Password not match",
		"any.required": "Repassword is not allow empty string",
	}),
});
