"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const IDiscount_1 = require("../interfaces/models/IDiscount");
const COLLECTION_NAME = "Discount";
const DOCUMENT_NAME = "Discounts";
const DiscountSchema = new mongoose_1.default.Schema({
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
        enum: IDiscount_1.DiscountType,
        default: IDiscount_1.DiscountType.percentage,
    },
    //gia tri giam gia
    discount_value: {
        type: Number,
        required: true,
    },
    //ap dung voi
    discount_applies_to: {
        type: String,
        enum: IDiscount_1.DiscountApplyTo,
        default: IDiscount_1.DiscountApplyTo.all,
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
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
const Discount = mongoose_1.default.model(DOCUMENT_NAME, DiscountSchema);
exports.default = Discount;
