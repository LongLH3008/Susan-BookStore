import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/succes.response";
import { ReviewService } from "../../Services/Review.service";

class ReviewController {
    static async addReview(req: Request, res: Response): Promise<any> {
        const { bookId } = req.params;
        const review = await ReviewService.addReview(bookId, req.body);
        return new SuccessResponse({
            message: "Review added successfully",
            metadata: review
        }).send(res);
    }

    static async updateReview(req: Request, res: Response): Promise<any> {
        const { bookId, userId } = req.params;
        const review = await ReviewService.updateReview(bookId, userId, req.body);
        return new SuccessResponse({
            message: "Review updated successfully",
            metadata: review
        }).send(res);
    }

    static async deleteReview(req: Request, res: Response): Promise<any> {
        const { bookId, userId } = req.params;
        const result = await ReviewService.deleteReview(bookId, userId);
        return new SuccessResponse({
            message: "Review deleted successfully",
            metadata: result
        }).send(res);
    }

    static async getReviews(req: Request, res: Response): Promise<any> {
        const { bookId } = req.params;
        const reviews = await ReviewService.getReviews(bookId);
        return new SuccessResponse({
            message: "Reviews retrieved successfully",
            metadata: reviews
        }).send(res);
    }

    static async getReviewByUser(req: Request, res: Response): Promise<any> {
        const { bookId, userId } = req.params;
        const review = await ReviewService.getReviewByUser(bookId, userId);
        return new SuccessResponse({
            message: "Review retrieved successfully",
            metadata: review
        }).send(res);
    }
}

export default ReviewController;
