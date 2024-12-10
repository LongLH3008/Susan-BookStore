// src/routes/WebsiteRoutes.js
import LayoutClient from "@/layouts/WebsiteLayout";
import * as Website from "@/pages/(website)";
import AuthGuard from "./guards/auth.guard";

const AuthRoutes = [
	{
		path: "",
		element: <AuthGuard children={<LayoutClient />} />,
		children: [
			{ path: "dang-nhap", element: <Website.Login /> },
			{ path: "dang-ky", element: <Website.Register /> },
			{ path: "quen-mat-khau", element: <Website.ForgotPassword /> },
			{
				path: "thong-tin-tai-khoan",
				element: <Website.AccountDetail />,
				children: [
					{ path: "", element: <Website.UserDetail /> },
					{ path: "ho-so-nguoi-dung", element: <Website.UserDetail /> },
					{ path: "so-dia-chi", element: <Website.Address /> },
					{ path: "don-hang", element: <Website.Order /> },
					{ path: "doi-mat-khau", element: <Website.ChangePassword /> },
				],
			},
		],
	},
];

export default AuthRoutes;
