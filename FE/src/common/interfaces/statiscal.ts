export interface IFilterDate {
  date?: string;
  moth: number;
  year: number;
}
export interface IDataFilterDate {
  totalOrders: number;
  totalRevenue: number;
}

export interface ITopBook {
  _id: string;
  totalSold: number;
  title: string;
}
export interface ITopUser {
  _id: string;
  totalPurchased: number;
  user_name: string;
}
