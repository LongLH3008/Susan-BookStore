interface ILogin {
	user_email: string;
	user_password: string;
}

interface IChangePassword {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

interface IRegister extends ILogin {
	user_confirmpassword: string;
	user_name: string;
}

interface IForgotPassword {
	user_email: string;
	user_otp: string;
}

interface IPayloadAuthToken {
	iat: number;
	exp: number;
	id: string;
	user_role: "admin" | "user";
}
