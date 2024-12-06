import {
  IOrderPayment,
  IOrderProduct,
  IOrderShipping,
} from "../../interfaces/models/IOrder";

export interface GetAllOrderWithStatisticalRequest {
  page?: number;
  limit?: number;
}

export interface GetAllOrderWithStatisticalData {
  _id: string;
  userId: string;
  shipping: IOrderShipping[];
  state: string;
  payment: IOrderPayment[];
  Products: IOrderProduct[];
  total: number;
  trackingNumber: string;
  createdAt: Date;
}

// top sach ban chạy
export interface TopSellingBook {
  _id: string;
  bookName: string;
  totalSold: number;
}

export interface GetAllOrderWithStatisticalResponse {
  topSellingBooks: TopSellingBook[];
}

//top 5 ngươi dung
export interface TopSellingUser {
  _id: string;
  totalPurchased: number;
  userName: string;
}

// filter by day and month
export interface FilterbydayandmonthRequest {
  date?: string;
  month?: number;
  year?: number;
  page: number;
  limit: number;
}

export interface FilterbydayandmonthData {
  _id: string;
  userId: string;
  shipping: IOrderShipping[];
  state: string;
  payment: IOrderPayment[];
  Products: IOrderProduct[];
  total: number;
  trackingNumber: string;
  createdAt: Date;
}

export interface FilterbydayandmonthResponse {
  data: FilterbydayandmonthData[];
  total: number;
  totalAmount: number;
  page: number;
  limit: number;
}



// statistical view prd by day and month
export interface StatisticalOrderDto {
  totalOrders: number; // Tổng số đơn hàng
  totalRevenue: number; // Tổng doanh thu
}

