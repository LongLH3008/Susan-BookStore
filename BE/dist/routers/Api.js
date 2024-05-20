"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_1 = __importDefault(require("../controllers/Api/Auth/Login"));
const ForgotPassword_1 = __importDefault(require("../controllers/Api/Auth/ForgotPassword"));
const ChangePassword_1 = __importDefault(require("../controllers/Api/Auth/ChangePassword"));
const Register_1 = __importDefault(require("../controllers/Api/Auth/Register"));
const UserApiController_1 = __importDefault(require("../controllers/Api/Users/UserApiController"));
const router = (0, express_1.Router)();
//--------------USER ROUTES-------------------
//AUTH
router.post("/auth/login", Login_1.default.Login);
router.post("/auth/register", Register_1.default.Register);
router.post("/forgotpassword", ForgotPassword_1.default.resetPasswordRequest, ForgotPassword_1.default.ForgotPassword);
router.post("/changepassword", ChangePassword_1.default.changePassword);
//USER
router.get("/users", UserApiController_1.default.getAllUsers);
router.get("/users/:id", UserApiController_1.default.getUser);
router.delete("users/:id", UserApiController_1.default.DeleteUser);
//--------------KHÁC ROUTES-------------------
exports.default = router;
