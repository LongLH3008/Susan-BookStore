import mongoose from "mongoose"
import { IUser, UserRole, UserStatus, UserTypeAuth } from "../interfaces/models/IUser";

const COLLECTION_NAME = "User";
const DOCUMENT_NAME = "Users";


export interface IUserModel extends IUser, mongoose.Document { }

const Userchema = new mongoose.Schema<IUserModel>(
    {
        user_name: {
            type: String,
            required: false,
        },
        user_email: {
            type: String,
            required: true,
        },
        user_phone_number: {
            type: String,
            required: false,
        },
        user_password: {
            type: String,
            required: false,
        },
        user_status: {
            type: String,
            enum: UserStatus,
            default: UserStatus.active,
        },

        user_address: {
            type: String,
            required: false,
        },
        user_role: {
            type: String,
            enum: UserRole,
            default: UserRole.user,
        },
        user_avatar: {
            type: String,
            default: "",
        },
        user_gender: {
            type: String,
            default: "",
        },
        user_auth_type: {
            type: String,
            required: true,
            enum: UserTypeAuth,
            default: UserTypeAuth.local
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const User = mongoose.model<IUserModel>(DOCUMENT_NAME, Userchema);
export default User
