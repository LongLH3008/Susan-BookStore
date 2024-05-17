"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CORS_1 = __importDefault(require("./CORS"));
const Http_1 = __importDefault(require("./Http"));
const SecurityImproving_1 = __importDefault(require("./SecurityImproving"));
const Statics_1 = __importDefault(require("./Statics"));
const Views_1 = __importDefault(require("./Views"));
const Locals_1 = __importDefault(require("../providers/Locals"));
class Kernel {
    static init(_express) {
        if (Locals_1.default.config().isCorsEnabled) {
            _express = CORS_1.default.mount(_express);
        }
        _express = Http_1.default.mount(_express);
        _express = SecurityImproving_1.default.mount(_express);
        // _express = SecurityImproving.mount(_express, callback);
        _express = Views_1.default.mount(_express);
        _express = Statics_1.default.mount(_express);
        return _express;
    }
}
exports.default = Kernel;
