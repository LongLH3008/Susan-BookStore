import mongoose from "mongoose"

export interface IProduct {
    product_name: string
    product_thumb: string
    product_slug: string
    product_description: string
    product_quantity: number
    product_price: number
    product_image: [{
        image_id: string
        image_url: string
    }]

    product_rating_average: number
    product_type: mongoose.Types.ObjectId | string
    product_attributes: object
    createAt: Date | string
    updateAt: Date | string

}
