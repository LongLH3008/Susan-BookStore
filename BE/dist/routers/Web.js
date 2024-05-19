"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HomePage_1 = __importDefault(require("../controllers/Web/HomePage"));
const google_auth_1 = __importDefault(require("./auth/google-auth"));
const router = (0, express_1.Router)();
// google auth 
router.use('/auth', google_auth_1.default);
// web
router.get('/', HomePage_1.default.index);
exports.default = router;
