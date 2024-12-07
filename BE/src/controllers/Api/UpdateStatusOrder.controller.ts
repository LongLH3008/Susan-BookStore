import { SuccessResponse } from "../../cores/succes.response";
import StatusOrerService from "../../Services/StatusOrder.service";
import { Response } from "express";
import { Request } from "express-jwt";
class UdpateStatusOrderController {
    static async UdpateStatusOrderForAdmin(req: Request, res: Response) {
       return new SuccessResponse({
         message: "Upadate user status successFully !",
         metadata: (await StatusOrerService.UpdateStatusOrderForAdmin(
           req.params.id,
           req.body.state
         )) as any,
       }).send(res);
    }

}

export default UdpateStatusOrderController;