"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Locals_1 = __importDefault(require("./Locals"));
class Database {
    static init() {
        mongoose_1.default.connect(Locals_1.default.config().mongoURL)
            .then(() => {
            console.log("Connect successful");
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    }
}
exports.default = Database;
