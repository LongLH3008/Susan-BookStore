import mongoose from "mongoose";
import { IBlog } from "../interfaces/models/IBlog";



const COLLECTION_NAME = "Cart";
const DOCUMENT_NAME = "Carts";


export interface IBlogModel extends IBlog, mongoose.Document { }

const blogSchema = new mongoose.Schema<IBlogModel>(
    {
        blog_title: { type: String, required: true },
        blog_content: { type: String, required: true },
        blog_author: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        blog_tags: { type: [String], required: true },
    },
    {
        timestamps: { updatedAt: true },
        collection: COLLECTION_NAME
    }
);

const Blog = mongoose.model<IBlogModel>(DOCUMENT_NAME, blogSchema);
export default Blog