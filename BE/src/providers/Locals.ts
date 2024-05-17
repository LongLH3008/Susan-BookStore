import { Application } from "express";
import dotenv from 'dotenv';
import path from 'path';

class Locals {
    public static config(): any{
        dotenv.config({path: path.join(__dirname, '../../.env')});
        
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
        }
    }

    public static init(_express: Application): Application{
		_express.locals.app = this.config();
		return _express;
    }
}

export default Locals;
