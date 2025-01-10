export interface IReviewDTO {
    userId: string;
    rating: number;
    comment: string;
}

export interface IUpdateReviewDTO {
    rating?: number;
    comment?: string;
}