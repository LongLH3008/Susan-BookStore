import { IRefreshToken } from '../interfaces/models/IRefresToken';
import mongoose from "mongoose";


const RefreshTokenSchema = new mongoose.Schema<IRefreshToken>({
    refreshToken: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiredAt: {
        type: Date,
        required: true
    }
})
const RefreshTokenModel = mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
export default RefreshTokenModel