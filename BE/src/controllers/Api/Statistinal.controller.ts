import { SuccessResponse } from "../../cores/succes.response";
import StatisticalService from "../../Services/Statistical.service";
import { Response } from "express";
import { Request } from "express-jwt";
class StatisticalController {
  static async GetAllOrderWithStatistical(
    req: Request,
    res: Response
  ): Promise<any> {
    const views = await StatisticalService.StatisticalPrdAndMoney();
    return new SuccessResponse({
      message: "Get all order with statistical successfully",
      metadata: views,
    }).send(res);
  }

  static async GetAllOrderWithTop5User(req: Request, res: Response): Promise<any> {
    const views = await StatisticalService.TopBuyingUsers();
    return new SuccessResponse({
      message: "Get all order successfully",
      metadata: views,
    }).send(res);
  }
}
export default StatisticalController;
