import { Router, Response, Request, NextFunction } from "express";
import Locals from "../providers/Locals";
import HomePage from "../controllers/Web/HomePage";

const router = Router();

router.get('/', HomePage.index);

export default router;