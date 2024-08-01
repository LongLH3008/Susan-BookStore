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
const blog_controller_1 = __importDefault(require("../controllers/Api/blog.controller"));
const utils_1 = require("../utils");
const Order_Controller_1 = __importDefault(require("../controllers/Api/Order.Controller"));
const Cart_controller_1 = __importDefault(require("../controllers/Api/Cart.controller"));
const User_controller_1 = __importDefault(require("../controllers/Api/User.controller"));
const router = (0, express_1.Router)();
// user-google
router.post("/user-google", (0, utils_1.asyncHandler)(User_controller_1.default.createUserFromGoogle)); // create user from google
// user-service-common
router.get("/user", (0, utils_1.asyncHandler)(User_controller_1.default.getAll)); // get all
router.get("/user/:id", (0, utils_1.asyncHandler)(User_controller_1.default.getByUserId)); // get by id
router.get("/user/type-auth/:type", (0, utils_1.asyncHandler)(User_controller_1.default.getAllUserByTypeAuth)); // get by type auth
router.put("/user/:id", (0, utils_1.asyncHandler)(User_controller_1.default.updateUser));
//--------------USER ROUTES-------------------
//AUTH
router.post("/auth/login", Login_1.default.Login);
router.post("/auth/refresh-token", Login_1.default.refreshToken);
router.post("/auth/register", Register_1.default.Register);
router.post("/auth/change-pw", ChangePassword_1.default.changePassword);
router.post("/auth/request-otp", ForgotPassword_1.default.requestReset);
router.post("/auth/check-otp", ForgotPassword_1.default.verifyOTP);
router.post("/auth/forgot-pw", ForgotPassword_1.default.resetPassword);
router.get("/categories", (0, utils_1.asyncHandler)(Category_controller_1.default.getAll));
router.get("/categories/:id", (0, utils_1.asyncHandler)(Category_controller_1.default.getOne));
router.post("/categories", (0, utils_1.asyncHandler)(Category_controller_1.default.create));
router.patch("/categorcategoriesies/:id", (0, utils_1.asyncHandler)(Category_controller_1.default.update));
router.delete("/categories", (0, utils_1.asyncHandler)(Category_controller_1.default.delete));
//comment
router.get("/comments", (0, utils_1.asyncHandler)(Comment_controller_1.default.getCommentsByProductId));
router.get("/comments/:id", (0, utils_1.asyncHandler)(Comment_controller_1.default.getCommentsByUserId));
router.post("/comments", (0, utils_1.asyncHandler)(Comment_controller_1.default.create));
router.patch("/comments/:id", (0, utils_1.asyncHandler)(Comment_controller_1.default.update));
router.delete("/comments", (0, utils_1.asyncHandler)(Comment_controller_1.default.delete));
//product
router.post("/products", (0, utils_1.asyncHandler)(Product_controller_1.default.create));
router.get("/products", (0, utils_1.asyncHandler)(Product_controller_1.default.getByQuery));
//blog
router.post("/blog/add", (0, utils_1.asyncHandler)(blog_controller_1.default.create));
router.get("/blog", (0, utils_1.asyncHandler)(blog_controller_1.default.getAllBlog));
router.get("/blog/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.getOneBlog));
router.delete("/blog/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.deleteBlog));
router.put("/blog/update/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.updateBlog));
//order
router.post("/orders", (0, utils_1.asyncHandler)(Order_Controller_1.default.create));
router.get("/orders/:id", (0, utils_1.asyncHandler)(Order_Controller_1.default.getOrderById));
router.get("/orders", (0, utils_1.asyncHandler)(Order_Controller_1.default.getAllOrder));
router.put("/orders/:id", (0, utils_1.asyncHandler)(Order_Controller_1.default.updateOrder));
router.delete("/orders/:id", (0, utils_1.asyncHandler)(Order_Controller_1.default.deleteOrder));
// cart
router.post("/cart", (0, utils_1.asyncHandler)(Cart_controller_1.default.create)); // create cart
router.get("/cart/:user_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.getCartByOneUser)); // get cart one user
router.post("/cart/addproduct/:user_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.addProductToCart));
router.delete("/cart/:user_id/:product_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.deleteProductInCart));
router.get("/cart/increment-quantity/:user_id/:product_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.incrementQuantityProductInCart));
router.get("/cart/decrement-quantity/:user_id/:product_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.decrementQuantityProductInCart));
exports.default = router;
