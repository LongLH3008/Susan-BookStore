import { Router } from "express";
import AuthChangeFwApiController from "../controllers/Api/Auth/ChangePassword";
import AuthForgotfwApiController from "../controllers/Api/Auth/ForgotPassword";
import AuthLoginApiController from "../controllers/Api/Auth/Login";
import AuthRegisterApiController from "../controllers/Api/Auth/Register";
import CategoryController from "../controllers/Api/Category.controller";
import CommentController from "../controllers/Api/Comment.controller";
import ProductController from "../controllers/Api/Product.controller";
import UserController from "../controllers/Api/User.controller";
import BlogController from "../controllers/Api/blog.controller";
import { asyncHandler } from "../utils";
import OrderController from "../controllers/Api/Order.Controller";
import CartController from "../controllers/Api/Cart.controller";
const router = Router();

// user-google
router.post('/user-google', asyncHandler(UserController.createUserFromGoogle)) // create user from google

// user-service-common
router.get('/user', asyncHandler(UserController.getAll)) // get all
router.get('/user/:id', asyncHandler(UserController.getByUserId)) // get by id
router.get('/user/type-auth/:type', asyncHandler(UserController.getAllUserByTypeAuth)) // get by type auth
router.put('/user/:id', asyncHandler(UserController.updateUser))


//--------------USER ROUTES-------------------
//AUTH
router.post("/auth/login", AuthLoginApiController.Login);
router.post("/auth/register", AuthRegisterApiController.Register);
router.post(
  "/forgotpassword",
  AuthForgotfwApiController.resetPasswordRequest,
  AuthForgotfwApiController.ForgotPassword
);
router.post("/changepassword", AuthChangeFwApiController.changePassword);


router.get('/categories', asyncHandler(CategoryController.getAll));
router.get('/categories/:id', asyncHandler(CategoryController.getOne));
router.post('/categories', asyncHandler(CategoryController.create));
router.patch('/categorcategoriesies/:id', asyncHandler(CategoryController.update));
router.delete('/categories', asyncHandler(CategoryController.delete));
//comment
router.get('/comments', asyncHandler(CommentController.getCommentsByProductId));
router.get('/comments/:id', asyncHandler(CommentController.getCommentsByUserId));
router.post('/comments', asyncHandler(CommentController.create));
router.patch('/comments/:id', asyncHandler(CommentController.update));
router.delete('/comments', asyncHandler(CommentController.delete));
//product 
router.post('/products', asyncHandler(ProductController.create));
router.get('/products', asyncHandler(ProductController.getByQuery));
//blog

router.post('/blog/add', asyncHandler(BlogController.create));
router.get('/blog', asyncHandler(BlogController.getAllBlog));
router.get("/blog/:id", asyncHandler(BlogController.getOneBlog));
router.delete("/blog/:id", asyncHandler(BlogController.deleteBlog));
router.put("/blog/update/:id", asyncHandler(BlogController.updateBlog));

//order
router.post('/orders', asyncHandler(OrderController.create));
router.get('/orders/:id', asyncHandler(OrderController.getOrderById));
router.get('/orders', asyncHandler(OrderController.getAllOrder));
router.put('/orders/:id', asyncHandler(OrderController.updateOrder));
router.delete('/orders/:id', asyncHandler(OrderController.deleteOrder));
// cart 
router.post('/cart', asyncHandler(CartController.create)) // create cart
router.get('/cart/:user_id', asyncHandler(CartController.getCartByOneUser)) // get cart one user


export default router;

