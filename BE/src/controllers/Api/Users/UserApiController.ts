import { Response, Request, NextFunction } from "express";
import User from "../../../models/User.model";
class UserApiController {
  public static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const allUsers = await User.find({});
      if (allUsers.length == 0) {
        return res.json({ mes: "No one avaiable" });
      }
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(404).json({ mes: error });
    }
  }

  public static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.find({ _id: req.params.id });
      if (!user) {
        return res.json({ mes: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ mes: error });
    }
  }

  public static async DeleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User delete successfully", user });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  }
}

export default UserApiController;
