import mongoose from "mongoose"
import { ICategory } from "../interfaces/models/ICategory";

const COLLECTION_NAME = "Category";
const DOCUMENT_NAME = "Categories";


export interface ICategoryModel extends ICategory, mongoose.Document { }


const CategorySchema = new mongoose.Schema<ICategoryModel>(
    {
        category_name: {
            type: String,
            required: true,
        },
        category_thumb: {
            type: String,
            required: true,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const Category = mongoose.model<ICategoryModel>(DOCUMENT_NAME, CategorySchema);
export default Category
