import { ConflictError } from "../cores/error.response"
import Cart from "../models/Cart.model"


class CartService {
    static async create({ cart_user_id }: { cart_user_id: string }) {
        // check user có giỏ hàng hay chưa 
        const checkCartExist = await Cart.findOne({
            cart_user_id: cart_user_id
        })
        if (checkCartExist) throw new ConflictError("This user already has a shopping cart")

        const newCart = await Cart.create({ cart_user_id: cart_user_id })
        return newCart
    }
    

}

export default CartService