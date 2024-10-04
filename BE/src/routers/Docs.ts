import { authMiddleware, checkAdmin } from './../middlewares/AuthMiddleware';
import { Router } from "express";
import AuthChangeFwApiController from "../controllers/Api/Auth/ChangePassword";
import AuthForgotfwApiController from "../controllers/Api/Auth/ForgotPassword";
import AuthLoginApiController from "../controllers/Api/Auth/Login";
import AuthRegisterApiController from "../controllers/Api/Auth/Register";
import CategoryController from "../controllers/Api/Category.controller";

import BlogController from "../controllers/Api/blog.controller";
import { asyncHandler } from "../utils";
// import OrderController from "../controllers/Api/Order.Controller";
import CartController from "../controllers/Api/Cart.controller";
import UserController from "../controllers/Api/User.controller";
import DiscountController from "../controllers/Api/Discount.controller";
import { upload } from "../configs/multer.config";
import UploadController from "../controllers/Api/Upload.controller";
import BookController from "../controllers/Api/Book.controller";
import ReviewController from "../controllers/Api/Review.controller";
import OrderController from "../controllers/Api/Order.Controller";
import GiaoHangNhanhController from "../controllers/Api/GiaoHangNhanhTest.controller";
import PaymentController from "../controllers/Api/Vnpay.controller";
import VectorSearchController from "../controllers/Api/vectorSearch.controller";


const router = Router();


// **User API**
/**
 * @swagger
 * /api/users/google:
 *   post:
 *     summary: Create a user from Google account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: The user's name
 *               user_email:
 *                 type: string
 *                 description: The user's email address
 *               user_avatar:
 *                 type: string
 *                 description: The user's avatar URL
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/user-google", asyncHandler(UserController.createUserFromGoogle)); // create user from google

// user-service-common
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limit of users per page
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
router.get("/user", asyncHandler(UserController.getAll)); // get all

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
router.get("/user/:id", asyncHandler(UserController.getByUserId)); // get by id

/**
 * @swagger
 * /api/users/type-auth/{type}:
 *   get:
 *     summary: Get users by authentication type
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The authentication type (local, google)
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/user/type-auth/:type", asyncHandler(UserController.getAllUserByTypeAuth)); // get by type auth

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: The user's name
 *               user_email:
 *                 type: string
 *                 description: The user's email address
 *               user_phone_number:
 *                 type: string
 *                 description: The user's phone number
 *               user_password:
 *                 type: string
 *                 description: The user's password (hashed)
 *               user_status:
 *                 type: string
 *                 description: The user's status
 *               user_address:
 *                 type: string
 *                 description: The user's address
 *               user_reward_points:
 *                 type: number
 *                 description: The user's reward points
 *               user_role:
 *                 type: string
 *                 description: The user's role
 *               user_avatar:
 *                 type: string
 *                 description: The user's avatar URL
 *               user_gender:
 *                 type: string
 *                 description: The user's gender
 *               user_wishlist:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The user's wishlist (array of product IDs)
 *               user_auth_type:
 *                 type: string
 *                 description: The user's authentication type
 *               createAt:
 *                 type: string
 *                 format: date-time
 *                 description: User creation date
 *               updateAt:
 *                 type: string
 *                 format: date-time
 *                 description: User update date
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.put("/user/:id", asyncHandler(UserController.updateUser));

//--------------USER ROUTES-------------------
//AUTH

const authRouter = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login using email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 description: The user's email address
 *               user_password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The user's access token
 *                 refreshToken:
 *                   type: string
 *                   description: The user's refresh token
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/auth/login", AuthLoginApiController.Login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/auth/logout", AuthLoginApiController.Logout);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The user's refresh token
 *     responses:
 *       200:
 *         description: Access token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The user's access token
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/auth/refresh-token", AuthLoginApiController.refreshToken);


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: The user's name
 *               user_email:
 *                 type: string
 *                 description: The user's email address
 *               user_password:
 *                 type: string
 *                 description: The user's password
 *               user_phone_number:
 *                 type: string
 *                 description: The user's phone number
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/auth/register", AuthRegisterApiController.Register);

/**
 * @swagger
 * /api/auth/change-pw:
 *   post:
 *     summary: Change user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The user ID
 *               oldPassword:
 *                 type: string
 *                 description: The user's current password
 *               newPassword:
 *                 type: string
 *                 description: The user's new password
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the new password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/auth/change-pw", AuthChangeFwApiController.changePassword);


/**
 * @swagger
 * /api/auth/request-otp:
 *   post:
 *     summary: Request OTP for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 description: The user's email address
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/auth/request-otp", AuthForgotfwApiController.requestReset);

/**
 * @swagger
 * /api/auth/check-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 description: The user's email address
 *               user_otp:
 *                 type: string
 *                 description: The OTP code received by the user
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/auth/check-otp", AuthForgotfwApiController.verifyOTP);

/**
 * @swagger
 * /api/auth/forgot-pw:
 *   post:
 *     summary: Reset user password using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 description: The user's email address
 *               user_otp:
 *                 type: string
 *                 description: The OTP code received by the user
 *               newPassword:
 *                 type: string
 *                 description: The user's new password
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the new password
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */


router.post("/auth/forgot-pw", AuthForgotfwApiController.resetPassword);
// **Categories API**

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Category'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/categories", asyncHandler(CategoryController.getAll));

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Category'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/categories/:id", asyncHandler(CategoryController.getOne));


/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: The category's name
 *               category_thumb:
 *                 type: string
 *                 description: The category's thumbnail URL (optional)
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Category'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/categories", asyncHandler(CategoryController.create));

/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     summary: Update category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: The category's name (optional)
 *               category_thumb:
 *                 type: string
 *                 description: The category's thumbnail URL (optional)
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Category'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.patch("/categories/:id", asyncHandler(CategoryController.update));

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.delete("/categories/:id", asyncHandler(CategoryController.delete));

/**
 * @swagger
 * /api/categories/{id}/active:
 *   patch:
 *     summary: Activate category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Category'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */


router.patch("/categories/:id/active", asyncHandler(CategoryController.active));


/**
 * @swagger
 * /api/categories/{id}/inactive:
 *   patch:
 *     summary: Deactivate category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Category'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */


router.patch("/categories/:id/inactive", asyncHandler(CategoryController.inActive));
// **Review API**

/**
 * @swagger
 * /api/books/{bookId}/reviews:
 *   post:
 *     summary: Add a new review for a book
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user adding the review
 *               rating:
 *                 type: integer
 *                 description: The rating for the book (1-5)
 *               comment:
 *                 type: string
 *                 description: The review comment
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Review'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book or user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/books/:bookId/reviews", asyncHandler(ReviewController.addReview));


/**
 * @swagger
 * /api/books/{bookId}/reviews/{userId}:
 *   put:
 *     summary: Update an existing review for a book
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user who wrote the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: The updated rating for the book (1-5) (optional)
 *               comment:
 *                 type: string
 *                 description: The updated review comment (optional)
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Review'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book or user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.put("/books/:bookId/reviews/:userId", asyncHandler(ReviewController.updateReview));

/**
 * @swagger
 * /api/books/{bookId}/reviews/{userId}:
 *   delete:
 *     summary: Delete a review by user ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Review or user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.delete("/books/:bookId/reviews/:userId", asyncHandler(ReviewController.deleteReview));

/**
 * @swagger
 * /api/books/{bookId}/reviews:
 *   get:
 *     summary: Get reviews for a book
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: List of reviews for the book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Review'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/books/:bookId/reviews", asyncHandler(ReviewController.getReviews));

/**
 * @swagger
 * /api/books/{bookId}/reviews/{userId}:
 *   get:
 *     summary: Get review of a book by a specific user
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Review'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/books/:bookId/reviews/:userId", asyncHandler(ReviewController.getReviewByUser));

/**
 * @swagger
 * /api/books/reviews:
 *   get:
 *     summary: Get all reviews 
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Review'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/books/reviews", asyncHandler(ReviewController.getAllReviews));
//book
// Public routes


/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get books by query parameters
 *     tags: [Book]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword (optional)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID (optional)
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Author name (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limit of books per page (optional)
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Book'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/books", asyncHandler(BookController.getByQuery));

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/books/:id", asyncHandler(BookController.getById));

/**
 * @swagger
 * /api/books/slug/{slug}:
 *   get:
 *     summary: Get book by slug
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The book slug
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/books/slug/:slug", asyncHandler(BookController.getBySlug));

// Protected routes

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The book's title
 *               author:
 *                 type: string
 *                 description: The book's author
 *               isbn:
 *                 type: string
 *                 description: The book's ISBN
 *               description:
 *                 type: string
 *                 description: The book's description
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The book's price
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The book's discount (optional)
 *               sold:
 *                 type: number
 *                 description: The number of books sold (optional)
 *               coverImage:
 *                 type: string
 *                 description: The URL of the book's cover image
 *               publisher:
 *                 type: string
 *                 description: The book's publisher
 *               publicationDate:
 *                 type: string
 *                 format: date-time
 *                 description: The book's publication date
 *               language:
 *                 type: string
 *                 description: The book's language
 *               numberOfPages:
 *                 type: number
 *                 description: The book's number of pages
 *               format:
 *                 type: string
 *                 enum: [ "Hardcover", "Paperback" ]
 *                 description: The book's format (Hardcover or Paperback)
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The book's categories
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The book's tags
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: The book's rating (optional)
 *               slug:
 *                 type: string
 *                 description: The book's slug
 *               ebookDemoLink:
 *                 type: string
 *                 description: The link to the book's ebook demo
 *               reviews:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/Review'
 *               stock:
 *                 type: number
 *                 description: The book's stock quantity
 *               totalReviews:
 *                 type: number
 *                 description: The total number of reviews for the book
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Image ID
 *                     url:
 *                       type: string
 *                       description: Image URL
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   height:
 *                     type: number
 *                     format: float
 *                     description: Book height
 *                   width:
 *                     type: number
 *                     format: float
 *                     description: Book width
 *                   thickness:
 *                     type: number
 *                     format: float
 *                     description: Book thickness
 *                   unit:
 *                     type: string
 *                     description: Unit of measurement for dimensions
 *               weight:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                     format: float
 *                     description: Book weight
 *                   unit:
 *                     type: string
 *                     description: Unit of measurement for weight
 *               edition:
 *                 type: string
 *                 description: The book's edition
 *               series:
 *                 type: string
 *                 description: The book's series
 *               ageRange:
 *                 type: string
 *                 description: The book's age range
 *               isActive:
 *                 type: boolean
 *                 description: Indicates if the book is active
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Book creation date
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Book update date
 *     responses:
 *         201:
 *           description: Book created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Book'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 */

router.post("/books", asyncHandler(BookController.create));

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The book's title (optional)
 *               author:
 *                 type: string
 *                 description: The book's author (optional)
 *               isbn:
 *                 type: string
 *                 description: The book's ISBN (optional)
 *               description:
 *                 type: string
 *                 description: The book's description (optional)
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The book's price (optional)
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The book's discount (optional)
 *               sold:
 *                 type: number
 *                 description: The number of books sold (optional)
 *               coverImage:
 *                 type: string
 *                 description: The URL of the book's cover image (optional)
 *               publisher:
 *                 type: string
 *                 description: The book's publisher (optional)
 *               publicationDate:
 *                 type: string
 *                 format: date-time
 *                 description: The book's publication date (optional)
 *               language:
 *                 type: string
 *                 description: The book's language (optional)
 *               numberOfPages:
 *                 type: number
 *                 description: The book's number of pages (optional)
 *               format:
 *                 type: string
 *                 enum: [ "Hardcover", "Paperback" ]
 *                 description: The book's format (Hardcover or Paperback) (optional)
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The book's categories (optional)
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The book's tags (optional)
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: The book's rating (optional)
 *               slug:
 *                 type: string
 *                 description: The book's slug (optional)
 *               ebookDemoLink:
 *                 type: string
 *                 description: The link to the book's ebook demo (optional)
 *               reviews:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/Review'
 *                 description: The book's reviews (optional)
 *               stock:
 *                 type: number
 *                 description: The book's stock quantity (optional)
 *               totalReviews:
 *                 type: number
 *                 description: The total number of reviews for the book (optional)
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Image ID
 *                     url:
 *                       type: string
 *                       description: Image URL
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   height:
 *                     type: number
 *                     format: float
 *                     description: Book height (optional)
 *                   width:
 *                     type: number
 *                     format: float
 *                     description: Book width (optional)
 *                   thickness:
 *                     type: number
 *                     format: float
 *                     description: Book thickness (optional)
 *                   unit:
 *                     type: string
 *                     description: Unit of measurement for dimensions (optional)
 *               weight:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                     format: float
 *                     description: Book weight (optional)
 *                   unit:
 *                     type: string
 *                     description: Unit of measurement for weight (optional)
 *               edition:
 *                 type: string
 *                 description: The book's edition (optional)
 *                 type: string
 *                 description: The book's series
 *               ageRange:
 *                 type: string
 *                 description: The book's age range
 *               isActive:
 *                 type: boolean
 *                 description: Indicates if the book is active
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Book creation date
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Book update date
 *     responses:
 *         201:
 *           description: Book created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Book'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 */

router.put("/books/:id", asyncHandler(BookController.updateOne));

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.delete("/books/:id", asyncHandler(BookController.deleteOne));

/**
 * @swagger
 * /api/books/{id}/unactive:
 *   patch:
 *     summary: Deactivate book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.patch("/books/:id/unactive", asyncHandler(BookController.unActiveBook));

/**
 * @swagger
 * /api/books/{id}/active:
 *   patch:
 *     summary: Activate book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.patch("/books/:id/active", asyncHandler(BookController.activeBook));

/**
 * @swagger
 * /api/books/category/{category_id}/discount:
 *   patch:
 *     summary: Set discount for books in a specific category
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The discount value to apply
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.patch("/books/category/:category_id/discount", asyncHandler(BookController.setDiscountByCategoryId));

/**
 * @swagger
 * /api/books/discount:
 *   patch:
 *     summary: Set discount for all books
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The discount value to apply
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.patch("/books/discount", asyncHandler(BookController.setDiscountToAll));

/**
 * @swagger
 * /api/books/{id}/discount:
 *   patch:
 *     summary: Set discount for a specific book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The discount value to apply
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.patch("/books/:id/discount", asyncHandler(BookController.setDiscountByBookId));

/**
 * @swagger
 * /api/books/{id}/sold:
 *   patch:
 *     summary: Update the sold number of a book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: The new sold quantity
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.patch("/books/:id/sold", asyncHandler(BookController.updateSoldNumber));
//blog

// Blog API
/**
 * @swagger
 * /api/blog/add:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_title:
 *                 type: string
 *                 description: The blog post's title
 *               blog_content:
 *                 type: string
 *                 description: The blog post's content
 *               blog_author:
 *                 type: string
 *                 description: The author's ID of the blog post
 *               blog_tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The blog post's tags
 *               blog_slug:
 *                 type: string
 *                 description: The blog post's slug
 *               blog_image:
 *                 type: string
 *                 description: The blog post's image URL
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Blog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/blog/add", asyncHandler(BlogController.create));

/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Blog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/blog/views/:userId/:blogId", asyncHandler(BlogController.views));

/**
 * @swagger
 * /api/blog/views/{userId}/{blogId}:
 *   post:
 *     summary: Increment view count for a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user viewing the blog
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog being viewed
 *     responses:
 *       200:
 *         description: View count incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog or User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/blog", asyncHandler(BlogController.getAllBlogs));

/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Blog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/blog/:id", asyncHandler(BlogController.getOneBlog));

/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.delete("/blog/:id", asyncHandler(BlogController.deleteBlog));

/**
 * @swagger
 * /api/blog/update/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_title:
 *                 type: string
 *                 description: The blog title
 *               blog_content:
 *                 type: string
 *                 description: The blog content
 *               blog_author:
 *                 type: string
 *                 description: The blog author ID
 *               blog_tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of blog tags
 *               blog_slug:
 *                 type: string
 *                 description: The blog slug
 *               blog_image:
 *                 type: string
 *                 description: The blog image URL
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Blog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.put("/blog/update/:id", asyncHandler(BlogController.updateBlog));
//blogcomment

/**
 * @swagger
 * /api/blog/addcomment/{blogId}:
 *   post:
 *     summary: Add a new comment to a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_author:
 *                 type: string
 *                 description: The user ID of the comment author
 *               comment_content:
 *                 type: string
 *                 description: The content of the comment
 *               comment_likes:
 *                 type: integer
 *                 format: int32
 *                 description: The number of likes for the comment (optional)
 *               likedBy:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: User IDs who liked the comment (optional)
 *               comment_createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the comment was created
 *               comment_updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the comment was last updated
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Comment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/blog/addcomment/:blogId", asyncHandler(BlogController.addComment));

/**
 * @swagger
 * /api/blog/commentblog/{blogId}:
 *   get:
 *     summary: Get all comments for a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Comment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/blog/commentblog/:blogId", asyncHandler(BlogController.getComments));

/**
 * @swagger
 * /api/blog/updatecommentBlog/{blogId}/{commentId}:
 *   put:
 *     summary: Update comment for a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_content:
 *                 type: string
 *                 description: The updated content of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog or comment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.put("/blog/updatecommentBlog/:blogId/:commentId", asyncHandler(BlogController.updateComment));

/**
 * @swagger
 * /api/blog/deletecommentBlog/{blogId}/{commentId}:
 *   delete:
 *     summary: Delete comment for a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to delete
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog or comment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.delete("/blog/deletecommentBlog/:blogId/:commentId", asyncHandler(BlogController.deleteComment));

/**
 * @swagger
 * /api/blog/likecomment/{blogId}/{commentId}:
 *   post:
 *     summary: Like a comment on a blog post
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog post ID
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment' 
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog post or comment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/blog/likecomment/:blogId/:commentId", asyncHandler(BlogController.likeComment));

//order
// router.post("/orders", asyncHandler(OrderController.create));
// router.get("/orders/:id", asyncHandler(OrderController.getOrderById));
// router.get("/orders", asyncHandler(OrderController.getAllOrder));
// router.put("/orders/:id", asyncHandler(OrderController.updateOrder));
// router.delete("/orders/:id", asyncHandler(OrderController.deleteOrder));

// cart


/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_user_id:
 *                 type: string
 *                 description: The user ID associated with the cart
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/cart", asyncHandler(CartController.create)); // create cart

/**
 * @swagger
 * /api/cart/{user_id}:
 *   get:
 *     summary: Get cart by user ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Cart found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get("/cart/:user_id", asyncHandler(CartController.getCartByOneUser)); // get cart one user

/**
 * @swagger
 * /api/cart/addproduct/{user_id}:
 *   post:
 *     summary: Add a product to user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The product ID
 *               product_quantity:
 *                 type: integer
 *                 description: The quantity of the product
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/cart/addproduct/:user_id", asyncHandler(CartController.addProductToCart));

/**
 * @swagger
 * /api/cart/{user_id}/{product_id}:
 *   delete:
 *     summary: Delete a product from user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted from cart successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User or Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.delete("/cart/:user_id/:product_id", asyncHandler(CartController.deleteProductInCart));

/**
 * @swagger
 * /api/cart/increment-quantity/{user_id}/{product_id}:
 *   get:
 *     summary: Increment quantity of a product in cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product's ID
 *     responses:
 *       200:
 *         description: Quantity incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User or product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get(
    "/cart/increment-quantity/:user_id/:product_id",
    asyncHandler(CartController.incrementQuantityProductInCart)
);

/**
 * @swagger
 * /api/cart/decrement-quantity/{user_id}/{product_id}:
 *   get:
 *     summary: Decrement quantity of a product in cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product's ID
 *     responses:
 *       200:
 *         description: Quantity decremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User or product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.get(
    "/cart/decrement-quantity/:user_id/:product_id",
    asyncHandler(CartController.decrementQuantityProductInCart)
);

/**
 * @swagger
 * /api/cart/select/{user_id}:
 *   put:
 *     summary: Select products for checkout
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the product in the cart
 *                 selected:
 *                   type: boolean
 *                   description: Indicates if the product is selected for checkout
 *     responses:
 *       200:
 *         description: Products selected successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found or cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.put("/cart/select/:user_id", asyncHandler(CartController.selectProductToCheckOut));

//discount

/**
 * @swagger
 * /api/discounts:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount_name:
 *                 type: string
 *                 description: The discount's name
 *               discount_code:
 *                 type: string
 *                 description: The discount's code
 *               discount_type:
 *                 type: string
 *                 enum: [ "percentage", "fixed_amount" ]
 *                 description: The discount's type (percentage or fixed_amount)
 *               discount_description:
 *                 type: string
 *                 description: The discount's description
 *               discount_value:
 *                 type: number
 *                 format: float
 *                 description: The discount's value
 *               discount_applies_to:
 *                 type: string
 *                 enum: [ "all", "specific", "category" ]
 *                 description: The discount's applies_to (all, specific, category)
 *               discount_product_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of product IDs that the discount applies to (optional)
 *               discount_category_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of category IDs that the discount applies to (optional)
 *               discount_stock:
 *                 type: number
 *                 description: The discount's stock (number of times it can be used)
 *               discount_min_order_value:
 *                 type: number
 *                 format: float
 *                 description: The minimum order value to apply the discount
 *               discount_max_use_per_user:
 *                 type: number
 *                 description: The maximum number of times a user can use the discount
 *               discount_users_used:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of user IDs that have used the discount
 *               discount_is_active:
 *                 type: boolean
 *                 description: Indicates if the discount is active
 *               discount_start_date:
 *                 type: string
 *                 format: date-time
 *                 description: The discount's start date
 *               discount_end_date:
 *                 type: string
 *                 format: date-time
 *                 description: The discount's end date
 *     responses:
 *       201:
 *         description: Discount created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Discount' 
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

router.post("/discounts", asyncHandler(DiscountController.create));
router.get("/discounts", asyncHandler(DiscountController.getAll));
router.put("/discounts/:id", asyncHandler(DiscountController.update));
router.delete("/discounts/:code", asyncHandler(DiscountController.delete));
router.get("/discounts/book/:bookId", asyncHandler(DiscountController.getDiscountsByBook));
router.post("/discounts/activate", asyncHandler(DiscountController.activate));
router.post("/discounts/deactivate", asyncHandler(DiscountController.deactivate));
router.post("/discounts/cancel", asyncHandler(DiscountController.cancelDiscount));
router.post("/discounts/amount", asyncHandler(DiscountController.getDiscountAmount));

//upload
router.post("/upload", upload.array("files", 10), asyncHandler(UploadController.upload));
router.post("/upload/delete", asyncHandler(UploadController.delete));

//checkoutAmount


//checkoutAmount 

router.post("/orders/checkout-review", asyncHandler(OrderController.checkoutReview))

// giao hàng nhanh 
router.post("/giao-hang-nhanh/create", asyncHandler(GiaoHangNhanhController.CreateTest))
router.post("/chi-tiet-don-hang", asyncHandler(GiaoHangNhanhController.getDetail))
router.get("/get-province", asyncHandler(GiaoHangNhanhController.GetProvince))
router.post("/giao-hang-nhanh/preview-shipfee", asyncHandler(GiaoHangNhanhController.PreviewShipFee))

router.post("/orders/checkout-review", asyncHandler(OrderController.checkoutReview));

// giao hàng nhanh
router.post("/giao-hang-nhanh/create", asyncHandler(GiaoHangNhanhController.CreateTest));
router.post("/chi-tiet-don-hang", asyncHandler(GiaoHangNhanhController.getDetail));
router.get("/get-province", asyncHandler(GiaoHangNhanhController.GetProvince));

// advanced search and similar books
router.post("/search", asyncHandler(VectorSearchController.advancedSearch))
router.post("/loaddata", asyncHandler(VectorSearchController.loadData))

//payment\
router.get("/payment/bank-list", asyncHandler(PaymentController.getBankList))
router.post("/payment/create-payment-url", asyncHandler(PaymentController.getPaymentUrl))
router.post("/payment/verify-url", asyncHandler(PaymentController.verifyUrl))

