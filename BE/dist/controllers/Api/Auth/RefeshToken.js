"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Locals_1 = __importDefault(require("../../../providers/Locals"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class RefreshToken {
    static generateRefreshToken(user) {
        const freshtoken = Locals_1.default.config().jwtRefreshKey;
        console.log(freshtoken);
        if (!freshtoken) {
            throw new Error("No token provided");
        }
        return jsonwebtoken_1.default.sign({
            id: user.id,
            user_role: user.user_role
        }, freshtoken, {
            expiresIn: "365d"
        });
    }
}
exports.default = RefreshToken;
