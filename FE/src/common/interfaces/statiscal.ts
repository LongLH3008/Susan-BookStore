export interface IFilterDate {
  startDate: string,
  endDate: string
}

export interface IFilterTopBook {
  from: string,
  to: string,
  page?: number
  limit?: number
}
export interface IDataFilterDate {
  totalOrders: number;
  totalRevenue: number;
}

export interface ITopBook {
  _id: string;
  totalSold: number;
  bookName: string;
  totalRevenue: number;
}
export interface ITopUser {
  _id: string;
  totalPurchased: number;
  user_name: string;
}
