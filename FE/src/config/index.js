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
exports.fetcher = exports.useSWRRequest = exports.getLocation = exports.SendRequest = exports.location = exports.instance = exports.API = void 0;
const axios_1 = __importDefault(require("axios"));
exports.API = {
    BASE: import.meta.env.VITE_API_URL,
    GOOGLE_CHECKAUTH: import.meta.env.VITE_GOOGLE_CHECK_AUTH,
    GOOGLE_LOGIN: import.meta.env.VITE_GOOGLE_LOGIN,
    GOOGLE_LOGOUT: import.meta.env.VITE_GOOGLE_LOGOUT,
    LOCATION: import.meta.env.API_LOCATION
};
exports.instance = axios_1.default.create({
    baseURL: `http://localhost:5000/api/v1/`,
    withCredentials: true,
});
exports.location = axios_1.default.create({
    baseURL: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data`,
    headers: { token: `c5793e8f-688e-11ef-8e53-0a00184fe694` }
});
const SendRequest = (method, endpoint, data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        switch (method) {
            case "GET":
                result = yield exports.instance.get(endpoint);
                break;
            case "POST":
                result = yield exports.instance.post(endpoint, data);
                break;
            case "PUT":
                result = yield exports.instance.put(`${endpoint}${id ? "/" + id : ""}`, data);
                break;
            case "DELETE":
                result = yield exports.instance.delete(`${endpoint}${id ? "/" + id : ""}`);
                break;
            case "PATCH":
                result = yield exports.instance.patch(`${endpoint}${id ? "/" + id : ""}`, data);
                break;
            default:
                throw new Error("Invalid HTTP method");
        }
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.SendRequest = SendRequest;
const getLocation = (arg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        switch (arg.location) {
            case 'province':
                result = yield exports.location.get(`/province`);
                break;
            case 'district':
                result = yield exports.location.post(`/district`, { province_id: arg.parent_id });
                break;
            case 'ward':
                if (!arg.parent_id)
                    return;
                result = yield exports.location.get(`/ward?district_id=${arg.parent_id}`);
                break;
            default:
                throw new Error("Invalid HTTP method");
        }
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getLocation = getLocation;
const useSWRRequest = (url_1, _a) => __awaiter(void 0, [url_1, _a], void 0, function* (url, { arg, }) {
    const { method, data, id } = arg;
    return yield (0, exports.SendRequest)(method, url, data, id);
});
exports.useSWRRequest = useSWRRequest;
const fetcher = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exports.SendRequest)("GET", url);
});
exports.fetcher = fetcher;
