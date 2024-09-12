import mongoose from "mongoose";

export interface IBlog {
    blog_title: string
    blog_content: string
    blog_author: mongoose.Types.ObjectId | string
    blog_tags: string[]
    blog_slug: string
    blog_image: string
    blog_views: number
    blog_comments: IComment[]
    viewedBy: mongoose.Types.ObjectId[]
    createdAt: Date | string
    updatedAt: Date | string
}

export interface IComment {
    comment_author: mongoose.Types.ObjectId | string
    comment_content: string
    comment_likes: number
    likedBy: mongoose.Schema.Types.ObjectId[]
    comment_createdAt: Date | string
    comment_updatedAt: Date | string
}