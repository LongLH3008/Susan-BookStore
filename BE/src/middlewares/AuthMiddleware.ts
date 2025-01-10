import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import Locals from "../providers/Locals";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  // console.log("Authorization Header: ", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded: any = jwt.verify(token, Locals.config().jwtAccessKey);
    // console.log("Decoded JWT: ", decoded);

    // Đảm bảo người dùng tồn tại trong cơ sở dữ liệu
    const user = await User.findById(decoded.id);
    // console.log("User Found: ", user);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    // Đính kèm thông tin người dùng vào đối tượng yêu cầu
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Lấy token từ header Authorization
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Giải mã token và kiểm tra vai trò người dùng
    const decoded = jwt.verify(token, Locals.config().jwtAccessKey);

    // Kiểm tra nếu token không chứa thông tin user hoặc không có user_role
    if (!decoded || typeof decoded !== "object" || !("user_role" in decoded)) {
      return res.status(403).json({ message: "Forbidden: Invalid token data" });
    }

    // Kiểm tra quyền admin
    if (decoded.user_role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: bạn không phải là admin" });
    }

    // Nếu là admin, tiếp tục vào các controller khác
    next();
  } catch (error: any) {
    console.error("Error in checkAdmin middleware: ", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
