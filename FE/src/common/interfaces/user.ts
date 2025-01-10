export interface IUser {
  _id: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_birth: string;
  // user_status: "active" | "inactive" | "banned";
  // user_wishlist: any[];
  // user_reward_points: number;
  // user_role: "user" | "admin" | "moderator";
  user_avatar: string;
  user_gender: "male" | "female" | "";
  // user_auth_type: "local" | "oauth" | "sso";
  createdAt: string;
  updatedAt: string;
  // __v: number;
}

export interface IUserAddress {
  _id: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  phone: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
