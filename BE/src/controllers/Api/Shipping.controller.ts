import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/succes.response";
import { ReviewService } from "../../Services/Review.service";
import { ShippingService } from "../../Services/Shipping.service";

class ShippingController {
    static async calculateFee(req: Request, res: Response): Promise<any> {
        const { fromDistrict, toDistrict, toWard, products } = req.body

        const review = await ShippingService.caculateFee({ fromDistrict, toDistrict, toWard, products });
        return new SuccessResponse({
            message: "Review added successfully",
            metadata: review
        }).send(res);
    }


}


export default ShippingController;
