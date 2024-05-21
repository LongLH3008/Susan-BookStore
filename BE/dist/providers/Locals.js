"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
class Locals {
    static config() {
        dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
        const port = process.env.PORT || 8080;
        const appUrl = `${process.env.APP_URL}:${port}/`;
        const mongoURL = process.env.MONGOOSE_URL;
        const jwtExpires = process.env.JWT_EXPIRES || 3;
        const appMaxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT;
        const secretKey = process.env.SECRET_KEY || 'bimatnhe';
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
        return {
            isCorsEnabled,
            apiPrefix,
            appUrl,
            port,
            mongoURL,
            jwtExpires,
            appMaxUploadLimit,
            secretKey,
            emailPass,
            emailUser,
            salt,
            jwtAccessKey,
            session_secret_key,
            google_url_callback,
            google_client_id,
            google_client_secret
        };
    }
    static init(_express) {
        _express.locals.app = this.config();
        return _express;
    }
}
exports.default = Locals;
