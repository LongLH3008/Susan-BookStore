import bcrypt from "bcrypt";
import User from "../../../models/User.model";
import AccessToken from "./AccessToken";
import RefreshToken from "./RefreshToken";
import { validate } from "../../../schemas";
import { loginSchema } from "../../../schemas/user.schema";
import RefreshTokenModel from "../../../models/RefreshToken.model";

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

            // Lưu refresh token vào cơ sở dữ liệu
            const saveRefreshToken = await RefreshTokenModel.create({
                userId: user._id,
                refreshToken: refreshToken,
                expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Token có thời hạn 7 ngày
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 24 * 60 * 60 * 1000, // 1 ngày
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

    // refreshToken
    public static async refreshToken(req: any, res: any): Promise<any> {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ message: "Refresh token is required" });
            }

            // Kiểm tra refresh token trong cơ sở dữ liệu
            const savedToken = await RefreshTokenModel.findOne({ refreshToken: refreshToken });
            if (!savedToken) {
                return res.status(401).json({ message: "Invalid refresh token" });
            }

            // Kiểm tra hạn sử dụng của refresh token
            if (savedToken.expiredAt < new Date()) {
                return res.status(401).json({ message: "Refresh token has expired" });
            }

            // Tạo mới access token và refresh token
            const user: any = await User.findById(savedToken.userId);
            const newAccessToken = AccessToken.generateAccessToken(user);
            const newRefreshToken = RefreshToken.generateRefreshToken(user);

            // Cập nhật refresh token trong cơ sở dữ liệu
            savedToken.refreshToken = newRefreshToken;
            savedToken.expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Gia hạn thêm 7 ngày
            await savedToken.save();

            // Đặt lại access token mới trong cookie
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Sử dụng cookie an toàn trong production
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000, // 1 ngày
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
    //logout
    public static async Logout(req: any, res: any) : Promise<any> {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({ message: "Logout successfully" });
    }
}

export default Login;
