"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const Locals_1 = __importDefault(require("../providers/Locals"));
class Http {
    static mount(_express) {
        _express.use((0, cors_1.default)());
        _express.use((0, connect_flash_1.default)());
        _express.use((0, helmet_1.default)());
        _express.use((0, compression_1.default)());
        _express.use((0, express_session_1.default)({
            resave: false,
            secret: Locals_1.default.config().secretKey,
            saveUninitialized: false,
            // em đặt cái này thành false để cho google nó có thể chả phiên đăng nhập vào đây 
            // vì môi trường local của mình nó là http nên em bật secure = true nó éo cho phép động vào
            // cookie nên em để tạm false , bao h deploy nó thành https thì bật lại là true nhé 
            // em đông auth =_=
            cookie: { secure: false },
            // store : new (MongoDBStore as any)({
            //     uri: process.env.MONGOOSE_URL,
            //     collection: 'sessions', 
            // })
        }));
        return _express;
    }
}
exports.default = Http;
