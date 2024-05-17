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
        return {
            isCorsEnabled, apiPrefix, appUrl, port, mongoURL, jwtExpires, appMaxUploadLimit, secretKey, salt
        };
    }
    static init(_express) {
        _express.locals.app = this.config();
        return _express;
    }
}
exports.default = Locals;
