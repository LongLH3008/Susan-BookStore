export interface SearchOrderCode {
    search?: string;
}
export interface SearchOrderCodeData {
    _id : string;
    trackingNumber : string;
    state : number;
    total : number;
}

export interface SearchOrderCodeReponse {
    data : SearchOrderCodeData[]
}