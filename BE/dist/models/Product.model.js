"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const COLLECTION_NAME = "Product";
const DOCUMENT_NAME = "Products";
const productSchema = new mongoose_1.default.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_thumb: {
        type: String,
        required: true,
    },
    product_slug: {
        type: String,
    },
    product_description: {
        type: String,
        required: true,
    },
    product_quantity: {
        type: Number,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_rating_average: {
        type: Number,
        default: 4.5,
        min: 1,
        max: 5,
        set: (val) => {
            Math.round(val * 10) / 10;
        },
    },
    product_type: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    product_image: [{
            image_id: String,
            image_url: String
        }],
    product_attributes: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
productSchema.index({ product_name: "text", product_description: "text" });
productSchema.pre("save", function (next) {
    this.product_slug = (0, slugify_1.default)(this.product_name, { lower: true });
    next();
});
const Product = mongoose_1.default.model(DOCUMENT_NAME, productSchema);
exports.default = Product;
