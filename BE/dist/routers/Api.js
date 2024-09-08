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
const blog_controller_1 = __importDefault(require("../controllers/Api/blog.controller"));
const utils_1 = require("../utils");
// import OrderController from "../controllers/Api/Order.Controller";
const Cart_controller_1 = __importDefault(require("../controllers/Api/Cart.controller"));
const User_controller_1 = __importDefault(require("../controllers/Api/User.controller"));
const Discount_controller_1 = __importDefault(require("../controllers/Api/Discount.controller"));
const multer_config_1 = require("../configs/multer.config");
const Upload_controller_1 = __importDefault(require("../controllers/Api/Upload.controller"));
const Book_controller_1 = __importDefault(require("../controllers/Api/Book.controller"));
const Review_controller_1 = __importDefault(require("../controllers/Api/Review.controller"));
const Order_Controller_1 = __importDefault(require("../controllers/Api/Order.Controller"));
const GiaoHangNhanhTest_controller_1 = __importDefault(require("../controllers/Api/GiaoHangNhanhTest.controller"));
const Vnpay_controller_1 = __importDefault(require("../controllers/Api/Vnpay.controller"));
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
//categories
router.get("/categories", (0, utils_1.asyncHandler)(Category_controller_1.default.getAll));
router.get("/categories/:id", (0, utils_1.asyncHandler)(Category_controller_1.default.getOne));
router.post("/categories", (0, utils_1.asyncHandler)(Category_controller_1.default.create));
router.patch("/categories/:id", (0, utils_1.asyncHandler)(Category_controller_1.default.update));
router.delete("/categories/:id", (0, utils_1.asyncHandler)(Category_controller_1.default.delete));
//review
router.post("/books/:bookId/reviews", (0, utils_1.asyncHandler)(Review_controller_1.default.addReview));
router.put("/books/:bookId/reviews/:userId", (0, utils_1.asyncHandler)(Review_controller_1.default.updateReview));
router.delete("/books/:bookId/reviews/:userId", (0, utils_1.asyncHandler)(Review_controller_1.default.deleteReview));
router.get("/books/:bookId/reviews", (0, utils_1.asyncHandler)(Review_controller_1.default.getReviews));
router.get("/books/:bookId/reviews/:userId", (0, utils_1.asyncHandler)(Review_controller_1.default.getReviewByUser));
router.get("/books/reviews", (0, utils_1.asyncHandler)(Review_controller_1.default.getAllReviews));
//book
// Public routes
router.get("/books", (0, utils_1.asyncHandler)(Book_controller_1.default.getByQuery));
router.get("/books/:id", (0, utils_1.asyncHandler)(Book_controller_1.default.getById));
router.get("/books/slug/:slug", (0, utils_1.asyncHandler)(Book_controller_1.default.getBySlug));
// Protected routes
router.post("/books", (0, utils_1.asyncHandler)(Book_controller_1.default.create));
router.put("/books/:id", (0, utils_1.asyncHandler)(Book_controller_1.default.updateOne));
router.delete("/books/:id", (0, utils_1.asyncHandler)(Book_controller_1.default.deleteOne));
router.patch("/books/:id/unactive", (0, utils_1.asyncHandler)(Book_controller_1.default.unActiveBook));
router.patch("/books/:id/active", (0, utils_1.asyncHandler)(Book_controller_1.default.activeBook));
router.patch("/books/category/:category_id/discount", (0, utils_1.asyncHandler)(Book_controller_1.default.setDiscountByCategoryId));
router.patch("/books/discount", (0, utils_1.asyncHandler)(Book_controller_1.default.setDiscountToAll));
router.patch("/books/:id/discount", (0, utils_1.asyncHandler)(Book_controller_1.default.setDiscountByBookId));
router.patch("/books/:id/sold", (0, utils_1.asyncHandler)(Book_controller_1.default.updateSoldNumber));
//blog
router.post("/blog/add", (0, utils_1.asyncHandler)(blog_controller_1.default.create));
router.get("/blog", (0, utils_1.asyncHandler)(blog_controller_1.default.getAllBlogs));
router.get("/blog/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.getOneBlog));
router.delete("/blog/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.deleteBlog));
router.put("/blog/update/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.updateBlog));
//order
// router.post("/orders", asyncHandler(OrderController.create));
// router.get("/orders/:id", asyncHandler(OrderController.getOrderById));
// router.get("/orders", asyncHandler(OrderController.getAllOrder));
// router.put("/orders/:id", asyncHandler(OrderController.updateOrder));
// router.delete("/orders/:id", asyncHandler(OrderController.deleteOrder));
// cart
router.post("/cart", (0, utils_1.asyncHandler)(Cart_controller_1.default.create)); // create cart
router.get("/cart/:user_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.getCartByOneUser)); // get cart one user
router.post("/cart/addproduct/:user_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.addProductToCart));
router.delete("/cart/:user_id/:product_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.deleteProductInCart));
router.get("/cart/increment-quantity/:user_id/:product_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.incrementQuantityProductInCart));
router.get("/cart/decrement-quantity/:user_id/:product_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.decrementQuantityProductInCart));
router.put("/cart/select/:user_id", (0, utils_1.asyncHandler)(Cart_controller_1.default.selectProductToCheckOut));
//discount
router.post("/discounts", (0, utils_1.asyncHandler)(Discount_controller_1.default.create));
router.get("/discounts", (0, utils_1.asyncHandler)(Discount_controller_1.default.getAll));
router.put("/discounts/:id", (0, utils_1.asyncHandler)(Discount_controller_1.default.update));
router.delete("/discounts/:code", (0, utils_1.asyncHandler)(Discount_controller_1.default.delete));
router.get("/discounts/book/:bookId", (0, utils_1.asyncHandler)(Discount_controller_1.default.getDiscountsByBook));
router.post("/discounts/activate", (0, utils_1.asyncHandler)(Discount_controller_1.default.activate));
router.post("/discounts/deactivate", (0, utils_1.asyncHandler)(Discount_controller_1.default.deactivate));
router.post("/discounts/cancel", (0, utils_1.asyncHandler)(Discount_controller_1.default.cancelDiscount));
router.post("/discounts/amount", (0, utils_1.asyncHandler)(Discount_controller_1.default.getDiscountAmount));
//upload
router.post("/upload", multer_config_1.upload.array("files", 10), (0, utils_1.asyncHandler)(Upload_controller_1.default.upload));
router.post("/upload/delete", (0, utils_1.asyncHandler)(Upload_controller_1.default.delete));
//checkoutAmount
router.post("/orders/checkout-review", (0, utils_1.asyncHandler)(Order_Controller_1.default.checkoutReview));
// giao hàng nhanh
router.post("/giao-hang-nhanh/create", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.CreateTest));
router.post("/chi-tiet-don-hang", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.getDetail));
router.get("/get-province", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.GetProvince));
// advanced search and similar books
router.post("/search", utils_1.asyncHandler);
//payment\
router.get("/payment/bank-list", (0, utils_1.asyncHandler)(Vnpay_controller_1.default.getBankList));
router.post("/payment/create-payment-url", (0, utils_1.asyncHandler)(Vnpay_controller_1.default.getPaymentUrl));
router.post("/payment/verify-url", (0, utils_1.asyncHandler)(Vnpay_controller_1.default.verifyUrl));
exports.default = router;
