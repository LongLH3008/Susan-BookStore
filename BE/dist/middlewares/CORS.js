"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS = void 0;
const cors_1 = __importDefault(require("cors"));
const Locals_1 = __importDefault(require("../providers/Locals"));
class CORS {
    static mount(_express) {
        _express.use((0, cors_1.default)({
            origin: Locals_1.default.config().appUrl,
            // origin: process.env.APP_URL
            //credentials : true
        }));
        // em tạo thêm credential này để client nó còn được phép lấy
        // cookies, HTTP authentication, sau khi auth xong nó trả phiên về 
        // không bật thì mỗi origin mới dc truy cập
        // em đông 
        return _express;
    }
}
exports.CORS = CORS;
exports.default = CORS;
