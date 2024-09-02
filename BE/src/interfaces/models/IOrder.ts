import mongoose from "mongoose";

export enum OrderState {
    pending = "pending", confirmed = "confirmed", shipped = "shipped", cancelled = "cancelled"
}

export interface IOrderProduct {
    bookId: mongoose.Types.ObjectId | string;
    title: string;
    quantity: number;
    price: number;
    weight: number;
    height?: number;
    thickness?: number;
    width?: number;
    subtotal: number;
    discount?: number;
    discountAmount?: number
    total: number;
    discount_code?: string;
    discountAmountVoucher: number;
}
export interface IOrderShipping {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    fee: number;
}
export interface IOrderPayment {
    method: PaymentMethod;
    amount: number;
    status: PaymentStatus;
    date: Date;
}
export enum PaymentMethod {
    CreditCard = "credit_card",
    PayPal = "paypal",
    Other = "other",
}

export enum PaymentStatus {
    Authorized = "authorized",
    Processed = "processed",
    Failed = "failed",
}
export interface IOrder {
    userId: mongoose.Types.ObjectId | string;
    shipping: IOrderShipping;
    state: OrderState;
    payment: IOrderPayment;
    products: IOrderProduct[];
    total: number;
    trackingNumber: string;
};


