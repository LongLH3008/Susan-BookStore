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
const User_1 = __importDefault(require("../../models/User"));
class UserApiController {
    // public static async index (req : Request, res : Response, next : NextFunction){
    //     return res.json();
    // }   
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield User_1.default.find({});
                if (allUsers.length == 0) {
                    return res.json({ mes: "No one avaiable" });
                }
                return res.status(200).json(allUsers);
            }
            catch (error) {
                return res.status(404).json({ mes: error });
            }
        });
    }
    static getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.find({ _id: req.params.id });
                if (!user) {
                    return res.json({ mes: "User not found" });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(404).json({ mes: error });
            }
        });
    }
    static storeUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.create(req.body);
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(404).json({ mes: error });
            }
        });
    }
    static editUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.create(req.body);
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(404).json({ mes: error });
            }
        });
    }
}
exports.default = UserApiController;
