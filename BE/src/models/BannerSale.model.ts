import { IBannerSale } from "./../interfaces/models/IBaner";
import mongoose from "mongoose";
const COLLECTION_NAME = "BannerSale";
const DOCUMENT_NAME = "BannersSale";

export interface IBannerSaleModel extends IBannerSale, mongoose.Document {}
const bannerSaleSale = new mongoose.Schema({
  image: { type: String, required: true },
});

const bannerSaleSchema = new mongoose.Schema<IBannerSaleModel>(
  {
    banner_Images_sale: { type: [bannerSaleSale], required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    collection: COLLECTION_NAME,
  }
);
const bannerSale = mongoose.model<IBannerSaleModel>(
  DOCUMENT_NAME,
  bannerSaleSchema
);
export default bannerSale;
