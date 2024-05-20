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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../../../models/User.model"));
const AccessToken_1 = __importDefault(require("./AccessToken"));
class Login {
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_email = req.body.user_email;
            const password = req.body.user_password;
            const user = yield User_model_1.default.findOne({ user_email: user_email });
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const comparePW = yield bcrypt_1.default.compare(password, user.user_password);
            if (!comparePW) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const accessToken = AccessToken_1.default.generateAccessToken(user);
            return res.status(200).json({
                message: "Login successfully",
                user,
                accessToken,
            });
        });
    }
}
exports.default = Login;
