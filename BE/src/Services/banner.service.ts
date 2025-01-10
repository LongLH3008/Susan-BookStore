import {
  ConflictError,
  ResourceNotFoundError,
  ValidationError,
} from "../cores/error.response";
import banners from "../models/Banner.model";
import { deleteNullObject } from "../utils";
import {
  BannerDTO,
  BannerPaginationDTO,
  BannerQueriesResponseDto,
} from "./dtos/Banner.dto";

class BannerService {
  static async Create(data: BannerDTO) {
    try {
      // validate(bannerValidateSchema, data);
      const checkBanner = await banners.findOne({ title: data.title });
      if (checkBanner) {
        throw new ConflictError("this banner title already exists");
      }
      const newBanner = await banners.create(data);
      return newBanner;
    } catch (error: any) {
      console.log("errors createw banenr ", error);
      throw new ValidationError(error.message);
    }
  }

  static async getAllBanerInAddmin(
    query: BannerPaginationDTO
  ): Promise<BannerQueriesResponseDto> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const allBanner = await banners.find().skip(skip).limit(limit).lean();
    const totalNumberOfBanner = await banners.countDocuments();
    if (!allBanner) throw new ResourceNotFoundError("this banner not found");
    return {
      data: allBanner as BannerDTO[],
      total: totalNumberOfBanner,
      page,
      limit,
    };
  }

  static async GetByBannerId({ id }: { id: string }) {
    const blog = await banners.findOne({ _id: id });
    if (!blog) throw new ResourceNotFoundError("this banner not found");
    return blog;
  }

  static async deleteBanner({ id }: { id: string }) {
    const blog = await banners.deleteOne({ _id: id });
    if (!blog) throw new ResourceNotFoundError("this banner not found");
    return blog;
  }

  static async updateBanner(id: string, data: Partial<BannerDTO>) {
    const update = deleteNullObject(data);
    const foundbanner = await banners.findOne({ _id: id });
    if (!foundbanner) throw new ResourceNotFoundError("this banner not found");
    const blog = await banners.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    if (!blog) throw new ResourceNotFoundError("this banner not found");
    return blog;
  }

  static async StatusBannerActive(id: string, is_active: boolean) {
    const validStatuses = [true, false];
    if (!validStatuses.includes(is_active)) {
      throw new ValidationError("Invalid status value!");
    }
    const foundbanner = await banners.findOne({ _id: id });
    if (!foundbanner) throw new ResourceNotFoundError("this banner not found");
    const blog = await banners.findOneAndUpdate(
      { _id: id },
      { is_active: is_active },
      {
        new: true,
      }
    );
    if (!blog) throw new ResourceNotFoundError("this banner not found");
    return blog;
  }

  static async getBannerByIdWithClient({ id }: { id: string }) {
    const blog = await banners.findOne({ _id: id });
    if (!blog) throw new ResourceNotFoundError("this banner not found");
    blog.is_active = true;
    return blog;
  }
}
export default BannerService;
