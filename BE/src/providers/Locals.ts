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
		// giao hang nhanh 
		const token_ghn = process.env.SHOP_ID_V1;
		const shop_id = process.env.TOKEN_GHN;
		const api_create_order_ghn = process.env.API_CREATE_ORDER_GHN;
		const api_get_detail_order_ghn = process.env.API_GET_DETAIL_ORDER_GHN;
		const api_preview_order_information = process.env.API_PREVIEW_ORDER_INFORMATION;
		const api_get_province = process.env.API_GET_PROVINCE;
		const api_get_district = process.env.API_GET_DISTRICT;
		const api_get_ward = process.env.API_GET_WARD;
		const api_preview_totalfee = process.env.API_PREVIEW_TOTAL_FEE

		//advanced search
		const fireworkToken = `${process.env.FIREWORK_TOKEN}` || process.env.FIREWORK_TOKEN;
		const fireworkUrl = `${process.env.FIREWORK_URL}` || process.env.FIREWORK_URL;
		const qdrantUrl = `${process.env.QDRANT_URL}` || process.env.QDRANT_URL;
		const qdrantApi = `${process.env.QDRANT_API}` || process.env.QDRANT_API;
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
			token_ghn,
			shop_id,
			api_create_order_ghn,
			api_get_detail_order_ghn,
			api_preview_order_information,
			api_get_province,
			api_get_district,
			api_get_ward,
			fireworkToken,
			fireworkUrl,
			qdrantUrl,
			qdrantApi,
			api_preview_totalfee
		};
	}

	public static init(_express: Application): Application {
		_express.locals.app = this.config();
		return _express;
	}
}

export default Locals;
