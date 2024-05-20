"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../../../models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class RefreshToken {
    //yc trả về một JSON WEB token(jwt) yc từ http
    static getToken(req) {
        if (
        //kiểm tra Headers có thông tin xác thực ? và đinh dạng (bearer) ?
        req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer") {
            //Trả về token("");
            return req.headers.authorization.split(" ")[1];
        }
        else if (req.query && req.query.token) {
            return req.query.token;
        }
        return "";
    }
    static RefeshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //lấy token từ hàm getToken
            const _token = RefreshToken.getToken(req);
            //kiểm tra token hợp lệ
            if (_token === "") {
                return res.status(401).json({
                    error: ["Invalid Token!"],
                });
            }
            let decode;
            try {
                //Giải mã và xác thực token
                decode = jsonwebtoken_1.default.verify(_token, res.locals.app.appSecret);
            }
            catch (error) {
                return res.status(401).json({
                    error: ["Invalid Token!"],
                });
            }
            if (!decode || !decode.email) {
                return res.status(400).json({
                    error: ["Invalid token format or missing email"],
                });
            }
            //Tìm kiếm người dùng trong cơ sở dữ liệu
            const email = decode.email;
            try {
                const user = yield User_model_1.default.findOne({ user_email: email });
                if (!user) {
                    return res.status(404).json({
                        error: ["User not found!"],
                    });
                }
                if (!user.user_password) {
                    return res.status(400).json({
                        error: ["Please login using your social credentials"],
                    });
                }
                //Kiểm tra mật khẩu
                const isMatch = yield bcrypt_1.default.compare(decode.password, user.user_password);
                if (!isMatch) {
                    return res.status(401).json({
                        error: ["Password does not match!"],
                    });
                }
                const token = jsonwebtoken_1.default.sign({ email: user.user_email, password: decode.password }, res.locals.app.appSecret, { expiresIn: res.locals.app.jwtExpiresIn * 60 });
                //ẩn column token trong database
                user.tokens = undefined;
                user.user_password = undefined;
                //Tạo và trả về token mới
                return res.json({
                    user,
                    token,
                    token_expires_in: res.locals.app.jwtExpiresIn * 60,
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: error.message,
                });
            }
        });
    }
}
exports.default = RefreshToken;
