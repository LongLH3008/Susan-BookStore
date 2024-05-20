import { Router } from "express";
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
