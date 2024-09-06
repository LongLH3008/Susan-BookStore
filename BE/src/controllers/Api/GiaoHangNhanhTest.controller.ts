import { SuccessResponse } from "../../cores/succes.response";
import { GiaoHangNhanhDto } from "../../Services/dtos/GiaoHangNhanh.dto";
import GiaoHangNhanhService from "../../Services/GiaoHangNhanh.service";

class GiaoHangNhanhController {
    static async CreateTest(req: Request, res: Response): Promise<any> {

        return new SuccessResponse({
            message: "order Giao hang nhanh create successfully",
            metadata: await GiaoHangNhanhService.CreateOrderGHN(req.body as any)
        }).send(res);
    }
    static async getDetail(req: Request, res: Response): Promise<any> {

        return new SuccessResponse({
            message: "Get order giao hang nhanh successfully",
            metadata: await GiaoHangNhanhService.GetDetailOrderGHN(req.body as any)
        }).send(res);
    }

    static async GetProvince(req: Request, res: Response): Promise<any> {

        return new SuccessResponse({
            message: "Get Province successfully",
            metadata: await GiaoHangNhanhService.GetProvince()
        }).send(res);
    }

    

    
}

export default GiaoHangNhanhController