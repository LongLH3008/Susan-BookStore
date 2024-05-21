"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChangePassword_1 = __importDefault(require("../controllers/Api/Auth/ChangePassword"));
const ForgotPassword_1 = __importDefault(require("../controllers/Api/Auth/ForgotPassword"));
const Login_1 = __importDefault(require("../controllers/Api/Auth/Login"));
const Register_1 = __importDefault(require("../controllers/Api/Auth/Register"));
const Category_controller_1 = __importDefault(require("../controllers/Api/Category.controller"));
const Comment_controller_1 = __importDefault(require("../controllers/Api/Comment.controller"));
const Product_controller_1 = __importDefault(require("../controllers/Api/Product.controller"));
const User_controller_1 = __importDefault(require("../controllers/Api/User.controller"));
const blog_controller_1 = __importDefault(require("../controllers/Api/blog.controller"));
const utils_1 = require("../utils");
const Cart_controller_1 = __importDefault(require("../controllers/Api/Cart.controller"));
const router = (0, express_1.Router)();
// user-google
router.post('/user-google', (0, utils_1.asyncHandler)(User_controller_1.default.createUserFromGoogle)); // create user from google
// user-service-common
router.get('/user', (0, utils_1.asyncHandler)(User_controller_1.default.getAll)); // get all
router.get('/user/:id', (0, utils_1.asyncHandler)(User_controller_1.default.getByUserId)); // get by id
router.get('/user/type-auth/:type', (0, utils_1.asyncHandler)(User_controller_1.default.getAllUserByTypeAuth)); // get by type auth
router.put('/user/:id', (0, utils_1.asyncHandler)(User_controller_1.default.updateUser));
//--------------USER ROUTES-------------------
//AUTH
router.post("/auth/login", Login_1.default.Login);
router.post("/auth/register", Register_1.default.Register);
router.post("/forgotpassword", ForgotPassword_1.default.resetPasswordRequest, ForgotPassword_1.default.ForgotPassword);
router.post("/changepassword", ChangePassword_1.default.changePassword);
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
//blog
router.post('/blog/add', (0, utils_1.asyncHandler)(blog_controller_1.default.create));
router.get('/blog', (0, utils_1.asyncHandler)(blog_controller_1.default.getAllBlog));
router.get("/blog/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.getOneBlog));
router.delete("/blog/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.deleteBlog));
router.put("/blog/update/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.updateBlog));
// cart 
router.post('/cart', (0, utils_1.asyncHandler)(Cart_controller_1.default.create)); // create cart
exports.default = router;
