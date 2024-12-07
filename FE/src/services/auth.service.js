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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatus = exports.getUsers = exports.loginByGoogle = exports.updateUser = exports.changePassword = exports.confirmNewPassword = exports.checkOTP = exports.requestOTP = exports.register = exports.logout = exports.login = void 0;
const config_1 = require("../config");
const config_2 = require("@/config");
const login = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)("POST", "auth/login", args);
});
exports.login = login;
const logout = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)("POST", "auth/logout");
});
exports.logout = logout;
const register = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)("POST", "auth/register", args);
});
exports.register = register;
const requestOTP = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)("POST", "auth/request-otp", args);
});
exports.requestOTP = requestOTP;
const checkOTP = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)("POST", "auth/check-otp", args);
});
exports.checkOTP = checkOTP;
const confirmNewPassword = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)("POST", "auth/forgot-pw", args);
});
exports.confirmNewPassword = confirmNewPassword;
const changePassword = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)("POST", "auth/change-pw", args);
});
exports.changePassword = changePassword;
const updateUser = (arg, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)('PUT', `user/${id}`, arg);
});
exports.updateUser = updateUser;
const checkAuthentication = () => __awaiter(void 0, void 0, void 0, function* () {
    if ((window.location.href = "https://accounts.google.com"))
        console.log("aaa");
});
const loginByGoogle = () => {
    setTimeout(() => {
        window.addEventListener("onload", checkAuthentication);
    }, 500);
    window.location.href = `${config_1.API.GOOGLE_LOGIN}`;
};
exports.loginByGoogle = loginByGoogle;
const getUsers = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)("GET", `user${user_id ? '/' + user_id : ''}`);
});
exports.getUsers = getUsers;
const UpdateStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, config_2.SendRequest)("PUT", "user/udpate/status/" + id, payload);
});
exports.UpdateStatus = UpdateStatus;
