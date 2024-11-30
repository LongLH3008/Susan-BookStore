import mongoose from "mongoose";
import { IOrderPayment, IOrderProduct, IOrderShipping } from "../../interfaces/models/IOrder";

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
    userId: mongoose.Types.ObjectId | string;
    shipping: IOrderShipping;
    payment: IOrderPayment;
    products: IOrderProduct[];
    total: number;
    trackingNumber: string;
}

