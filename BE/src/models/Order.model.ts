import mongoose from "mongoose";
import {
    IOrder,
    OrderState,
    PaymentMethod,
    PaymentStatus,
} from "../interfaces/models/IOrder";

const COLLECTION_NAME = "Order";
const DOCUMENT_NAME = "Orders";

export interface IOrderModel extends IOrder, mongoose.Document {
}

const OrderSchema = new mongoose.Schema<IOrderModel>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        userInfo: {
            name: {
                type: String,
                required: true
            }, phoneNumber: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }

        },
        code: {
            type: String,
            default: ""
        },
        shipping: {
            street: {type: String, required: true},
            city: {type: String, required: true},
            state: {type: String, required: true},
            zipcode: {type: String, required: true},
            country: {type: String, required: true},
            fee: {type: Number, required: true, min: 0},
        },
        state: {
            type: String,
            enum: OrderState,
            default: OrderState.pending,
        },
        payment: {
            method: {type: String, required: true, enum: PaymentMethod},
            amount: {type: Number, required: true, min: 0},
            status: {type: String, required: true, enum: PaymentStatus},
            date: {type: Date, required: true},
        },
        products: [{
            bookId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Books"},
            title: {type: String, required: true},
            quantity: {type: Number, required: true, min: 1},
            price: {type: Number, required: true, min: 0},
            subtotal: {type: Number, required: true},
            discount: {type: Number, min: 0},
            total: {type: Number, required: true},
            discountAmountVoucher: {type: Number, required: true},
            discountAmount: {type: Number, required: true},
            isbn: {type: String, required: true},
            length: {type: Number, required: true},
            width: {type: Number, required: true},
            weight: {type: Number, required: true},
            height: {type: Number, required: true}

        }],
        total: {
            type: Number,
            required: true,
            min: 0,
        },
        trackingNumber: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const Order = mongoose.model<IOrderModel>(DOCUMENT_NAME, OrderSchema);
export default Order;
