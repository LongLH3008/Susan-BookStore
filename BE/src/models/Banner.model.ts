import mongoose from "mongoose";
import { IBanner } from "./../interfaces/models/IBaner";
const COLLECTION_NAME = "Banner";
const DOCUMENT_NAME = "Banners";

export interface IBannerModel extends IBanner, mongoose.Document {}

const bannerSchema = new mongoose.Schema<IBannerModel>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: String, required: true },
    url: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    collection: COLLECTION_NAME,
  }
);
const banners = mongoose.model<IBannerModel>(DOCUMENT_NAME, bannerSchema);
export default banners;
