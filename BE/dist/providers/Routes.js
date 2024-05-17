"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Locals_1 = __importDefault(require("./Locals"));
const Api_1 = __importDefault(require("../routers/Api"));
const Web_1 = __importDefault(require("../routers/Web"));
const Log_1 = __importDefault(require("./Log"));
const morgan_1 = __importDefault(require("morgan"));
class Routes {
    static mountWeb(_express) {
        Log_1.default.showLogs("Routes => Mounting Web Routes...");
        _express.use((0, morgan_1.default)('short'));
        return _express.use('/', Web_1.default);
    }
    static mountApi(_express) {
        Log_1.default.showLogs("Routes => Mounting API Routes...");
        _express.use((0, morgan_1.default)('short'));
        return _express.use(`/${Locals_1.default.config().apiPrefix}`, Api_1.default);
    }
}
exports.default = Routes;
