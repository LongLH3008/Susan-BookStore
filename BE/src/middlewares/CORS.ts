import cors from "cors";
import { Application } from "express";
import Locals from "../providers/Locals";

export class CORS {
	public static mount(_express: Application): Application {
		_express.use(
			cors({
				origin: Locals.config().clientUrl || Locals.config().appUrl,
				// origin: process.env.APP_URL
				credentials: true,
			})
		);
		// em tạo thêm credential này để client nó còn được phép lấy
		// cookies, HTTP authentication, sau khi auth xong nó trả phiên về
		// không bật thì mỗi origin mới dc truy cập

		return _express;
	}
}

export default CORS;
