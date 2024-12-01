import {
  ResourceNotFoundError,
  ValidationError,
} from "../cores/error.response";
import InforUser from "../models/InfoUser.Model";
import User from "../models/User.model";
import { deleteNullObject } from "../utils";
import {
  IInfoUserDto,
  InfoQueryResponseDto,
  InforQueriesDto,
} from "./dtos/IInfoUser.Dto";

class InfoUserService {
  // create
  static async Create(data: IInfoUserDto) {
    try {
      const checkUserId = await User.findOne({ _id: data.userId });
      if (!checkUserId)
        throw new ResourceNotFoundError("nguoi dung khong ton tai");
      const newInfoUser = await InforUser.create(data);
      return newInfoUser;
    } catch (error: any) {
      console.log("errors createw banenr ", error);
      throw new ValidationError(error.message);
    }
  }

  // getbyInforUserId
  static async GetByInforUserId({ id }: { id: string }) {
    try {
      const infoUser = await InforUser.findOne({ _id: id });
      if (!infoUser) throw new ResourceNotFoundError("this info not found !");
      return infoUser;
    } catch (error: any) {
      console.log("errors getbyInforUserId ", error);
      throw new ValidationError(error.message);
    }
  }

  // delete
  static async DeleteInforUserId({ id }: { id: string }) {
    try {
      const userInfo = await InforUser.findByIdAndDelete({ _id: id });
      if (!userInfo) throw new ResourceNotFoundError("this userInfo not found");
      return userInfo;
    } catch (error: any) {
      console.log("errors deleteInforUserId ", error);
      throw new ValidationError(error.message);
    }
  }

  // update
  static async UpdateInforUserId(id: string, data: Partial<IInfoUserDto>) {
    try {
      const updateInfo = deleteNullObject(data);
      const foundBanner = await InforUser.findOne({ _id: id });
      if (!foundBanner)
        throw new ResourceNotFoundError("this banner not found");
      const userinfo = await InforUser.findOneAndUpdate(
        { _id: id },
        updateInfo,
        {
          new: true,
        }
      );
      if (!userinfo) throw new ResourceNotFoundError("this banner not found");
      return userinfo;
    } catch (error: any) {
      console.log("errors updateInforUserId ", error);
      throw new ValidationError(error.message);
    }
  }

  // Get all users info by userId
  static async GetAllInfoUserByUserId(
    query: InforQueriesDto
  ): Promise<InfoQueryResponseDto> {
    try {
      const { page = 1, limit = 10, userId } = query;
      const skip = (page - 1) * limit;
      const allInfoUser = await InforUser.find({ userId })
        .skip(skip)
        .limit(limit)
        .lean();
      const totalNumberOfInfoUser = await InforUser.countDocuments({ userId });
      if (!allInfoUser)
        throw new ResourceNotFoundError("nguoi dung khong ton tai");
      return {
        data: allInfoUser as IInfoUserDto[],
        total: totalNumberOfInfoUser,
        page,
        limit,
      };
    } catch (error: any) {
      console.log("errors GetAllInfoUserByUserId ", error);
      throw new ValidationError(error.message);
    }
  }
}

export default InfoUserService;
