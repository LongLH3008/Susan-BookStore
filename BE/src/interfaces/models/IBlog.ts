import mongoose from "mongoose";

export interface IBlog {
    blog_title: string
    blog_content: string
    blog_author: mongoose.Types.ObjectId | string
    blog_tags: string[]
    createdAt: Date | string
    updatedAt: Date | string
}