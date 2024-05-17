"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserApiController_1 = __importDefault(require("../controllers/Api/UserApiController"));
const router = (0, express_1.Router)();
router.get('/users', UserApiController_1.default.getAllUsers);
exports.default = router;
