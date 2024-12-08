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
const multer_config_1 = require("../configs/multer.config");
const Book_controller_1 = __importDefault(require("../controllers/Api/Book.controller"));
const Cart_controller_1 = __importDefault(require("../controllers/Api/Cart.controller"));
const Contact_Controller_1 = __importDefault(require("../controllers/Api/Contact.Controller"));
const Discount_controller_1 = __importDefault(require("../controllers/Api/Discount.controller"));
const GiaoHangNhanhTest_controller_1 = __importDefault(require("../controllers/Api/GiaoHangNhanhTest.controller"));
const InfoUser_Controller_1 = __importDefault(require("../controllers/Api/InfoUser.Controller"));
const Order_Controller_1 = __importDefault(require("../controllers/Api/Order.Controller"));
const Review_controller_1 = __importDefault(require("../controllers/Api/Review.controller"));
const Statistinal_controller_1 = __importDefault(require("../controllers/Api/Statistinal.controller"));
const Upload_controller_1 = __importDefault(require("../controllers/Api/Upload.controller"));
const User_controller_1 = __importDefault(require("../controllers/Api/User.controller"));
const Vnpay_controller_1 = __importDefault(require("../controllers/Api/Vnpay.controller"));
const banner_controler_1 = __importDefault(require("../controllers/Api/banner.controler"));
const bannerSale_controller_1 = __importDefault(require("../controllers/Api/bannerSale.controller"));
const vectorSearch_controller_1 = __importDefault(require("../controllers/Api/vectorSearch.controller"));
const StatusOrder_Controller_1 = __importDefault(require("../controllers/Api/StatusOrder.Controller"));
const router = (0, express_1.Router)();
// user-google
router.post("/user-google", (0, utils_1.asyncHandler)(User_controller_1.default.createUserFromGoogle)); // create user from google
// user-service-common
router.get("/user", (0, utils_1.asyncHandler)(User_controller_1.default.getAll)); // get all
router.put("/user/udpate/status/:id", (0, utils_1.asyncHandler)(User_controller_1.default.updateUserStatus)); // update status user
router.get("/user/:id", (0, utils_1.asyncHandler)(User_controller_1.default.getByUserId)); // get by id
router.get("/user/type-auth/:type", (0, utils_1.asyncHandler)(User_controller_1.default.getAllUserByTypeAuth)); // get by type auth
router.put("/user/:id", (0, utils_1.asyncHandler)(User_controller_1.default.updateUser));
//--------------USER ROUTES-------------------
//AUTH
router.post("/auth/login", Login_1.default.Login);
router.post("/auth/logout", Login_1.default.Logout);
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
router.patch("/categories/:id/active", (0, utils_1.asyncHandler)(Category_controller_1.default.active));
router.patch("/categories/:id/inactive", (0, utils_1.asyncHandler)(Category_controller_1.default.inActive));
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
router.get("/views-books-admin", (0, utils_1.asyncHandler)(Book_controller_1.default.getAllBooks));
router.get("/books-admin", (0, utils_1.asyncHandler)(Book_controller_1.default.getByQueryAdmin));
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
router.post("/blog/views/:userId/:blogId", (0, utils_1.asyncHandler)(blog_controller_1.default.views));
router.get("/blog", (0, utils_1.asyncHandler)(blog_controller_1.default.getAllBlogs));
router.get("/blog/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.getOneBlog));
router.get("/blog/by/:slug", (0, utils_1.asyncHandler)(blog_controller_1.default.getBlogsBySlug));
router.delete("/blog/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.deleteBlog));
router.put("/blog/update/:id", (0, utils_1.asyncHandler)(blog_controller_1.default.updateBlog));
//blogcomment
router.post("/blog/addcomment/:blogId", (0, utils_1.asyncHandler)(blog_controller_1.default.addComment));
router.get("/blog/commentblog/:blogId", (0, utils_1.asyncHandler)(blog_controller_1.default.getComments));
router.put("/blog/updatecommentBlog/:blogId/:commentId", (0, utils_1.asyncHandler)(blog_controller_1.default.updateComment));
router.delete("/blog/deletecommentBlog/:blogId/:commentId", (0, utils_1.asyncHandler)(blog_controller_1.default.deleteComment));
router.post("/blog/likecomment/:blogId/:commentId", (0, utils_1.asyncHandler)(blog_controller_1.default.likeComment));
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
router.get("/discounts/admin", (0, utils_1.asyncHandler)(Discount_controller_1.default.getAllAdmin));
router.put("/discounts/:id", (0, utils_1.asyncHandler)(Discount_controller_1.default.update));
router.get("/discount/:id", (0, utils_1.asyncHandler)(Discount_controller_1.default.getOne));
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
//checkoutAmount
router.post("/orders/checkout-review", (0, utils_1.asyncHandler)(Order_Controller_1.default.checkoutReview));
router.post("/orders/checkout", (0, utils_1.asyncHandler)(Order_Controller_1.default.handleCreateOrder));
// giao hàng nhanh
router.post("/giao-hang-nhanh/create", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.CreateTest));
router.post("/chi-tiet-don-hang", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.getDetail));
router.get("/get-province", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.GetProvince));
router.post("/giao-hang-nhanh/preview-shipfee", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.PreviewShipFee));
router.post("/orders/checkout-review", (0, utils_1.asyncHandler)(Order_Controller_1.default.checkoutReview));
router.get("/orders/search-trackingNumber", (0, utils_1.asyncHandler)(Order_Controller_1.default.SearchOrderCode));
router.get("/orders/GetAllOrderOfClientWithUser", (0, utils_1.asyncHandler)(Order_Controller_1.default.listOrderClient));
router.get("/orders/GetAllOrderOfAdmin", (0, utils_1.asyncHandler)(Order_Controller_1.default.listOrderAdmin));
router.get("/orders/detail-order/:id", (0, utils_1.asyncHandler)(Order_Controller_1.default.DetailOrder));
// giao hàng nhanh
router.post("/giao-hang-nhanh/create", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.CreateTest));
router.post("/chi-tiet-don-hang", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.getDetail));
router.get("/get-province", (0, utils_1.asyncHandler)(GiaoHangNhanhTest_controller_1.default.GetProvince));
// advanced search and similar books
router.post("/searchbook", (0, utils_1.asyncHandler)(vectorSearch_controller_1.default.advancedSearchBooks));
router.post("/search", (0, utils_1.asyncHandler)(vectorSearch_controller_1.default.advancedSearchKeywords));
router.post("/loaddata", (0, utils_1.asyncHandler)(vectorSearch_controller_1.default.loadData));
router.post("/suggestedbook", (0, utils_1.asyncHandler)(vectorSearch_controller_1.default.suggestedBooks));
//payment\
router.get("/payment/bank-list", (0, utils_1.asyncHandler)(Vnpay_controller_1.default.getBankList));
router.post("/payment/create-payment-url", (0, utils_1.asyncHandler)(Vnpay_controller_1.default.getPaymentUrl));
router.post("/payment/verify-url", (0, utils_1.asyncHandler)(Vnpay_controller_1.default.verifyUrl));
//banner
router.post("/create/banner", (0, utils_1.asyncHandler)(banner_controler_1.default.create));
router.get("/GetAll/banner/inAdmin", (0, utils_1.asyncHandler)(banner_controler_1.default.GetAllBannerInAdmin));
router.get("/GetbyBanner/:id", (0, utils_1.asyncHandler)(banner_controler_1.default.GetByBannerId));
router.delete("/DeleteBanner/:id", (0, utils_1.asyncHandler)(banner_controler_1.default.deleteBanner));
router.put("/UpdateBanner/:id", (0, utils_1.asyncHandler)(banner_controler_1.default.updateBanner));
router.get("/GetByBanner/client/:id", (0, utils_1.asyncHandler)(banner_controler_1.default.GetbyidwithClient));
// banner sale
router.post("/create/banner-sale", (0, utils_1.asyncHandler)(bannerSale_controller_1.default.create));
router.get("/GetbyBanner-sale/:id", (0, utils_1.asyncHandler)(bannerSale_controller_1.default.GetByBannerSaleId));
router.get("/GetAll/banner-sale/inAdmin", (0, utils_1.asyncHandler)(bannerSale_controller_1.default.GetAllBannerInAdmin));
router.delete("/DeleteBanner-sale/:id", (0, utils_1.asyncHandler)(bannerSale_controller_1.default.deleteBanner));
router.put("/UpdateBanner-sale/:id", (0, utils_1.asyncHandler)(bannerSale_controller_1.default.updateBanner));
router.get("/GetByBanner-sale/client/:id", (0, utils_1.asyncHandler)(bannerSale_controller_1.default.GetbyidwithClient));
router.patch("/UpdateStatusbanner/:id", (0, utils_1.asyncHandler)(banner_controler_1.default.StatusBannerActive));
router.patch("/UpdateStatusbanner-sale/:id", (0, utils_1.asyncHandler)(bannerSale_controller_1.default.UpdateStateBannerSale));
// info user
router.post("/create/info-user", (0, utils_1.asyncHandler)(InfoUser_Controller_1.default.Create));
router.get("/detail/user-Info/:id", (0, utils_1.asyncHandler)(InfoUser_Controller_1.default.detail));
router.delete("/Delete/info-user/:id", (0, utils_1.asyncHandler)(InfoUser_Controller_1.default.delete));
router.get("/Getall/info-user-WithUserId", (0, utils_1.asyncHandler)(InfoUser_Controller_1.default.GetAllInfoUserWithPagination));
router.patch("/info-user/update/:id", (0, utils_1.asyncHandler)(InfoUser_Controller_1.default.update));
router.post("/contact/create", (0, utils_1.asyncHandler)(Contact_Controller_1.default.create));
router.get("/contact/list", (0, utils_1.asyncHandler)(Contact_Controller_1.default.List));
router.get("/contact/:id", (0, utils_1.asyncHandler)(Contact_Controller_1.default.Detail));
// Statistics
router.post("/statistical-prd-by-date", (0, utils_1.asyncHandler)(Statistinal_controller_1.default.GetAllOrderWithStatistical));
router.get("/topfiveuser", (0, utils_1.asyncHandler)(Statistinal_controller_1.default.GetAllOrderWithTop5User));
router.post("/filterbydayandmonth", (0, utils_1.asyncHandler)(Statistinal_controller_1.default.StatisticalFilterOrderPrdayAndMonth));
router.post("/filterbydayandmonth/admin", (0, utils_1.asyncHandler)(Statistinal_controller_1.default.StatisticalFilterOrderPrdayAndMonthTwo));
router.patch("/update-status-order/:id", (0, utils_1.asyncHandler)(StatusOrder_Controller_1.default.UpdateStatusOrderForClient));
exports.default = router;
