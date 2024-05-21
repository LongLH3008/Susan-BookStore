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
import UserController from "../controllers/Api/User.controller";


const router = Router();

// user-google
router.post('/user-google', asyncHandler(UserController.createUserFromGoogle)) // create user from google

// user-service-common
router.get('/user', asyncHandler(UserController.getAll)) // get all
router.get('/user/:id', asyncHandler(UserController.getByUserId)) // get by id
router.get('/user/type-auth/:type', asyncHandler(UserController.getAllUserByTypeAuth)) // get by type auth



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
router.patch('/categories/:id', asyncHandler(CategoryController.update));
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
export default router;

