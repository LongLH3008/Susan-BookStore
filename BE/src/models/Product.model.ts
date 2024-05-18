import mongoose from "mongoose"
import slugify from "slugify"
import { IProduct } from "../interfaces/models/IProduct";

const COLLECTION_NAME = "Product";
const DOCUMENT_NAME = "Products";



export interface IProductModel extends IProduct, mongoose.Document { }

const productSchema = new mongoose.Schema<IProductModel>(
    {
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
            set: (val: number) => {
                Math.round(val * 10) / 10;
            },
        },
        product_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
            required: true,
        },
        product_image: [{
            image_id: String,
            image_url: String
        }]
        ,
        product_attributes: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

productSchema.index({ product_name: "text", product_description: "text" });
productSchema.pre("save", function (next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
});

const Product = mongoose.model<IProductModel>(DOCUMENT_NAME, productSchema);
export default Product
