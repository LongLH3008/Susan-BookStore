import User from "../models/User.model"
import { UserTypeAuth } from "../interfaces/models/IUser"
import { userGoogleSchema } from "../schemas/user.schema"
import { ConflictError, InternalServerError, ResourceNotFoundError } from "../cores/error.response"
import { validate } from "../schemas"

class UserService {

    // auth google
    static async createUserFromGoogle(
        { user_name,
            user_email,
            user_avatar
        }: {
            user_name: string,
            user_email: string,
            user_avatar: string
        } | any
    ) {
        validate(userGoogleSchema, { user_name, user_email })

        const checkEmailExist = await User.findOne({
            user_email: user_email,
            user_auth_type: "google"
        })
        if (checkEmailExist) throw new ConflictError("this email is already exist !, try with another email ")
        const newUser = await User.create({
            user_name,
            user_email,
            user_avatar,
            user_auth_type: UserTypeAuth.google
        })
        if (!newUser) throw new InternalServerError("server error, try again in 5 minutes")
        return newUser
    }

    static async updateUserAuthTypeGoogle() {

    }


    // common user
    static async getAll() {
        const allUsers = await User.find()
        if (!allUsers) throw new InternalServerError("server error, try agian in 5 minnutes !")
        return allUsers
    }

    static async getUserById({ id }: { id: string }) {
        const userById = await User.findById(id)
        if (!userById) throw new ResourceNotFoundError("this user does not exist !")
        return userById

    }

    // lấy user theo phương thức đăng ký local | google
    static async getAllUsersByTypeAuth({ type }: { type: UserTypeAuth }) {
        const userByTypeAuth = await User.findOne({
            user_auth_type: type
        })
        return userByTypeAuth
    }


    

}

export default UserService