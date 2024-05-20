"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Kernel_1 = __importDefault(require("../middlewares/Kernel"));
const Routes_1 = __importDefault(require("./Routes"));
const Locals_1 = __importDefault(require("./Locals"));
const ExceptionHandler_1 = require("../middlewares/ExceptionHandler");
class Express {
    constructor() {
        this.express = (0, express_1.default)();
        this.mountAll();
    }
    mountAll() {
        // Mount dotEnv
        this.express = Locals_1.default.init(this.express);
        // Mount Middlewares
        this.express = Kernel_1.default.init(this.express);
        // Mount Web
        this.express = Routes_1.default.mountWeb(this.express);
        // Mount API
        this.express = Routes_1.default.mountApi(this.express);
        //handleError
        this.express.use((error, req, res, next) => {
            ExceptionHandler_1.exceptionHandler.handleError(error, req, res, next);
        });
    }
    init() {
        const port = Locals_1.default.config().port;
        const host = Locals_1.default.config().appUrl;
        // Run on port
        this.express
            .listen(port, () => console.log(`Server is running on port ${port} and host: ${host}`))
            .on("error", (_error) => console.log("Error " + _error.message));
    }
}
exports.default = new Express();
