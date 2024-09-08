import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import Locals from "../providers/Locals";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  
  try {
    // Verify the token
    const decoded: any = jwt.verify(token, Locals.config().jwtKey); 
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
