import mongoose from "mongoose"

export interface IProductCart {
    product_id: mongoose.Schema.Types.ObjectId | string
    product_quantity: number
}

export enum CartState {
    active = "active", pending = "pending", completed = "completed", failed = "failed"
}
export interface ICart {
    cart_user_id: mongoose.Schema.Types.ObjectId | string
    cart_state: CartState
    cart_count_products: number
    cart_products: IProductCart[]
    createAt: Date | string
    updateAt: Date | string

}