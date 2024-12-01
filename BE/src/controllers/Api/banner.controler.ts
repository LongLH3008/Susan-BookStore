import { SuccessResponse } from "../../cores/succes.response";
import BannerService from "../../Services/banner.service";
import { Response } from "express";
import { Request } from "express-jwt";
class bannerControler {
  static async create(req: Request, res: Response): Promise<any> {
    const banner = await BannerService.Create(req.body);
    return new SuccessResponse({
      message: "create banner successfully !",
      metadata: banner,
    }).send(res);
  }
  static async GetAllBannerInAdmin(req: Request, res: Response): Promise<any> {
    const { page, limit } = req.query;
    const blog = await BannerService.getAllBanerInAddmin({
      page: Number(page),
      limit: Number(limit),
    });
    return new SuccessResponse({
      message: "get all banner successfully !",
      metadata: blog,
    }).send(res);
  }

  static async GetByBannerId(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BannerService.GetByBannerId({ id });
    return new SuccessResponse({
      message: "get banner successfully !",
      metadata: blog,
    }).send(res);
  }

  static async deleteBanner(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BannerService.deleteBanner({ id });
    return new SuccessResponse({
      message: "delete banner successfully !",
      metadata: blog,
    }).send(res);
  }

  static async updateBanner(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BannerService.updateBanner(id, req.body);
    return new SuccessResponse({
      message: "update banner successfully !",
      metadata: blog,
    }).send(res);
  }

  static async GetbyidwithClient(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BannerService.getBannerByIdWithClient({ id });
    return new SuccessResponse({
      message: "get banner successfully !",
      metadata: blog,
    }).send(res);
  }
}

export default bannerControler;
