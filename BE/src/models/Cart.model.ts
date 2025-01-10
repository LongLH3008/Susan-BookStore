import mongoose from "mongoose";
import { CartState, ICart } from "../interfaces/models/ICart";

const COLLECTION_NAME = "Cart";
const DOCUMENT_NAME = "Carts";
export interface ICartModel extends ICart, mongoose.Document {}

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
		cart_total_price: {
			type: Number,
			default: 0,
		},
		cart_products: [
			{
				product_id: {
					type: mongoose.Types.ObjectId,
					ref: "Books",
				},
				product_quantity: {
					type: Number,
				},
				selected: {
					type: Boolean,
					default: true,
				},
			},
		],
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

const Cart = mongoose.models.Carts || mongoose.model<ICartModel>(DOCUMENT_NAME, CartSchema);

export default Cart;
