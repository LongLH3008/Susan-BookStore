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
