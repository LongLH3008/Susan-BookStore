import { Router } from "express";
import AuthLoginApiController from "../controllers/Api/Auth/Login";
import AuthForgotfwApiController from "../controllers/Api/Auth/ForgotPassword";
import AuthChangeFwApiController from "../controllers/Api/Auth/ChangePassword";
import AuthRegisterApiController from "../controllers/Api/Auth/Register";
import UserApiController from "../controllers/Api/Users/UserApiController";
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

export default router;
import CategoryController from "../controllers/Api/Category.controller";
import CommentController from "../controllers/Api/Comment.controller";
import ProductController from "../controllers/Api/Product.controller";
import { asyncHandler } from "../utils";


const router = Router();


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


export default router;

