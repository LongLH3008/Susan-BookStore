import { Router } from "express";
import AuthChangeFwApiController from "../controllers/Api/Auth/ChangePassword";
import AuthForgotfwApiController from "../controllers/Api/Auth/ForgotPassword";
import AuthLoginApiController from "../controllers/Api/Auth/Login";
import AuthRegisterApiController from "../controllers/Api/Auth/Register";
import CategoryController from "../controllers/Api/Category.controller";

import BlogController from "../controllers/Api/blog.controller";
import { asyncHandler } from "../utils";
// import OrderController from "../controllers/Api/Order.Controller";
import { upload } from "../configs/multer.config";
import BookController from "../controllers/Api/Book.controller";
import CartController from "../controllers/Api/Cart.controller";
import DiscountController from "../controllers/Api/Discount.controller";
import GiaoHangNhanhController from "../controllers/Api/GiaoHangNhanhTest.controller";
import OrderController from "../controllers/Api/Order.Controller";
import ReviewController from "../controllers/Api/Review.controller";
import UploadController from "../controllers/Api/Upload.controller";
import UserController from "../controllers/Api/User.controller";
import PaymentController from "../controllers/Api/Vnpay.controller";
import VectorSearchController from "../controllers/Api/vectorSearch.controller";
import BannerControler from "../controllers/Api/banner.controler";
import BannerSaleControler from "../controllers/Api/bannerSale.controller";
import InfoUserController from "../controllers/Api/InfoUser.Controller";
import ContactController from "../controllers/Api/Contact.Controller";
import StatisticsController from "../controllers/Api/Statistinal.controller";

const router = Router();

// user-google
router.post("/user-google", asyncHandler(UserController.createUserFromGoogle)); // create user from google

// user-service-common
router.get("/user", asyncHandler(UserController.getAll)); // get all
router.put(
  "/user/udpate/status/:id",
  asyncHandler(UserController.updateUserStatus)
); // update status user
router.get("/user/:id", asyncHandler(UserController.getByUserId)); // get by id
router.get(
  "/user/type-auth/:type",
  asyncHandler(UserController.getAllUserByTypeAuth)
); // get by type auth
router.put("/user/:id", asyncHandler(UserController.updateUser));

//--------------USER ROUTES-------------------
//AUTH
router.post("/auth/login", AuthLoginApiController.Login);
router.post("/auth/logout", AuthLoginApiController.Logout);
router.post("/auth/refresh-token", AuthLoginApiController.refreshToken);
router.post("/auth/register", AuthRegisterApiController.Register);
router.post("/auth/change-pw", AuthChangeFwApiController.changePassword);
router.post("/auth/request-otp", AuthForgotfwApiController.requestReset);
router.post("/auth/check-otp", AuthForgotfwApiController.verifyOTP);

router.post("/auth/forgot-pw", AuthForgotfwApiController.resetPassword);
//categories
router.get("/categories", asyncHandler(CategoryController.getAll));
router.get("/categories/:id", asyncHandler(CategoryController.getOne));
router.post("/categories", asyncHandler(CategoryController.create));
router.patch("/categories/:id", asyncHandler(CategoryController.update));
router.delete("/categories/:id", asyncHandler(CategoryController.delete));
router.patch("/categories/:id/active", asyncHandler(CategoryController.active));
router.patch(
  "/categories/:id/inactive",
  asyncHandler(CategoryController.inActive)
);
//review
router.post("/books/:bookId/reviews", asyncHandler(ReviewController.addReview));
router.put(
  "/books/:bookId/reviews/:userId",
  asyncHandler(ReviewController.updateReview)
);
router.delete(
  "/books/:bookId/reviews/:userId",
  asyncHandler(ReviewController.deleteReview)
);
router.get("/books/:bookId/reviews", asyncHandler(ReviewController.getReviews));
router.get(
  "/books/:bookId/reviews/:userId",
  asyncHandler(ReviewController.getReviewByUser)
);
router.get("/books/reviews", asyncHandler(ReviewController.getAllReviews));
//book
// Public routes
router.get("/books", asyncHandler(BookController.getByQuery));
router.get("/views-books-admin", asyncHandler(BookController.getAllBooks));
router.get("/books-admin", asyncHandler(BookController.getByQueryAdmin));
router.get("/books/:id", asyncHandler(BookController.getById));
router.get("/books/slug/:slug", asyncHandler(BookController.getBySlug));

// Protected routes
router.post("/books", asyncHandler(BookController.create));
router.put("/books/:id", asyncHandler(BookController.updateOne));
router.delete("/books/:id", asyncHandler(BookController.deleteOne));
router.patch("/books/:id/unactive", asyncHandler(BookController.unActiveBook));
router.patch("/books/:id/active", asyncHandler(BookController.activeBook));
router.patch(
  "/books/category/:category_id/discount",
  asyncHandler(BookController.setDiscountByCategoryId)
);
router.patch("/books/discount", asyncHandler(BookController.setDiscountToAll));
router.patch(
  "/books/:id/discount",
  asyncHandler(BookController.setDiscountByBookId)
);
router.patch("/books/:id/sold", asyncHandler(BookController.updateSoldNumber));
//blog
router.post("/blog/add", asyncHandler(BlogController.create));
router.post("/blog/views/:userId/:blogId", asyncHandler(BlogController.views));
router.get("/blog", asyncHandler(BlogController.getAllBlogs));
router.get("/blog/:id", asyncHandler(BlogController.getOneBlog));
router.get("/blog/by/:slug", asyncHandler(BlogController.getBlogsBySlug));
router.delete("/blog/:id", asyncHandler(BlogController.deleteBlog));
router.put("/blog/update/:id", asyncHandler(BlogController.updateBlog));
//blogcomment
router.post(
  "/blog/addcomment/:blogId",
  asyncHandler(BlogController.addComment)
);
router.get(
  "/blog/commentblog/:blogId",
  asyncHandler(BlogController.getComments)
);
router.put(
  "/blog/updatecommentBlog/:blogId/:commentId",
  asyncHandler(BlogController.updateComment)
);
router.delete(
  "/blog/deletecommentBlog/:blogId/:commentId",
  asyncHandler(BlogController.deleteComment)
);
router.post(
  "/blog/likecomment/:blogId/:commentId",
  asyncHandler(BlogController.likeComment)
);

//order
// router.post("/orders", asyncHandler(OrderController.create));
// router.get("/orders/:id", asyncHandler(OrderController.getOrderById));
// router.get("/orders", asyncHandler(OrderController.getAllOrder));
// router.put("/orders/:id", asyncHandler(OrderController.updateOrder));
// router.delete("/orders/:id", asyncHandler(OrderController.deleteOrder));

// cart
router.post("/cart", asyncHandler(CartController.create)); // create cart
router.get("/cart/:user_id", asyncHandler(CartController.getCartByOneUser)); // get cart one user
router.post(
  "/cart/addproduct/:user_id",
  asyncHandler(CartController.addProductToCart)
);
router.delete(
  "/cart/:user_id/:product_id",
  asyncHandler(CartController.deleteProductInCart)
);
router.get(
  "/cart/increment-quantity/:user_id/:product_id",
  asyncHandler(CartController.incrementQuantityProductInCart)
);
router.get(
  "/cart/decrement-quantity/:user_id/:product_id",
  asyncHandler(CartController.decrementQuantityProductInCart)
);
router.put(
  "/cart/select/:user_id",
  asyncHandler(CartController.selectProductToCheckOut)
);

//discount
router.post("/discounts", asyncHandler(DiscountController.create));
router.get("/discounts", asyncHandler(DiscountController.getAll));
router.put("/discounts/:id", asyncHandler(DiscountController.update));
router.delete("/discounts/:code", asyncHandler(DiscountController.delete));
router.get(
  "/discounts/book/:bookId",
  asyncHandler(DiscountController.getDiscountsByBook)
);
router.post("/discounts/activate", asyncHandler(DiscountController.activate));
router.post(
  "/discounts/deactivate",
  asyncHandler(DiscountController.deactivate)
);
router.post(
  "/discounts/cancel",
  asyncHandler(DiscountController.cancelDiscount)
);
router.post(
  "/discounts/amount",
  asyncHandler(DiscountController.getDiscountAmount)
);

//upload
router.post(
  "/upload",
  upload.array("files", 10),
  asyncHandler(UploadController.upload)
);
router.post("/upload/delete", asyncHandler(UploadController.delete));

//checkoutAmount

//checkoutAmount

router.post(
  "/orders/checkout-review",
  asyncHandler(OrderController.checkoutReview)
);
router.post(
  "/orders/checkout",
  asyncHandler(OrderController.handleCreateOrder)
);

// giao hàng nhanh
router.post(
  "/giao-hang-nhanh/create",
  asyncHandler(GiaoHangNhanhController.CreateTest)
);
router.post(
  "/chi-tiet-don-hang",
  asyncHandler(GiaoHangNhanhController.getDetail)
);
router.get("/get-province", asyncHandler(GiaoHangNhanhController.GetProvince));
router.post(
  "/giao-hang-nhanh/preview-shipfee",
  asyncHandler(GiaoHangNhanhController.PreviewShipFee)
);

router.post(
  "/orders/checkout-review",
  asyncHandler(OrderController.checkoutReview)
);
router.get(
  "/orders/search-trackingNumber",
  asyncHandler(OrderController.SearchOrderCode)
);
router.get(
  "/orders/GetAllOrderOfClientWithUser",
  asyncHandler(OrderController.listOrderClient)
);
router.get(
  "/orders/GetAllOrderOfAdmin",
  asyncHandler(OrderController.listOrderAdmin)
);
router.get(
  "/orders/detail-order/:id",
  asyncHandler(OrderController.DetailOrder)
);

// giao hàng nhanh
router.post(
  "/giao-hang-nhanh/create",
  asyncHandler(GiaoHangNhanhController.CreateTest)
);
router.post(
  "/chi-tiet-don-hang",
  asyncHandler(GiaoHangNhanhController.getDetail)
);
router.get("/get-province", asyncHandler(GiaoHangNhanhController.GetProvince));

// advanced search and similar books
router.post(
  "/searchbook",
  asyncHandler(VectorSearchController.advancedSearchBooks)
);
router.post(
  "/search",
  asyncHandler(VectorSearchController.advancedSearchKeywords)
);
router.post("/loaddata", asyncHandler(VectorSearchController.loadData));
router.post(
  "/suggestedbook",
  asyncHandler(VectorSearchController.suggestedBooks)
);
//payment\
router.get("/payment/bank-list", asyncHandler(PaymentController.getBankList));
router.post(
  "/payment/create-payment-url",
  asyncHandler(PaymentController.getPaymentUrl)
);
router.post("/payment/verify-url", asyncHandler(PaymentController.verifyUrl));

//banner
router.post("/create/banner", asyncHandler(BannerControler.create));
router.get(
  "/GetAll/banner/inAdmin",
  asyncHandler(BannerControler.GetAllBannerInAdmin)
);
router.get("/GetbyBanner/:id", asyncHandler(BannerControler.GetByBannerId));
router.delete("/DeleteBanner/:id", asyncHandler(BannerControler.deleteBanner));
router.put("/UpdateBanner/:id", asyncHandler(BannerControler.updateBanner));
router.get(
  "/GetByBanner/client/:id",
  asyncHandler(BannerControler.GetbyidwithClient)
);
// banner sale
router.post("/create/banner-sale", asyncHandler(BannerSaleControler.create));
router.get(
  "/GetbyBanner-sale/:id",
  asyncHandler(BannerSaleControler.GetByBannerSaleId)
);
router.get(
  "/GetAll/banner-sale/inAdmin",
  asyncHandler(BannerSaleControler.GetAllBannerInAdmin)
);
router.delete(
  "/DeleteBanner-sale/:id",
  asyncHandler(BannerSaleControler.deleteBanner)
);
router.put(
  "/UpdateBanner-sale/:id",
  asyncHandler(BannerSaleControler.updateBanner)
);
router.get(
  "/GetByBanner-sale/client/:id",
  asyncHandler(BannerSaleControler.GetbyidwithClient)
);

// info user
router.post("/create/info-user", asyncHandler(InfoUserController.Create));
router.get("/detail/user-Info/:id", asyncHandler(InfoUserController.detail));
router.delete("/Delete/info-user/:id", asyncHandler(InfoUserController.delete));

router.get(
  "/Getall/info-user-WithUserId",
  asyncHandler(InfoUserController.GetAllInfoUserWithPagination)
);

router.patch("/info-user/update/:id", asyncHandler(InfoUserController.update));

router.post("/contact/create", asyncHandler(ContactController.create));

router.get("/contact/list", asyncHandler(ContactController.List));

router.get("/contact/:id", asyncHandler(ContactController.Detail));

// Statistics
router.get(
  "/topfivebook",
  asyncHandler(StatisticsController.GetAllOrderWithStatistical)
);
router.get(
  "/topfiveuser",
  asyncHandler(StatisticsController.GetAllOrderWithTop5User)
);

router.post(
  "/filterbydayandmonth",
  asyncHandler(StatisticsController.StatisticalFilterOrderPrdayAndMonth)
);

export default router;
