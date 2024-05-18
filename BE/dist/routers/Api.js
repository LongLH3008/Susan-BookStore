"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserApiController_1 = __importDefault(require("../controllers/Api/UserApiController"));
const router = (0, express_1.Router)();
router.get('/users', UserApiController_1.default.getAllUsers);
router.get('/users/:id', UserApiController_1.default.getUser);
router.post('/users', UserApiController_1.default.storeUser);
exports.default = router;
