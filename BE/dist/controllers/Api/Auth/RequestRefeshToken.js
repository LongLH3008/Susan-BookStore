"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Locals_1 = __importDefault(require("../../../providers/Locals"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class RequestRefeshToken {
    static ascyn(req, res) {
        //lấy token từ User
        const refreshToken = req.cookies.refreshToken;
        //điều kiện 
        if (!refreshToken) {
            return res.status(401).json({
                message: "No refresh token provided",
            });
        }
        jsonwebtoken_1.default.verify(refreshToken, Locals_1.default.config().jwtRefreshKey, (err, user) => {
        });
    }
}
