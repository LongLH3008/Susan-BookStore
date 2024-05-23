import User from "../models/User.model"
import { UserTypeAuth } from "../interfaces/models/IUser"
import { userGoogleSchema } from "../schemas/user.schema"
import { ConflictError, InternalServerError, ResourceNotFoundError } from "../cores/error.response"
import { validate } from "../schemas"
import { deleteNullObject } from "../utils"


class UserService {

    /**
     * google user
     */

    // create
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

    /**
     * common user
    */

    // get all 
    static async getAll({ page, limit }: { page: number, limit: number }) {
        const skip = (page - 1) * limit
        const allUsers = await User.find({}).skip(skip).limit(limit).lean()
        const totalNumberOfUser = await User.countDocuments();
        if (!allUsers) throw new InternalServerError("server error, try agian in 5 minnutes !")
        return { totalNumberOfUser, page, limit, allUsers }
    }

    // get by id 
    static async getUserById({ id }: { id: string }) {
        const userById = await User.findById(id)
        if (!userById) throw new ResourceNotFoundError("this user does not exist !")
        return userById

    }

    // get by auth_type : local | google
    static async getAllUsersByTypeAuth({ type }: { type: UserTypeAuth }) {
        const userByTypeAuth = await User.findOne({
            user_auth_type: type
        })
        return userByTypeAuth
    }

    // update user 
    static async updateUser(id: string, data: any) {
        const updateObject = deleteNullObject(data)
        const chechUser = await User.findById(id)
        if (!chechUser) throw new ResourceNotFoundError("User does not exist !")

        const updateProduct = await User.findByIdAndUpdate(id, updateObject, { new: true })
        if (!updateObject) throw new InternalServerError("Server error, try agian in 5 munites!")

        return updateProduct
    }

    // delete user 
    static async deleteUser(id: string) {
        const chechUser = await User.findById(id)
        if (!chechUser) throw new ResourceNotFoundError("User does not exist !")

        await User.findByIdAndDelete(id)
        return {
            message: `User with id: ${id} has been deleted ! `
        }

    }







}



export default UserService