import mongoose from "mongoose";
import { DiscountApplyTo, DiscountType, IDiscount } from "../interfaces/models/IDiscount";



const COLLECTION_NAME = "Discount";
const DOCUMENT_NAME = "Discounts";




export interface IDiscountModel extends IDiscount, mongoose.Document { }

const DiscountSchema = new mongoose.Schema<IDiscountModel>(
    {
        //ten ma giam gia
        discount_name: {
            type: String,
            required: true,
        },

        //ma giam gia
        discount_code: {
            type: String,
            required: true,
        },
        //loai ma giam gai
        discount_type: {
            type: String,
            enum: DiscountType,
            default: DiscountType.percentage,
        },

        //gia tri giam gia
        discount_value: {
            type: Number,
            required: true,
        },
        //ap dung voi
        discount_applies_to: {
            type: String,
            enum: DiscountApplyTo,
            default: DiscountApplyTo.all,
        },
        //ma san pha mduoc ap dung
        discount_product_ids: {
            type: [String],
            default: []
        },
        //ma danh muc duoc ap dung
        discount_category_ids: {
            type: [String],
            default: []
        },
        //so lan su dung cua ma giam gia
        discount_stock: {
            type: Number,
            required: true,
        },

        //gia tri don hang toi thieu de su dung
        discount_min_order_value: {
            type: Number,
            required: true,
        },
        //so lan su dung toi da cho moi user
        discount_max_use_per_user: {
            type: Number,
            required: true,
            default: 1,
        },
        //danh sach user da su dung
        discount_user_used: {
            type: [String],
            default: []
        },
        //tinh trang ma giam gia
        discount_is_active: {
            type: Boolean,
            default: true,
        },
        discount_start_date: {
            type: Date,
            required: true,
        },
        discount_end_date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const Discount = mongoose.model<IDiscountModel>(DOCUMENT_NAME, DiscountSchema);
export default Discount
