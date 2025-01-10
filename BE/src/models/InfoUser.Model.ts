import mongoose from "mongoose";
import { IInforUser } from "./../interfaces/models/IInforUser";

const COLLECTION_NAME = "InforUser";
const DOCUMENT_NAME = "InforUsers";
export interface IInforUserModel extends IInforUser, mongoose.Document {}

const InforUserSchema = new mongoose.Schema<IInforUserModel>({
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
}, {
  timestamps: { createdAt: true, updatedAt: true },
  collection: COLLECTION_NAME
});
const InforUser = mongoose.model<IInforUserModel>(
  DOCUMENT_NAME,
  InforUserSchema,
  COLLECTION_NAME
);
export default InforUser;
