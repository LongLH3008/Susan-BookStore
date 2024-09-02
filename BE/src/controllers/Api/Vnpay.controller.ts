import { vnpayService } from "../../Services/Vnpay.service";
import { SuccessResponse } from "../../cores/succes.response";
import { Request, Response } from "express"


class PaymentController {

    // google
    public static async getBankList(
        req: Request,
        res: Response
    ): Promise<any> {
    
        return new SuccessResponse({
            message: "Create user from google successfully!",
            metadata: await vnpayService.getBankList(),
        }).send(res);
    }
    public static async getPaymentUrl(
        req: Request,
        res: Response
    ): Promise<any> {
        const ip = req.ip || req.connection.remoteAddress || "";
        const { amount, bankCode, orderInfo } = req.body

        return new SuccessResponse({
            message: "Create user from google successfully!",
            metadata: await vnpayService.creatPaymentUrl({ ip, amount, bankCode, orderInfo }),
        }).send(res);
    }
    public static async verifyUrl(
        req: Request,
        res: Response
    ): Promise<any> {
        const { url } = req.body
        return new SuccessResponse({
            message: "Create user from google successfully!",
            metadata: await vnpayService.verifyUrl(url),
        }).send(res);
    }

}

export default PaymentController;
