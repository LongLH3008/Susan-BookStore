interface IUser {
  _id?: string;
  user_name: string;
  user_email: string;
  user_phone_number?: string;
  user_password: string;
  user_status: string;
  user_address?: string;
  user_role: string;
  user_avatar: string;
  user_gender: string;
  user_auth_type: string;
}

interface IUserAddress {
  _id: string;
  province: string; // Ví dụ: "Bà Rịa - Vũng Tàu / 206"
  district: string; // Ví dụ: "Huyện Châu Đức / 1709"
  ward: string; // Ví dụ: "Thị trấn Ngãi Giao / 520701"
  address: string; // Ví dụ: "Số 12, Đường Lê Thái Tổ"
  phone: string; // Ví dụ: "0982130661"
  userId: string; // Ví dụ: "672d9549792d13b726a31fa7"
  createdAt: string; // ISO 8601 format: "2024-12-03T05:09:07.879Z"
  updatedAt: string; // ISO 8601 format: "2024-12-03T11:18:54.184Z"
  __v: number; // Ví dụ: 0
}
