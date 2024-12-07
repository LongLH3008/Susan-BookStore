import mongoose from "mongoose";

export enum OrderState {
    pending = "pending", confirmed = "confirmed", shipped = "shipped", cancelled = "cancelled" , "success" = "success"
}

export interface IOrderProduct {
    bookId: mongoose.Types.ObjectId | string;
    name: string
    title: string;
    quantity: number;
    price: number;
    subtotal: number;
    discount?: number;
    discountAmount?: number
    total: number;
    discountAmountVoucher: number;
    weight?: number;
    height?: number;
    width?: number;
    length?: number
    isbn?: string;
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
    VNPAY = "VNPAY",
    COD = "COD",
}

export enum PaymentStatus {
    Authorized = "authorized",
    Processed = "processed",
    Failed = "failed",
}

export interface IOrder {
    userId: mongoose.Types.ObjectId | string | null;
    shipping: IOrderShipping;
    state: OrderState;
    payment: IOrderPayment;
    products: IOrderProduct[];
    total: number;
    trackingNumber: string;
    code?: string;
};


