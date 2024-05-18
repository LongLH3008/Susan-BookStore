"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const IOrder_1 = require("../interfaces/models/IOrder");
const COLLECTION_NAME = "Order";
const DOCUMENT_NAME = "Orders";
const OrderSchema = new mongoose_1.default.Schema({
    order_user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        payment_method: { type: String, required: true, enum: IOrder_1.PaymentMethod },
        payment_amount: { type: Number, required: true, min: 0 },
        payment_status: { type: String, required: true, enum: IOrder_1.PaymentStatus },
        payment_date: { type: Date, required: true },
    },
    order_products: {
        order_item_id: { type: String, required: true },
        product_id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "Products" },
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
        enum: IOrder_1.OrderState,
        default: IOrder_1.OrderState.pending,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
const Order = mongoose_1.default.model(DOCUMENT_NAME, OrderSchema);
exports.default = Order;
