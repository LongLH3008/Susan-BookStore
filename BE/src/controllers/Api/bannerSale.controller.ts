import { SuccessResponse } from "../../cores/succes.response";
import BannerSaleService from "../../Services/BannerSale.service";
import { Response } from "express";
import { Request } from "express-jwt";
class bannerSaleControler {
  static async create(req: Request, res: Response): Promise<any> {
    const banner = await BannerSaleService.Create(req.body);
    return new SuccessResponse({
      message: "create banner successfully !",
      metadata: banner,
    }).send(res);
  }

  static async GetByBannerSaleId(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BannerSaleService.GetByBannerId({ id });
    return new SuccessResponse({
      message: "get banner successfully !",
      metadata: blog,
    }).send(res);
  }

  static async GetbyidwithClient(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BannerSaleService.getBannersaleByIdWithClient({ id });
    return new SuccessResponse({
      message: "get banner successfully !",
      metadata: blog,
    }).send(res);
  }

  static async GetAllBannerInAdmin(req: Request, res: Response): Promise<any> {
    const resu = await BannerSaleService.getAllBanersaleInAddmin();
    return new SuccessResponse({
      message: "get all banner successfully !",
      metadata: resu,
    }).send(res);
  }

  static async deleteBanner(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BannerSaleService.deleteBannersale({ id });
    return new SuccessResponse({
      message: "delete banner successfully !",
      metadata: blog,
    }).send(res);
  }

  static async updateBanner(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const blog = await BannerSaleService.updateBannersale(id, req.body);
    return new SuccessResponse({
      message: "update banner successfully !",
      metadata: blog,
    }).send(res);
  }
}

export default bannerSaleControler;
