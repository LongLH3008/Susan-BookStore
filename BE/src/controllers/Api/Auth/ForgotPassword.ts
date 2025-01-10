import { NextFunction, Request, Response } from "express";
import User from "../../../models/User.model";
import bcrypt from "bcrypt";
import SendNewPasswordEmail from "../../../helper/email";

class ForgotPassword {
  // Method to initiate password reset by sending OTP
  public static async requestReset(req: Request, res: Response): Promise<any> {
    try {
      const { user_email } = req.body;
      const user = await User.findOne({ user_email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const otp = ForgotPassword.generateRandomOTP(6);

      // Save OTP and its expiration time in the user's record
      user.user_otp = otp;
      user.expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
      await user.save();

      // Send OTP to user's email
      await SendNewPasswordEmail.sendOTPEmail(user_email, otp);

      return res
        .status(200)
        .json({ message: "OTP sent to email", username: user.user_name });
    } catch (error) {
      return res.status(500).json({
        error: `Error requesting password reset: ${(error as Error).message}`,
      });
    }
  }

  // Method to verify OTP
  public static async verifyOTP(req: Request, res: Response): Promise<any> {
    try {
      const { user_name, user_otp } = req.body;
      const user: any = await User.findOne({ user_name, user_otp });
      if (user.user_name !== user_name) {
        return res.status(404).json({ error: "User không tồn tại !" });
      }

      console.log("thong tin username", user.user_name);
      //Kiểm tra username
      if (user.user_name !== user_name) {
        return res.status(404).json({ error: "Username not found" });
      }

      // Check if OTP matches and is within validity period
      if (user.user_otp !== user_otp || new Date() > user.expiresAt) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error verifying OTP: ${(error as Error).message}` });
    }
  }

  public static async resetPassword(req: Request, res: Response): Promise<any> {
    try {
      const { user_name, newPassword, confirmedPassword } = req.body;
  
      // Kiểm tra nếu các trường bắt buộc được cung cấp
      if (!user_name || !newPassword || !confirmedPassword) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const user: any = await User.findOne({ user_name });
  
      if (!user) {
        return res.status(404).json({ error: "User không tồn tại !" });
      }
  
      if (newPassword !== confirmedPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      // Hash new password and save
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.user_password = hashedPassword;
      user.user_otp = undefined;
      user.expiresAt = undefined;
      await user.save();
  
      return res.status(200).json({ message: "Thành công !" });
    } catch (error) {
      return res.status(500).json({
        error: `Error resetting password: ${(error as Error).message}`,
      });
    }
  }
  

  private static generateRandomOTP(length: number): string {
    const characters = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
  }
}

export default ForgotPassword;
