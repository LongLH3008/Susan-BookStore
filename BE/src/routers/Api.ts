import { Router, Request, Response, NextFunction } from "express";
import Locals from "../providers/Locals";
import UserApiController from "../controllers/Api/UserApiController";

const router = Router();

router.get('/users', UserApiController.getAllUsers);

export default router;