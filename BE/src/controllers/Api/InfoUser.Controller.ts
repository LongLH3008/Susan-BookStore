import { string } from "joi";
import { Response } from "express";
import { Request } from "express-jwt";
import InfoUserService from "../../Services/InforUser.service";
import { SuccessResponse } from "../../cores/succes.response";

class InfoUserController {
  static async Create(req: Request, res: Response): Promise<any> {
    const Infouser = await InfoUserService.Create(req.body);
    return new SuccessResponse({
      message: "create Infouser successfully !",
      metadata: Infouser,
    }).send(res);
  }

  static async detail(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const infouser = await InfoUserService.GetByInforUserId({ id });
    return new SuccessResponse({
      message: "get infouser successfully !",
      metadata: infouser,
    }).send(res);
  }

  // detele
  static async delete(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const infouser = await InfoUserService.DeleteInforUserId({ id });
    return new SuccessResponse({
      message: "delete infouser successfully !",
      metadata: infouser,
    }).send(res);
  }

  // getall usserinfo with userId and pagination
  static async GetAllInfoUserWithPagination(
    req: Request,
    res: Response
  ): Promise<any> {
    const { userId = "", page = 1, limit = 10 } = req.query;
    const infouser = await InfoUserService.GetAllInfoUserByUserId({
      page: Number(page),
      limit: Number(limit),
      userId: String(userId),
    });
    return new SuccessResponse({
      message: "get infouser successfully !",
      metadata: infouser,
    }).send(res);
  }

  // update
  static async update(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const infouser = await InfoUserService.UpdateInforUserId(id , req.body);
    return new SuccessResponse({
      message: "update infouser successfully !",
      metadata: infouser,
    }).send(res);
  }
}

export default InfoUserController;
