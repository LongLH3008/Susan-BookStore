import mongoose from "mongoose";
import { IOrder, OrderState, PaymentMethod, PaymentStatus } from "../interfaces/models/IOrder";

const COLLECTION_NAME = "Order";
const DOCUMENT_NAME = "Orders";


export interface IOrderModel extends IOrder, mongoose.Document { }

const OrderSchema = new mongoose.Schema<IOrderModel>(
    {

        order_user_id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users", required: true
        },
        order_shipping: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipcode: { type: String, required: true },
            country: { type: String, required: true }
        },
        order_payment: {
            payment_id: { type: String, required: true },
            payment_method: { type: String, required: true, enum: PaymentMethod },
            payment_amount: { type: Number, required: true, min: 0 },
            payment_status: { type: String, required: true, enum: PaymentStatus },
            payment_date: { type: Date, required: true },
        },
        order_products: {

            order_item_id: { type: String, required: true },
            product_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Products" },
            product_name: { type: String, required: true },
            product_quantity: { type: Number, required: true, min: 1 },
            product_price: { type: Number, required: true, min: 0 },
            product_subtotal: { type: Number, required: true, computed: true },
            product_discount: { type: Number, min: 0 },
            product_total: { type: Number, required: true, computed: true }


        },
        order_tracking_number: {
            type: String,
            default: "",
        },
        order_state: {
            type: String,
            enum: OrderState,
            default: OrderState.pending,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const Order = mongoose.model<IOrderModel>(DOCUMENT_NAME, OrderSchema);
export default Order
