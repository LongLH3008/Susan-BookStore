import mongoose from "mongoose";
import { CartState, ICart } from "../interfaces/models/ICart";



const COLLECTION_NAME = "Cart";
const DOCUMENT_NAME = "Carts";




export interface ICartModel extends ICart, mongoose.Document { }

const CartSchema = new mongoose.Schema<ICartModel>(
    {
        cart_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users", 
        },

        cart_state: {
            type: String,
            default: CartState.active,
            enum: CartState,
        },
        cart_count_products: {
            type: Number,
            default: 0,
        },
        cart_products: [
            {
                product_id: {
                    type: mongoose.Types.ObjectId,
                    ref: "Products"
                },
                product_quantity: {
                    type: Number,

                }
            }
        ],
    },
    {
        timestamps: true, 
        collection: "Carts", 
    }
);

const Cart = mongoose.model<ICartModel>("Carts", CartSchema); 

export default Cart; 