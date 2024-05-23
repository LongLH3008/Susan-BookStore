import bcrypt from "bcrypt";
import User from "../../../models/User.model";
import AccessToken from "./AccessToken";
import { validate } from "../../../schemas";
import { loginSchema } from "../../../schemas/user.schema";
class Login {
  public static async Login(req: any, res: any): Promise<any> {
    try {
      const { user_email, user_password } = req.body;
      validate(loginSchema, { user_email, user_password });
      const user: any = await User.findOne({ user_email: user_email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const comparePW = await bcrypt.compare(user_password, user.user_password);
      if (!comparePW) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const accessToken = AccessToken.generateAccessToken(user);
      return res.status(200).json({
        message: "Login successfully",
        user,
        accessToken,
      });
    } catch (error:any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default Login;
