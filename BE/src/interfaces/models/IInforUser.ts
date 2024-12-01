import mongoose from "mongoose";

export interface IInforUser {
    userId: mongoose.Types.ObjectId | string; // lien ket khoa ngoai voi user
    province: string; // tỉnh
    district: string  // quận
    ward : string // phuong
    address: string; // địa chỉ
    phone : string; // sdt
};