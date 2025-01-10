import mongoose from "mongoose";
import { IOrderPayment, IOrderProduct, IOrderShipping, IUserInfo } from "../../interfaces/models/IOrder";

export interface CheckoutReviewInputDTO {
    userId?: string;
    products: IOrderItem[];
    code?: string;
}
export interface IOrderItem {
    bookId: string;
    quantity: number;
    code?: string;
}


export interface CreateOrderInputDTO {
    email: string;
    userId: mongoose.Types.ObjectId | string;
    shipping: IOrderShipping;
    userInfo: IUserInfo
    payment: IOrderPayment;
    products: IOrderProduct[];
    total: number;
    trackingNumber: string;
    code?: string
}

