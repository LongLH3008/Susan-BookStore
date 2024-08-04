import { Application } from "express";
import dotenv from "dotenv";
import path from "path";

class Locals {
	public static config(): any {
		dotenv.config({ path: path.join(__dirname, "../../.env") });
		const port = process.env.PORT || 8080;
		const appUrl = `${process.env.APP_URL}:${port}/`;
		const clientUrl = `${process.env.CLIENT}`;
		const mongoURL = process.env.MONGOOSE_URL;
		const jwtExpires = process.env.JWT_EXPIRES || 3;
		const appMaxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT;
		const secretKey = process.env.SECRET_KEY || "bimatnhe";
		const salt = process.env.SALT || 10;
		const apiPrefix = process.env.API_PREFIX;
		const isCorsEnabled = process.env.CORS_ENABLED || true;
		// đống này em thêm để cấu hình passport
		const google_client_id = process.env.GOOGLE_CLIENT_ID;
		const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;
		const session_secret_key = process.env.SESSION_SECRET_KEY;
		const google_url_callback = process.env.CALL_BACK_URL;
		//new cua cuong
		const emailUser = process.env.EMAIL_USER;
		const emailPass = process.env.EMAIL_PASS;
		const jwtAccessKey = process.env.JWT_ACCESS_KEY;
		const jwtRefreshKey = process.env.JWT_REFRESH_KEY;
		return {
			isCorsEnabled,
			apiPrefix,
			appUrl,
			clientUrl,
			port,
			mongoURL,
			jwtExpires,
			appMaxUploadLimit,
			secretKey,
			emailPass,
			emailUser,
			salt,
			jwtAccessKey,
			jwtRefreshKey,
			session_secret_key,
			google_url_callback,
			google_client_id,
			google_client_secret,
		};
	}

	public static init(_express: Application): Application {
		_express.locals.app = this.config();
		return _express;
	}
}

export default Locals;
