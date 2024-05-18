export enum DiscountType {
    percentage = "percentage", fix_amount = "fix_amount"
}
export enum DiscountApplyTo {
    all = "all", specific = "specific", category = "category"
}
export interface IDiscount {

    //ten ma giam gia
    discount_name: string

    //ma giam gia
    discount_code: string
    //loai ma giam gai
    discount_type: DiscountType

    //gia tri giam gia
    discount_value: number
    //ap dung voi
    discount_applies_to: DiscountApplyTo
    //ma san pha mduoc ap dung
    discount_product_ids: string[]
    //ma danh muc duoc ap dung
    discount_category_ids: string[]
    //so lan su dung cua ma giam gia
    discount_stock: number

    //gia tri don hang toi thieu de su dung
    discount_min_order_value: number
    //so lan su dung toi da cho moi user
    discount_max_use_per_user: number
    //danh sach user da su dung
    discount_user_used: string[]
    //tinh trang ma giam gia
    discount_is_active: boolean
    discount_start_date: Date
    discount_end_date: Date

}