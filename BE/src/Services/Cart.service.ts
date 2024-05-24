import { ConflictError, InternalServerError, ResourceNotFoundError } from "../cores/error.response"
import { ICart } from "../interfaces/models/ICart"
import mongoose from "mongoose"
import Cart from "../models/Cart.model"
import Product from "../models/Product.model"


class CartService {


    private static async checkCart(cart_user_id: string) {
        // check user có giỏ hàng hay chưa 
        const checkCartExist = await Cart.findOne({
            cart_user_id: cart_user_id
        })

        return checkCartExist
    }

    private static async checkProductInCart(cart_user_id: string, product_id: string) {
        const check = await Cart.aggregate([
            { $match: { cart_user_id: new mongoose.Types.ObjectId(cart_user_id) } },
            {
                $project: {
                    cart_products: {
                        $filter: {
                            input: "$cart_products",
                            as: "product",
                            cond: { $eq: ["$$product.product_id", new mongoose.Types.ObjectId(product_id)] }
                        }
                    }
                }
            }
        ])
        if (check[0].cart_products.length === 0) return null
        return check
    }

    private static checkQuantityProductVariant() {
        // code here ...
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
        const checkProductInCart: any = await this.checkProductInCart(cart_user_id, product_id)
        console.log(checkProductInCart);
        if (checkProductInCart) {
            // tăng quantity lên quantity đơn vị 
            const newCart = await Cart.findOneAndUpdate(
                {
                    cart_user_id: cart_user_id,
                    "cart_products.product_id": product_id
                },
                {
                    $set: {
                        "cart_products.$.product_quantity": checkProductInCart[0].cart_products[0].product_quantity + product_quantity
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
                        product_quantity: 1
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

        const checkProductInCart = await this.checkProductInCart(cart_user_id, product_id)
        if (!checkProductInCart) throw new ResourceNotFoundError("This product does not exist in Cart !")

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

    static async incrementOrDecrementQuantityProductInCart(type: "INCREMENT" | "DECREMENT", cart_user_id: string, product_id: string) {
        const checkCartExist = await this.checkCart(cart_user_id)
        if (!checkCartExist) throw new ResourceNotFoundError("Cant not find cart by user_id")
        const checkProductInCart = await this.checkProductInCart(cart_user_id, product_id)
        if (!checkProductInCart) throw new ResourceNotFoundError("This product does not exist in Cart !")
        switch (type) {
            case "INCREMENT":
                // check quantity product 
                const productVariant = await Product.findOne({
                    "product_variations.product_variant_id": product_id
                })
                return productVariant
                // chưa xong
                break;
            case "DECREMENT":
                const productVariant1 = await Product.findOne({
                    "product_variations.product_variant_id": product_id
                })
                return productVariant1

                // chưa xong 
                break;
            default:
                break;
        }
    }

}

export default CartService