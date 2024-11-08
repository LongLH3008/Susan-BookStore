import { ConflictError, ResourceNotFoundError, ValidationError } from "../cores/error.response"
import banners from "../models/Banner.model";
import { validate } from "../schemas"
import bannerValidateSchema from "../schemas/banner.schema"
import { deleteNullObject } from "../utils";
import { BannerDTO } from "./dtos/Banner.dto";

class BannerService {
    static async Create(data : BannerDTO) {
        try {
            validate(bannerValidateSchema, data);
            const checkBanner = await banners.findOne({banner_Title : data.banner_Title})
            if(checkBanner) {
                throw new ConflictError("this banner title already exists");
            }
            const newBanner = await banners.create(data);
            return newBanner;
            
        } catch (error : any) {
            console.log("errors createw banenr ",error)
            throw new ValidationError(error.message)
        }
    }

    static async getAllBanerInAddmin() {
        const banner = await banners.find({});
        if(banner == null) {
            throw new ResourceNotFoundError("this banner not found");
        }
        return banner;
    }

    static async GetByBannerId ({id} : {id : string}){
        const blog = await banners.findOne({ _id: id });
        if (!blog) throw new ResourceNotFoundError("this banner not found");
        return blog;
    }

    static async deleteBanner ({id} : {id : string}) {
        const blog = await banners.deleteOne({ _id: id });
        if (!blog) throw new ResourceNotFoundError("this banner not found");
        return blog;
    }

    static async updateBanner(id : string, data : Partial<BannerDTO>) {
        const update = deleteNullObject(data);
        const foundbanner = await banners.findOne({ _id: id });
        if (!foundbanner) throw new ResourceNotFoundError("this banner not found");
        const blog = await banners.findOneAndUpdate({ _id: id }, update, {
            new: true,
        });
        if (!blog) throw new ResourceNotFoundError("this banner not found");
        return blog;
    }

    static async getBannerByIdWithClient ({id} : {id : string}) {
        const blog = await banners.findOne({ _id: id });
        if (!blog) throw new ResourceNotFoundError("this banner not found");
        blog.is_active = true;
        return blog;
        }
}
export default BannerService;