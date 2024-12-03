export type product = {
  bookId: string;
  quantity: number;
  code: null | string;
};

export interface ICheckout {
  email: string
  userId: string;
  paymentMethod: "COD" | "VNPAY";
  name: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  country: string;
  districtId: number;
  wardCode: string;
  products: product[];
}
export interface IProductOrrder {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
  subtotal: number;
  discount: number;
  total: number;
  discount_code: string;
  _id: string;
}
export interface IOrder {
  _id: string;
  userId: string;
  shipping: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    fee: number;
  };
  state: string;
  payment: {
    method: string;
    amount: number;
    status: string;
    date: string;
  };
  products: IProductOrrder[];
  total: number;
  trackingNumber: string;
  createdAt: string;
  user_name: string;
  user_email: string;
}
export interface ICaclCheckout {
  userId: string;
  products: product[];
}

export interface IBankingPayment {
  amount: number;
  bankCode: string;
  orderInfo: { products: product[] };
}

export interface FeeShip {
  to_ward_code: string;
  to_district_id: number
  items: { bookId: string, quantity: number }[]
}

export interface IOrderChecking {
  code?: string
  userId?: string,
  products: { bookId: string, quantity: number }[]
}