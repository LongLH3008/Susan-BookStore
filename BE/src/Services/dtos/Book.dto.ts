import { IReview } from "../../interfaces/models/IBook";

export interface BookCreateInputDTO {
    title: string;
    author: string;
    isbn: string;
    description: string;
    price: number;
    discount: number;
    coverImage: string;
    publisher: string;
    publicationDate: Date;
    language: string;
    ebookDemoLink: string;
    numberOfPages: number;
    format: 'Hardcover' | 'Paperback';
    categories: string[];
    tags: string[];
    stock: number;
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
}

export interface BookUpdateInputDTO {
    title?: string;
    author?: string;
    isbn?: string;
    description?: string;
    price?: number;
    discount?: number;
    coverImage?: string;
    publisher?: string;
    publicationDate?: Date;
    ebookDemoLink?: string;
    language?: string;
    numberOfPages?: number;
    format?: 'Hardcover' | 'Paperback';
    categories?: string[];
    tags?: string[];
    stock?: number;
    images?: Array<{ id: string; url: string }>;
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
    isActive?: boolean;
}

export interface BookQueryInputDTO {
    category_ids?: string;
    page?: number;
    limit?: number;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    search?: string;
}

export interface BookOutputDTO {
    _id: string;
    title: string;
    slug: string;
    author: string;
    isbn: string;
    description: string;
    price: number;
    discount: number;
    sold: number;
    ebookDemoLink: string;
    coverImage: string;
    publisher: string;
    publicationDate: Date;
    language: string;
    numberOfPages: number;
    format: 'Hardcover' | 'Paperback';
    categories: string[];
    tags: string[];
    rating: number;
    reviews: IReview[];
    stock: number;
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

export interface BookListOutputDTO {
    books: BookOutputDTO[];
    total: number;
    page: number;
    limit: number;
}
