import jwt from "jsonwebtoken";
import Locals from "../../../providers/Locals";

class RefreshToken {
  public static generateRefreshToken(user: any) {
    const refreshtoken = Locals.config().jwtRefreshKey;
    if (!refreshtoken) {
      throw new Error("No token provided refresh!");
    }
    return jwt.sign(
      {
        id: user.id,
        user_role: user.user_role,
      },
      refreshtoken,
      {
        expiresIn: "365d",
      }
    );
  }

  public static verifyRefreshToken(token: string) {
    const refreshtoken = Locals.config().jwtRefreshKey;
    if (!refreshtoken) {
      throw new Error("No token provided");
    }

    try {
      return jwt.verify(token, refreshtoken);
    } catch (error) {
      return null;
    }
  }
}

export default RefreshToken;
