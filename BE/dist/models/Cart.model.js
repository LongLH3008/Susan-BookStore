"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ICart_1 = require("../interfaces/models/ICart");
const COLLECTION_NAME = "Cart";
const DOCUMENT_NAME = "Carts";
const CartSchema = new mongoose_1.default.Schema({
    cart_user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
    },
    cart_state: {
        type: String,
        default: ICart_1.CartState.active,
        enum: ICart_1.CartState,
    },
    cart_count_products: {
        type: Number,
        default: 0,
    },
    cart_total_price: {
        type: Number,
        default: 0,
    },
    cart_products: [
        {
            product_id: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Books"
            },
            product_quantity: {
                type: Number,
            }
        }
    ],
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
const Cart = mongoose_1.default.models.Carts || mongoose_1.default.model(DOCUMENT_NAME, CartSchema);
exports.default = Cart;
