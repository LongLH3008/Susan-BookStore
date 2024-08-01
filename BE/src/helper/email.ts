import nodemailer from "nodemailer";
import Locals from "../providers/Locals";

class SendNewPasswordEmail {
  // Method to send OTP email
  public static async sendOTPEmail(email: string, otp: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: Locals.config().emailUser,
          pass: Locals.config().emailPass, 
        },
      });

      const mailOptions = {
        from: Locals.config().emailUser, // Sender address
        to: email,
        subject: "Your OTP Code", // Subject line
        text: `Your OTP code is: ${otp}. It is valid for 10 minutes. Please use this code to verify your request.`, // Email body
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Error sending email: ${(error as Error).message}`);
    }
  }
}

export default SendNewPasswordEmail;
