import mongoose from "mongoose";
import slugify from "slugify";
import { IBook } from "../interfaces/models/IBook";

const COLLECTION_NAME = "Book";
const DOCUMENT_NAME = "Books";

export interface IBookModel extends IBook, mongoose.Document { }

const bookSchema = new mongoose.Schema<IBookModel>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        author: {
            type: String,
            required: true,
        },
        isbn: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        coverImage: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        publicationDate: {
            type: Date,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        numberOfPages: {
            type: Number,
            required: true,
        },
        format: {
            type: String,
            enum: ["Hardcover", "Paperback"],
            required: true,
        },
        categories: {
            type: [String],
            default: []
        },
        tags: {
            type: [String],
            default: []
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
            set: (val: number) => Math.round(val * 10) / 10,
        },
        reviews: [{
            userId: String,
            rating: Number,
            comment: String,
            createdAt: Date,
        }],
        ebookDemoLink: {
            type: String,
            required: true
        },

        stock: {
            type: Number,
            required: true,
        },
        dimensions: {
            height: Number,
            width: Number,
            thickness: Number,
            unit: String,
        },
        weight: {
            value: Number,
            unit: String,
        },

        totalReviews: {
            type: Number,
            default: 0,
        },
        edition: String,
        series: String,
        ageRange: String,
        images: [{
            id: String,
            url: String
        }],
        isActive: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

bookSchema.index({ title: "text", description: "text", author: "text" });
bookSchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Book = mongoose.model<IBookModel>(DOCUMENT_NAME, bookSchema);
export default Book;
