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

      const subject = "Hoàn tất đơn hàng - Cảm ơn bạn đã mua sắm cùng chúng tôi!";
      const htmlContent = `
          <p>Quý khách hàng thân mến,</p>
          <p>Chúng tôi rất vui mừng thông báo rằng đơn hàng của bạn đã được giao thành công!</p>
          <p><strong>Chi tiết đơn hàng:</strong></p>
          <ul>
              <li><strong>Mã đơn hàng:</strong> ${trackingNumber}</li>
              <li><strong>Ngày đặt hàng:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
          <p>Đơn hàng của bạn đã hoàn tất. Chúng tôi hy vọng bạn hài lòng với sản phẩm!</p>
          <p>Vui lòng dành chút thời gian để chia sẻ trải nghiệm của bạn bằng cách để lại đánh giá. Phản hồi của bạn giúp chúng tôi cải thiện dịch vụ và hỗ trợ khách hàng khác.</p>
          <p>
              <a href="http://localhost:5173/tra-cuu-don-hang/" style="color: blue; text-decoration: underline;">Xem chi tiết đơn hàng tại đây</a> 
              hoặc để lại đánh giá sản phẩm tại đường dẫn bên dưới:
          </p>
          <p>
              <a href="http://localhost:5173/tra-cuu-don-hang" style="color: blue; text-decoration: underline;">
                  Để lại đánh giá sản phẩm
              </a>
          </p>
          <p>Xin cảm ơn quý khách đã mua sắm cùng chúng tôi!</p>
          <p>Trân trọng,<br/>Đội ngũ hỗ trợ</p>
      `;

      // Encode subject and HTML content in Base64
      const base64Subject = Buffer.from(subject).toString("base64");
      const base64HtmlContent = Buffer.from(htmlContent).toString("base64");

      const mailOptions = {
        from: Locals.config().emailUser, // Địa chỉ gửi
        to: email, // Địa chỉ nhận
        subject: `=?UTF-8?B?${base64Subject}?=`, // Base64 encoded subject
        html: Buffer.from(base64HtmlContent, "base64").toString(), // Decode back the Base64 HTML content
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Error sending email: ${(error as Error).message}`);
    }
  }
}

export default SendEmalCheckOutOrder;
