import { Router } from "express";
import AuthChangeFwApiController from "../controllers/Api/Auth/ChangePassword";
import AuthForgotfwApiController from "../controllers/Api/Auth/ForgotPassword";
import AuthLoginApiController from "../controllers/Api/Auth/Login";
import AuthRegisterApiController from "../controllers/Api/Auth/Register";
import CategoryController from "../controllers/Api/Category.controller";
import CommentController from "../controllers/Api/Comment.controller";
import ProductController from "../controllers/Api/Product.controller";
import BlogController from "../controllers/Api/blog.controller";
import { asyncHandler } from "../utils";
import OrderController from "../controllers/Api/Order.Controller";
import CartController from "../controllers/Api/Cart.controller";
import UserController from "../controllers/Api/User.controller";
import DiscountController from "../controllers/Api/Discount.controller";
const router = Router();

// user-google
router.post("/user-google", asyncHandler(UserController.createUserFromGoogle)); // create user from google

// user-service-common
router.get("/user", asyncHandler(UserController.getAll)); // get all
router.get("/user/:id", asyncHandler(UserController.getByUserId)); // get by id
router.get("/user/type-auth/:type", asyncHandler(UserController.getAllUserByTypeAuth)); // get by type auth
router.put("/user/:id", asyncHandler(UserController.updateUser));

//--------------USER ROUTES-------------------
//AUTH
router.post("/auth/login", AuthLoginApiController.Login);
router.post("/auth/refresh-token", AuthLoginApiController.refreshToken);
router.post("/auth/register", AuthRegisterApiController.Register);
router.post("/auth/change-pw", AuthChangeFwApiController.changePassword);
router.post("/auth/request-otp", AuthForgotfwApiController.requestReset);
router.post("/auth/check-otp", AuthForgotfwApiController.verifyOTP);

router.post("/auth/forgot-pw", AuthForgotfwApiController.resetPassword)
//categories
router.get("/categories", asyncHandler(CategoryController.getAll));
router.get("/categories/:id", asyncHandler(CategoryController.getOne));
router.post("/categories", asyncHandler(CategoryController.create));
router.patch(
  "/categories/:id",
  asyncHandler(CategoryController.update)
);
router.delete("/categories/:id", asyncHandler(CategoryController.delete));
//comment
router.get("/comments/products/:id", asyncHandler(CommentController.getCommentsByProductId));
router.get(
  "/comments/users/:id",
  asyncHandler(CommentController.getCommentsByUserId)
);

router.post("/comments", asyncHandler(CommentController.create));
router.patch("/comments/:id", asyncHandler(CommentController.update));
router.delete("/comments/:id", asyncHandler(CommentController.delete));
//product
router.post("/products", asyncHandler(ProductController.create));
router.patch("/products/variations/", asyncHandler(ProductController.updateVariation));
router.patch("/products/:id", asyncHandler(ProductController.updateOne));

router.get("/products/:id", asyncHandler(ProductController.getById));
router.get("/products", asyncHandler(ProductController.getByQuery));
router.delete("/products/:id", asyncHandler(ProductController.deleteOne));
router.patch("/products/:id", asyncHandler(ProductController.activeProduct));
router.patch("/products/:id", asyncHandler(ProductController.unActiveProduct));
//blog

router.post("/blog/add", asyncHandler(BlogController.create));
router.get("/blog", asyncHandler(BlogController.getAllBlog));
router.get("/blog/:id", asyncHandler(BlogController.getOneBlog));
router.delete("/blog/:id", asyncHandler(BlogController.deleteBlog));
router.put("/blog/update/:id", asyncHandler(BlogController.updateBlog));

//order
router.post("/orders", asyncHandler(OrderController.create));
router.get("/orders/:id", asyncHandler(OrderController.getOrderById));
router.get("/orders", asyncHandler(OrderController.getAllOrder));
router.put("/orders/:id", asyncHandler(OrderController.updateOrder));
router.delete("/orders/:id", asyncHandler(OrderController.deleteOrder));

// cart
router.post("/cart", asyncHandler(CartController.create)); // create cart
router.get("/cart/:user_id", asyncHandler(CartController.getCartByOneUser)); // get cart one user
router.post("/cart/addproduct/:user_id", asyncHandler(CartController.addProductToCart));
router.delete("/cart/:user_id/:product_id", asyncHandler(CartController.deleteProductInCart));
router.get(
	"/cart/increment-quantity/:user_id/:product_id",
	asyncHandler(CartController.incrementQuantityProductInCart)
);
router.get(
	"/cart/decrement-quantity/:user_id/:product_id",
	asyncHandler(CartController.decrementQuantityProductInCart)
);


//discount
router.post(
  "/discounts",
  asyncHandler(DiscountController.create)
);
router.get(
  "/discounts",
  asyncHandler(DiscountController.getAll)
);
router.get(
  "/discounts/product/:productId",
  asyncHandler(DiscountController.getDiscountsByProductId)
);
router.get(
  "/discounts/:code",
  asyncHandler(DiscountController.getAllProductsWithDiscountCode)
);
router.post(
  "/discounts/active",
  asyncHandler(DiscountController.active)
);
router.post(
  "/discounts/inactive",
  asyncHandler(DiscountController.inActive)
);
router.get(
  "/discounts/cancel/",
  asyncHandler(DiscountController.cancelDiscount)
);

export default router;
