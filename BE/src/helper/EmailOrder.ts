import nodemailer from "nodemailer";
import Locals from "../providers/Locals";

class SendEmalCheckOutOrder {
  // Method to send OTP email
  public static async sendNotificationCheckoutOrder(
    email: string,
    trackingNumber: string
  ) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: Locals.config().emailUser,
          pass: Locals.config().emailPass,
        },
      });

      const mailOptions = {
        from: Locals.config().emailUser, // Địa chỉ gửi
        to: email, // Địa chỉ nhận
        subject: "Order Completed - Thank You for Shopping with Us!", // Tiêu đề email
        html: `
            <p>Dear valued customer,</p>
            <p>We are excited to inform you that your order has been successfully delivered!</p>
            <p><strong>Order Details:</strong></p>
            <ul>
                <li><strong>Order Code:</strong> ${trackingNumber}</li>
                <li><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>
            <p>Your order has been completed. We hope you are satisfied with your purchase!</p>
            <p>Please take a moment to share your experience by leaving a product review. Your feedback helps us improve our service and assist other customers.</p>
            <p>
                <a href="http://localhost:5173/don-hang" style="color: blue; text-decoration: underline;">View your order details here</a> 
                or leave a review for your purchased products below:
            </p>
            <p>
                <a href="http://localhost:5173/review/${trackingNumber}" style="color: blue; text-decoration: underline;">
                    Leave a Product Review
                </a>
            </p>
            <p>Thank you for shopping with us!</p>
            <p>Best regards,<br/>The Support Team</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Error sending email: ${(error as Error).message}`);
    }
  }
}

export default SendEmalCheckOutOrder;
