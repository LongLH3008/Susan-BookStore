import mongoose from "mongoose"

export default interface IWishlist {
    user_id: string
    product_ids: (mongoose.Schema.Types.ObjectId | string)[]
    createdAt: Date
    updatedAt: Date
}
