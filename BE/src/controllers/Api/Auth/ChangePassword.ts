import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../../../models/User.model";

class ChangePassword {
	public static async changePassword(req: Request, res: Response): Promise<any> {
		try {
			const { user_id, oldPassword, newPassword, confirmPassword } = req.body;

			// Validate input
			if (!user_id || !oldPassword || !newPassword || !confirmPassword) {
				return res.status(400).json({ error: "All fields are required" });
			}

			// Check if new password matches the confirmed password
			if (newPassword !== confirmPassword) {
				return res.status(400).json({ error: "New password and confirm password do not match" });
			}

			// Find the user in the database by ID
			const user = await User.findById(user_id);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			// Check old password
			const isMatch = await bcrypt.compare(oldPassword, user.user_password);
			if (!isMatch) {
				return res.status(401).json({ error: "Incorrect old password" });
			}

			// Hash the new password
			const hashedPassword = await bcrypt.hash(newPassword, 10);

			// Update the password in the database
			user.user_password = hashedPassword;
			await user.save();

			return res.status(200).json({ message: "Bạn đã thay đổi mật khẩu thành công !" });
		} catch (error) {
			return res.status(500).json({
				error: `Error changing password: ${(error as Error).message}`,
			});
		}
	}
}

export default ChangePassword;
