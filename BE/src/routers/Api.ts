import { Router } from "express";
import AuthLoginApiController from "../controllers/Api/Auth/Login";
import AuthForgotfwApiController from "../controllers/Api/Auth/ForgotPassword";
import AuthChangeFwApiController from "../controllers/Api/Auth/ChangePassword";
import AuthRegisterApiController from "../controllers/Api/Auth/Register";
import UserApiController from "../controllers/Api/Users/UserApiController";
import CategoryController from "../controllers/Api/Category.controller";
import CommentController from "../controllers/Api/Comment.controller";
import ProductController from "../controllers/Api/Product.controller";
import BlogController from "../controllers/Api/blog.controller";
import { asyncHandler } from "../utils";
import OrderController from "../controllers/Api/Order.Controller";
const router = Router();

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

//USER
router.get("/users", UserApiController.getAllUsers);
router.get("/users/:id", UserApiController.getUser);
router.delete("users/:id", UserApiController.DeleteUser);
//--------------KHÁC ROUTES-------------------

//category
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
export default router;

