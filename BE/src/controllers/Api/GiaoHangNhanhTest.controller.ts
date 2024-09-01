import { SuccessResponse } from "../../cores/succes.response";
import { GiaoHangNhanhDto } from "../../Services/dtos/GiaoHangNhanh.dto";
import GiaoHangNhanhService from "../../Services/GiaoHangNhanh.service";

class GiaoHangNhanhController {
    static async CreateTest(req: Request, res: Response): Promise<any> {

        return new SuccessResponse({
            message: "order create successfully",
            metadata: await GiaoHangNhanhService.CreateOrder(req.body as any)
        }).send(res);
    }
    static async getDetail(req: Request, res: Response): Promise<any> {

        return new SuccessResponse({
            message: "Get order successfully",
            metadata: await GiaoHangNhanhService.GetDetailOrderGHN(req.body as any)
        }).send(res);
    }

    
}

export default GiaoHangNhanhController