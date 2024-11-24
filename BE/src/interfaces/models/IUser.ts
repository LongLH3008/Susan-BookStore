import mongoose from "mongoose"

export enum UserStatus {
    active = "active",
    block = "block",
}

export enum UserRole {
    admin = "admin", user = "user", root = "root"
}

export enum UserTypeAuth {
    local = "local",
    google = "google"
}

declare global {
    namespace Express {
      
        interface User extends IUser, mongoose.Document { }
    }
}
export interface IUser {
    user_name: string
    user_otp: string
    user_email: string
    user_phone_number: string
    user_password: string
    user_status: UserStatus
    user_address: string
    user_reward_points: number
    user_role: UserRole
    user_avatar: string
    user_gender: string
    user_wishlist: string[] | mongoose.Schema.Types.ObjectId[]
    user_auth_type: UserTypeAuth
    createAt: Date | string
    updateAt: Date | string
    expiresAt: Date | string
}
export interface IAuthUser {
    id: string,
    user_name: string
    user_email: string
    user_phone_number: string
    user_password: string
    user_status: UserStatus
    user_address: string
    user_role: UserRole
    user_avatar: string
    user_gender: string
    createAt: Date | string
    updateAt: Date | string
}


