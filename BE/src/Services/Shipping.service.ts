import axios from "axios";
import { IOrderProduct } from "../interfaces/models/IOrder";
import { BadRequestError } from "../cores/error.response";

export class ShippingService {
    static async caculateFee({ fromDistrict, toDistrict, toWard, products }:
        { fromDistrict: number, toDistrict: number, toWard: number, products: IOrderProduct[] }) {

        const maxWidth = products.sort((a, b) => (a.width || 0) - (b.width || 0))[0].width
        const maxHeight = products.sort((a, b) => (a.height || 0) - (b.height || 0))[0].height || 0
        const totalWeight = products.reduce((acc, cur) => {
            return acc + cur.weight
        }, 0)
        const totalThickness = products.reduce((acc, cur) => {
            return acc + (cur?.thickness || 0)
        }, 0)

        const body = {
            "service_type_id": 2,
            "from_district_id": fromDistrict,
            "to_district_id": toDistrict,
            "to_ward_code": toWard.toString(),
            "height": totalThickness + 10,
            "length": +maxHeight + 10,
            "weight": Math.ceil(totalWeight),
            "width": maxWidth,
            "insurance_value": 0,
            "coupon": null,
            "items":
                products.map(product => {
                    return {

                        name: product.title,
                        height: Math.ceil(product?.thickness || 0),
                        weight: Math.ceil(product?.weight || 0),
                        width: Math.ceil(product?.width || 0),
                        length: Math.ceil(product?.height || 0)

                    }
                })

        }

        try {
            const res = await axios.post(
                process.env.GHN_CAL_FEE || "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Token": "c5793e8f-688e-11ef-8e53-0a00184fe694",
                        "ShopId": "194426"
                    }
                }


            )
            return res.data
        } catch (error: any) {
            console.log(error)
            throw new BadRequestError("co loi xay ra khi tinh toan")
        }

    }
    static async createOrderShipping() {

    }
}