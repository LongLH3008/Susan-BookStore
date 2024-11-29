import { ConflictError, ResourceNotFoundError, ValidationError } from "../cores/error.response";
import banners from "../models/Banner.model";
import bannerSale from "../models/BannerSale.model";
import { deleteNullObject } from "../utils";
import { BannerSaleDTO } from "./dtos/Banner.dto";

class BannerSaleService {
  static async Create(data: BannerSaleDTO) {
    try {
      // validate(bannerValidateSchema, data);
      const checkBanner = await bannerSale.findOne({
        banner_Images_sale: data.banner_Images_sale,
      });
      if (checkBanner) {
        throw new ConflictError("this banner title already exists");
      }
      const newBanner = await bannerSale.create(data);
      return newBanner;
    } catch (error: any) {
      console.log("errors createw banenr ", error);
      throw new ValidationError(error.message);
    }
  }

  static async GetByBannerId({ id }: { id: string }) {
    const blog = await bannerSale.findOne({ _id: id });
    if (!blog) throw new ResourceNotFoundError("this banner not found");
    blog.is_active = true;
    return blog;
  }

  static async deleteBannersale({ id }: { id: string }) {
    const blog = await bannerSale.deleteOne({ _id: id });
    if (!blog) throw new ResourceNotFoundError("this banner not found");
    return blog;
  }

  static async updateBannersale(id: string, data: Partial<BannerSaleDTO>) {
    const update = deleteNullObject(data);
    const foundbanner = await bannerSale.findOne({ _id: id });
    if (!foundbanner) throw new ResourceNotFoundError("this banner not found");
    const blog = await bannerSale.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    if (!blog) throw new ResourceNotFoundError("this banner not found");
    return blog;
  }

  static async getAllBanersaleInAddmin() {
    const banner = await bannerSale.find({});
    if (banner == null) {
      throw new ResourceNotFoundError("this banner not found");
    }
    return banner;
  }

  static async getBannersaleByIdWithClient({ id }: { id: string }) {
    const blog = await bannerSale.findOne({ _id: id });
    if (!blog) throw new ResourceNotFoundError("this banner not found");
    blog.is_active = true;
    return blog;
  }
}

export default BannerSaleService;
