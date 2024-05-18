import { Router, Request, Response, NextFunction } from "express";
import Locals from "../providers/Locals";
import UserApiController from "../controllers/Api/UserApiController";

const router = Router();

router.get('/users', UserApiController.getAllUsers);
router.get('/users/:id', UserApiController.getUser);
router.post('/users', UserApiController.storeUser);

export default router;