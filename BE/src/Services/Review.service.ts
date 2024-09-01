import Book from '../models/Book.model';
import { IReviewDTO, IUpdateReviewDTO } from './dtos/Review.dto';
import { reviewCreateSchema, reviewUpdateSchema } from '../schemas/review.schema';
import { BadRequestError } from '../cores/error.response';


export class ReviewService {
    static async addReview(bookId: string, review: IReviewDTO) {
        const { error } = reviewCreateSchema.validate(review);
        if (error) throw new BadRequestError(error.details[0].message);

        const book = await Book.findById(bookId);
        if (!book) throw new BadRequestError('Book not found');

        book.reviews.push({ ...review, createdAt: new Date() });
        const rating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;
        book.rating = rating;
        book.totalReviews = book.reviews.length;
        await book.save();
        return book.reviews[book.reviews.length - 1];

    }

    static async updateReview(bookId: string, userId: string, update: IUpdateReviewDTO) {
        const { error } = reviewUpdateSchema.validate(update);
        if (error) throw new BadRequestError(error.details[0].message);

        const updatedBook = await Book.findOneAndUpdate(
            { _id: bookId, 'reviews.userId': userId },
            { $set: { 'reviews.$': { ...update, userId, createdAt: new Date() } } },
            { new: true }
        );
        if (!updatedBook) throw new BadRequestError('Review not found');
        return updatedBook.reviews.find(review => review.userId === userId);
    }

    static async deleteReview(bookId: string, userId: string) {
        const book = await Book.findById(bookId);
        if (!book) throw new BadRequestError('Book not found');
        const review = book.reviews.find(review => review.userId === userId);
        if (!review) throw new BadRequestError('Review not found');
        book.reviews = book.reviews.filter(review => review.userId !== userId);
        book.rating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;
        book.totalReviews = book.reviews.length;
        await book.save();
        return { message: 'Review deleted successfully' };
    }

    static async getReviews(bookId: string, page: number = 1, limit: number = 10) {
        const book = await Book.findById(bookId, 'reviews');
        if (!book) throw new BadRequestError('Book not found');

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const reviews = book.reviews.slice(startIndex, endIndex); 

        return {
            totalReviews: book.reviews.length,
            reviews,
            currentPage: page,
            totalPages: Math.ceil(book.reviews.length / limit),
        };
    }

    static async getReviewByUser(bookId: string, userId: string) {
        const book = await Book.findById(bookId, 'reviews');
        if (!book) throw new BadRequestError('Book not found');
        const review = book.reviews.find(review => review.userId === userId);
        if (!review) throw new BadRequestError('Review not found');
        return review;
    }
}