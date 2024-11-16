import { IOrderPayment, IOrderProduct, IOrderShipping } from "../../interfaces/models/IOrder";

export interface GetAllOrderWithPaginateForAdminRequest {
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetAllOrderWithPaginateForAdminResponse {
    data : GetAllOrderWithPaginateForAdminData[],
    total : number,
    page : number,
    limit : number
}
export interface GetAllOrderWithPaginateForAdminData{
    _id : string,
    userId : string,
    shipping : IOrderShipping[],
    state : string,
    payment : IOrderPayment[],
    Products : IOrderProduct[],
    total : number,
    trackingNumber : string,
    createdAt : Date
}
