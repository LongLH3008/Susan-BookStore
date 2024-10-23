import { IBlog } from "@/common/interfaces/blog";
import { IReview } from "@/common/interfaces/review";
import { SendRequest } from "@/config";

export const getReviewByIdBook = async (_id: string) => {
  return await SendRequest("GET", `books/${_id}/reviews`);
};
export const getReviews = async () => {
  return await SendRequest("GET", `books/reviews`);
};
export const getReviewByUser = async (idBook: string, idUser: string) => {
  return await SendRequest("GET", `books/${idBook}/reviews/${idUser}`);
};

export const deleteReview = async (idBook: string, idUser: string) => {
  return await SendRequest("DELETE", `books/${idBook}/reviews/${idUser}`);
};

export const createReview = async (_id: string, review: IReview) => {
  console.log("_id", _id);

  const response = await SendRequest("POST", `books/${_id}/reviews`, review);
  return response;
};

export const updateBlog = async (
  idBook: string,
  idUser: string,
  review: IReview
) => {
  const response = await SendRequest(
    "PUT",
    `books/${idBook}/reviews/${idUser}`,
    review
  );
  return response;
};
