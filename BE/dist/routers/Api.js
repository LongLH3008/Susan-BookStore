"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_controller_1 = __importDefault(require("../controllers/Api/Category.controller"));
const Comment_controller_1 = __importDefault(require("../controllers/Api/Comment.controller"));
const Product_controller_1 = __importDefault(require("../controllers/Api/Product.controller"));
const utils_1 = require("../utils");
const router = (0, express_1.Router)();
//category 
router.get('/categories', (0, utils_1.asyncHandler)(Category_controller_1.default.getAll));
router.get('/categories/:id', (0, utils_1.asyncHandler)(Category_controller_1.default.getOne));
router.post('/categories', (0, utils_1.asyncHandler)(Category_controller_1.default.create));
router.patch('/categories/:id', (0, utils_1.asyncHandler)(Category_controller_1.default.update));
router.delete('/categories', (0, utils_1.asyncHandler)(Category_controller_1.default.delete));
//comment
router.get('/comments', (0, utils_1.asyncHandler)(Comment_controller_1.default.getCommentsByProductId));
router.get('/comments/:id', (0, utils_1.asyncHandler)(Comment_controller_1.default.getCommentsByUserId));
router.post('/comments', (0, utils_1.asyncHandler)(Comment_controller_1.default.create));
router.patch('/comments/:id', (0, utils_1.asyncHandler)(Comment_controller_1.default.update));
router.delete('/comments', (0, utils_1.asyncHandler)(Comment_controller_1.default.delete));
//product 
router.post('/products', (0, utils_1.asyncHandler)(Product_controller_1.default.create));
router.get('/products', (0, utils_1.asyncHandler)(Product_controller_1.default.getByQuery));
exports.default = router;
