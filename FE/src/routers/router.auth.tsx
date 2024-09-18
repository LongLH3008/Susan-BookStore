// src/routes/WebsiteRoutes.js
import * as Website from "@/pages/(website)";
import AuthGuard from "./guards/auth.guard";

const AuthRoutes = [
	{
		path: "",
		element: <AuthGuard />,
		children: [
			{ path: "dang-nhap", element: <Website.Login /> },
			{ path: "dang-ky", element: <Website.Register /> },
			{ path: "quen-mat-khau", element: <Website.ForgotPassword /> },
		],
	},
];

export default AuthRoutes;
