interface ILogin {
	user_email: string;
	user_password: string;
}

interface IRegister extends ILogin {
	user_confirmpassword: string;
	user_name: string;
}

interface IForgotPassword {
	user_email: string;
	user_otp: string;
}
