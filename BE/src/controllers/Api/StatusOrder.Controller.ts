import StatusOrerService from "../../Services/StatusOrder.service";
import { Response } from "express";
import { Request } from "express-jwt";
import { SuccessResponse } from "../../cores/succes.response";
class statusOrderController {
  static async UpdateStatusOrderForClient(
    req: Request | any,
    res: Response | any
  ) {
    return new SuccessResponse({
      message: "Upadate status order successFully !",
      metadata: (await StatusOrerService.UpdateStatusOrderForAdmin(
        req.params.id,
        req.body.state
      )) as any,
    }).send(res);
  }
}

export default statusOrderController;
