import mongoose from "mongoose";
import { IBanner } from "./../interfaces/models/IBaner";
const COLLECTION_NAME = "Banner";
const DOCUMENT_NAME = "Banners";

export interface IBannerModel extends IBanner, mongoose.Document {}

const bannerImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
});
const bannerSchema = new mongoose.Schema<IBannerModel>(
  {
    banner_Title: { type: String, required: true },
    banner_Images: { type: [bannerImageSchema], required: true },
    advertisement_images: { type: [String], required: true },
    banner_Description: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    collection: COLLECTION_NAME,
  }
);
const banners = mongoose.model<IBannerModel>(DOCUMENT_NAME, bannerSchema);
export default banners;
