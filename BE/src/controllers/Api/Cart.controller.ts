import { send } from "process"
import CartService from "../../Services/Cart.service"
import { CreatedResponse, SuccessResponse } from "../../cores/succes.response"

class CartController {
    static async create(req: Request | any, res: Response): Promise<any> {
        return new CreatedResponse({
            message: "Create cart successFully !",
            metadata: await CartService.create(req.body)
        })
            .send(res)
    }

    static async getCartByOneUser(req: Request | any, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "get cart by user successFully !",
            metadata: await CartService.getCartByUser({ cart_user_id: req.params.user_id })
        })
            .send(res)
    }

    static async addProductToCart(req: Request | any, res: Response): Promise<any> {
        return new CreatedResponse({
            message: "Add product to cart successFully !",
            metadata: await CartService.addProductToCart(req.params.user_id, req.body)
        })
            .send(res)
    }

    static async deleteProductInCart(req: Request | any, res: Response) {
        return new SuccessResponse({
            message: "Delete product in cart successFully !",
            metadata: await CartService.deleteProductInCart(req.params.user_id, req.body.product_id)
        })
            .send(res)
    }
}

export default CartController