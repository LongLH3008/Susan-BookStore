
export interface IProduct {
    product_name: string
    product_thumb: string
    product_slug: string
    product_description: string
    product_price: number
    product_images: [{
        image_id: string
        image_url: string
    }]
    product_variations: IProductVariation[]
    product_rating_average: number
    product_categories: string[]
    product_discount: number
    product_sold: number
    isActive: boolean
    product_attributes: object
    createAt: Date | string
    updateAt: Date | string

}

interface IProductVariation {
    product_variant_id: string
    product_quantity: number;
    product_price: number;
    is_default: boolean
    isActive: boolean
}
