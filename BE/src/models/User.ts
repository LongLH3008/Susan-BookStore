import { IUser } from "../interfaces/models/IUser";
import mongoose from '../providers/Database';
import * as mongooseORM from "mongoose";

export interface IUserModel extends IUser, mongooseORM.Document{}

export const UserSchema = new mongooseORM.Schema<IUserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    // createAt: {
    //     type: Date,
    //     required: true
    // },
    // updateAt: {
    //     type: Date,
    //     required: true
    // },
}, {
    timestamps: true
});

const User = mongooseORM.model<IUserModel>('User', UserSchema);
export default User;