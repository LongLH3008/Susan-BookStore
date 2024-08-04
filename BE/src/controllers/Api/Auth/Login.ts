import bcrypt from "bcrypt";
import User from "../../../models/User.model";
import AccessToken from "./AccessToken";
import RefreshToken from "./RefreshToken";
import { validate } from "../../../schemas";
import { loginSchema } from "../../../schemas/user.schema";

class Login {
	public static async Login(req: any, res: any): Promise<any> {
		try {
			const { user_email, user_password } = req.body;
			validate(loginSchema, { user_email, user_password });
			const user: any = await User.findOne({ user_email: user_email });
			if (!user) {
				return res.status(401).json({ message: "Invalid email or password" });
			}

			const comparePW = await bcrypt.compare(user_password, user.user_password);
			if (!comparePW) {
				return res.status(401).json({ message: "Invalid email or password" });
			}

			const accessToken = AccessToken.generateAccessToken(user);
			const refreshToken = RefreshToken.generateRefreshToken(user);
			res.cookie("accessToken", accessToken, {
				httpOnly: true,
				secure: false,
				sameSite: "strict",
				maxAge: 24 * 60 * 60 * 1000, //1day
			});
			return res.status(200).json({
				message: "Login successfully",
				user,
				accessToken,
				refreshToken,
			});
		} catch (error: any) {
			return res.status(400).json({
				error: error.message,
			});
		}
	}

	// freshertoken
	public static async refreshToken(req: any, res: any): Promise<any> {
		try {
			const { refreshToken } = req.body;
			if (!refreshToken) {
				return res.status(400).json({ message: "Refresh token is required" });
			}

			const user: any = RefreshToken.verifyRefreshToken(refreshToken);
			if (!user) {
				return res.status(401).json({ message: "Invalid refresh token" });
			}

			const newAccessToken = AccessToken.generateAccessToken(user);
			const newRefreshToken = RefreshToken.generateRefreshToken(user);

			// Set the new access token in cookies
			res.cookie("accessToken", newAccessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production", // Use secure cookies in production
				sameSite: "strict", // Adjust based on your requirements
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});

			return res.status(200).json({
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
		} catch (error: any) {
			return res.status(400).json({
				error: error.message,
			});
		}
	}
}

export default Login;
