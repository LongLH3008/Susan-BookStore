import { IAuthUser, IUser } from "../../../interfaces/models/IUser"
import jwt from "jsonwebtoken";
import Locals from "../../../providers/Locals";

class AccessToken {
    public static generateAccessToken(user: IAuthUser) {
        const accesstoken = Locals.config().jwtAccessKey;
        // console.log(accesstoken)
        if(!accesstoken) {
            throw new Error("No token provided");
        }
        return jwt.sign(
            {
                id: user.id,
                user_role: user.user_role
            },
            accesstoken,
            {
                expiresIn: "1d"
            }
        );
    }
}

export default AccessToken;