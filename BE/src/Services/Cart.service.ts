import { ConflictError, InternalServerError, ResourceNotFoundError } from "../cores/error.response"
import { ICart } from "../interfaces/models/ICart"
import Cart from "../models/Cart.model"


class CartService {


    private static async checkCart(cart_user_id: string) {
        // check user có giỏ hàng hay chưa 
        const checkCartExist = await Cart.findOne({
            cart_user_id: cart_user_id
        })

        return checkCartExist
    }

    static async create({ cart_user_id }: { cart_user_id: string }) {
        // check user có giỏ hàng hay chưa 
        const checkCartExist = await this.checkCart(cart_user_id)
        if (checkCartExist) throw new ConflictError("This user already has a shopping cart")

        const newCart = await Cart.create({ cart_user_id: cart_user_id })
        return newCart
    }

    static async getCartByUser(
        {
            cart_user_id,
        }:
            {
                cart_user_id: string,
            }
    ) {

        const checkCartExist = await this.checkCart(cart_user_id)
        if (!checkCartExist) throw new ResourceNotFoundError("Cant not find cart by user_id")
        return checkCartExist
    }

    static async addProductToCart(
        cart_user_id: string,
        {
            product_id,
            product_quantity
        }: {
            product_id: string,
            product_quantity: number
        }
    ) {
        const checkCartExist = await this.checkCart(cart_user_id)
        if (!checkCartExist) throw new ResourceNotFoundError("Cant not find cart by user_id")
        // check product in the cart 
        const checkProductInCart
            = checkCartExist
                .cart_products
                .find((e: { product_id: string, product_quantity: number }) => e.product_id === product_id)
        if (checkProductInCart) {
            // tăng quantity lên 1 đơn vị 
            const newCart = await Cart.findOneAndUpdate(
                {
                    cart_user_id: cart_user_id,
                    "cart_products.product_id": product_id
                },
                {
                    $set: {
                        "cart_products.$.product_quantity": +checkProductInCart.product_quantity + product_quantity
                    }
                },
                { new: true }
            )

            if (!newCart) throw new InternalServerError("Error increment product quantity in cart , please try agian !")
            return newCart
        }

        // không tồn tai thì thêm vào 
        const newCart = await Cart.findOneAndUpdate(
            { cart_user_id: cart_user_id },
            {
                $push: {
                    cart_products: {
                        product_id: product_id,
                        product_quantity: product_quantity
                    }
                },
                $inc: { cart_count_products: 1 }
            },
            { new: true }
        )

        if (!newCart) throw new InternalServerError("Error add product in cart , please try agian !")
        return newCart

    }

    static async deleteProductInCart(cart_user_id: string, product_id: string) {
        const checkCartExist = await this.checkCart(cart_user_id)
        if (!checkCartExist) throw new ResourceNotFoundError("Cant not find cart by user_id")

        const newCart = await Cart.findOneAndUpdate(
            { cart_user_id: cart_user_id },
            {
                $pull: {
                    cart_products: {
                        product_id: product_id
                    }
                },
                $inc: { cart_count_products: -1 }
            },
            { new: true }
        )

        if (!newCart) throw new InternalServerError("Error delete product in cart , please try agian !")
        return newCart

    }

}

export default CartService