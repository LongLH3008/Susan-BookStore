import { SendRequest } from "@/config";

export const getOrderByUser = async (arg: {
  userId: string;
  page?: number;
  limit?: number;
}) => {
  return await SendRequest(
    "GET",
    `/orders/GetAllOrderOfClientWithUser?userId=${arg.userId}&page=${
      arg.page ?? 1
    }&limit=${arg.limit ?? 10}`
  );
};
export const getAllOrder = async (arg: {
  search: string;
  page?: number;
  limit?: number;
}) => {
  return await SendRequest(
    "GET",
    `/orders/GetAllOrderOfAdmin?page=${arg.page}&limit=${arg.limit}&search=${arg.search}`
  );
};
export const UpdateStatusOrder = async (
  id: string,
  payload: { state: string }
) => {
  return await SendRequest("PATCH", "update-status-order/" + id, payload);
};

export const searchOrderByTrackingNumber = async (trackingNumber: string) => {
  return await SendRequest(
    "GET",
    `/orders/search-trackingNumber?search=${trackingNumber}`
  );
};
