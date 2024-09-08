import mongoose from "mongoose";
import { IBlog } from "../interfaces/models/IBlog";

const COLLECTION_NAME = "Blog";
const DOCUMENT_NAME = "Blogs";

export interface IBlogModel extends IBlog, mongoose.Document {}

const blogSchema = new mongoose.Schema<IBlogModel>(
  {
    blog_title: { type: String, required: true },
    blog_content: { type: String, required: true },
    blog_author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    blog_tags: { type: [String], required: true },
    blog_slug: { type: String, required: true, unique: true },
    blog_image: { type: String, required: true },
    blog_views: { type: Number, default: 0 },
    blog_comments: [
      {
        comment_author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        comment_content: { type: String, required: true },
        comment_likes: { type: Number, default: 0 },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
        comment_createdAt: { type: Date, default: Date.now },
        comment_updatedAt: { type: Date, default: Date.now },
      },
    ],
    viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    collection: COLLECTION_NAME,
  }
);

const Blog = mongoose.model<IBlogModel>(DOCUMENT_NAME, blogSchema);
export default Blog;
