import { BookCreateInputDTO } from "./Book.dto"

export interface GetAllOrderWithPaginationAndUserRequest {
    userId ?: string,
    page ?: number,
    limit ?: number
}
export interface GetAllOrderWithPaginationAndUserResponse {
    data : GetAllOrderWithPaginationAndUserData[],
    total : number,
    page : number,
    limit : number
}
export interface GetAllOrderWithPaginationAndUserData{
    _id : string,
    userId : string,
    state : number,
    Products : BookCreateInputDTO[],
    total : number,
    trackingNumber : string,
    createdAt : Date
}

