import { StatisticalOrderDto } from "./../../Services/dtos/Statistincal.dto";
import { SuccessResponse } from "../../cores/succes.response";
import StatisticalService from "../../Services/Statistical.service";
import { Response } from "express";
import { Request } from "express-jwt";
class StatisticalController {
  static async GetAllOrderWithStatistical(
    req: Request,
    res: Response
  ): Promise<any> {
    const views = await StatisticalService.StatisticalPrdAndMoney(
      req.body.from,
      req.body.to,
      req.body.page = 1,
      req.body.limit = 5
    );
    return new SuccessResponse({
      message: "Get all order with statistical successfully",
      metadata: views,
    }).send(res);
  }

  static async GetAllOrderWithTop5User(
    req: Request,
    res: Response
  ): Promise<any> {
    const views = await StatisticalService.TopBuyingUsers();
    return new SuccessResponse({
      message: "Get all order successfully",
      metadata: views,
    }).send(res);
  }

  static async StatisticalFilterOrderPrdayAndMonth(
    req: Request,
    res: Response
  ): Promise<any> {
    const views = await StatisticalService.StatisticalOrderbydayAndMonth(
      req.body
    );
    return new SuccessResponse({
      message: "Get all order successfully",
      metadata: views,
    }).send(res);
  }

  static async StatisticalFilterOrderPrdayAndMonthTwo(
    req: Request,
    res: Response
  ): Promise<any> {
    const views = await StatisticalService.StatisticalOrderbydayAndMonthTwo(
      req.body
    );
    return new SuccessResponse({
      message: "Get all order successfully",
      metadata: views,
    }).send(res);
  }

}
export default StatisticalController;
