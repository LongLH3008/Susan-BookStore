import { Router, Response, Request, NextFunction } from "express";
import Locals from "../providers/Locals";
import HomePage from "../controllers/Web/HomePage";
import GoogleAuth from "./auth/google-auth"

const router = Router();

// google auth 
router.use('/auth', GoogleAuth)

// web
router.get('/', HomePage.index);


export default router;