import { SendRequest } from "@/config";

export const getOrderByUser = async (arg: { userId: string, page?: number, limit?: number }) => {
    return await SendRequest('GET', `/orders/GetAllOrderOfClientWithUser?userId=${arg.userId}&page=${arg.page ?? 1}&limit=${arg.limit ?? 10}`);
}

export const searchOrderByTrackingNumber = async (trackingNumber: string) => {
    return await SendRequest('GET', `/orders/search-trackingNumber?search=${trackingNumber}`)
}