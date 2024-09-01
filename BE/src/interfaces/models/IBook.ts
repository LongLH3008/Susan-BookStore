import mongoose from "mongoose";

export interface IBook extends mongoose.Document {
    title: string;
    author: string;
    isbn: string;
    description: string;
    price: number;
    discount: number;
    sold: number;
    coverImage: string;
    publisher: string;
    publicationDate: Date;
    language: string;
    numberOfPages: number;
    format: BookFormat;
    categories: string[];
    tags: string[];
    rating: number;
    slug: string;
    ebookDemoLink:string
    reviews: IReview[];
    stock: number;
    totalReviews: number;
    images: Array<{ id: string; url: string }>;
    dimensions?: {
        height: number;
        width: number;
        thickness: number;
        unit: string;
    };
    weight?: {
        value: number;
        unit: string;
    };
    edition?: string;
    series?: string;
    ageRange?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

enum BookFormat {
    Hardcover = "Hardcover",
    Paperback = "Paperback",
}

export interface IReview {

    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
