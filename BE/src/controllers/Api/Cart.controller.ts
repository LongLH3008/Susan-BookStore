import CartService from "../../Services/Cart.service"
import { CreatedResponse } from "../../cores/succes.response"

class CartController {
    static async create(req: Request | any, res: Response) {
        return new CreatedResponse({
            message: "Create cart successFully !",
            metadata: await CartService.create(req.body)
        })
            .send(res)
    }
}

export default CartController