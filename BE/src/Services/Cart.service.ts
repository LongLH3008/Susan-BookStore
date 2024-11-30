import {ConflictError, InternalServerError, ResourceNotFoundError} from "../cores/error.response";
import {ICart, ICartSelectItem} from "../interfaces/models/ICart";
import mongoose, {trusted} from "mongoose";
import Cart from "../models/Cart.model";
import Product from "../models/Book.model";
import User from "../models/User.model";
import UserService from "./User.service";

class CartService {
    private static async checkCart(cart_user_id: string) {
        // check user có giỏ hàng hay chưa
        const checkCartExist = await Cart.findOne({
            cart_user_id: cart_user_id,
        }).populate({
            path: "cart_products.product_id",
            model: "Books",
            select: "title price discount slug coverImage author format stock",
        });

        return checkCartExist;
    }

    private static async checkProductInCart(cart_user_id: string, product_id: string) {
        const check = await Cart.aggregate([
            {$match: {cart_user_id: new mongoose.Types.ObjectId(cart_user_id)}},
            {
                $project: {
                    cart_products: {
                        $filter: {
                            input: "$cart_products",
                            as: "product",
                            cond: {
                                $eq: ["$$product.product_id", new mongoose.Types.ObjectId(product_id)],
                            },
                        },
                    },
                },
            },
        ]);
        if (check[0].cart_products.length === 0) return null;
        return check;
    }

    private static checkQuantityProductVariant() {
        // code here ...
    }

    static async create({cart_user_id}: { cart_user_id: string }) {
        // check user có giỏ hàng hay chưa
        const checkCartExist = await this.checkCart(cart_user_id);
        if (checkCartExist) throw new ConflictError("This user already has a shopping cart");
        const newCart = await Cart.create({cart_user_id: cart_user_id});
        return newCart;
    }

    static async getCartByUser({cart_user_id}: { cart_user_id: string }) {
        const checkCartExist = await this.checkCart(cart_user_id);
        if (!checkCartExist) throw new ResourceNotFoundError("Cant not find cart by user_id");
        return checkCartExist;
    }

    static async addProductToCart(
        cart_user_id: string,
        {
            product_id,
            product_quantity,
        }: {
            product_id: string;
            product_quantity: number;
        }
    ) {
        const userExists = await UserService.getUserById({id: cart_user_id});
        if (!userExists) throw new ResourceNotFoundError("Cant not find user_id");

        // check product in the cart
        const checkProductInCart: any = await this.checkProductInCart(cart_user_id, product_id);
        console.log(checkProductInCart);
        if (checkProductInCart) {
            // tăng quantity lên số đơn vị mà người ấy muốn vào
            const NewCart = await Cart.findOneAndUpdate(
                {cart_user_id: cart_user_id, "cart_products.product_id": product_id},
                {
                    $inc: {"cart_products.$.product_quantity": product_quantity},
                },
                {new: true}
            );
            return NewCart;
        }

        // không tồn tai thì thêm vào
        const newCart = await Cart.findOneAndUpdate(
            {cart_user_id: cart_user_id},
            {
                $push: {
                    cart_products: {
                        product_id: product_id,
                        product_quantity: product_quantity,
                    },
                },
                $inc: {cart_count_products: 1},
            },
            {new: true}
        );

        if (!newCart) throw new InternalServerError("Error add product in cart , please try agian !");
        return newCart;
    }

    static async deleteProductInCart(cart_user_id: string, product_id: string) {
        const checkCartExist = await this.checkCart(cart_user_id);
        if (!checkCartExist) throw new ResourceNotFoundError("Cant not find cart by user_id");

        const checkProductInCart = await this.checkProductInCart(cart_user_id, product_id);
        if (!checkProductInCart) throw new ResourceNotFoundError("This product does not exist in Cart !");

        const newCart = await Cart.findOneAndUpdate(
            {cart_user_id: cart_user_id},
            {
                $pull: {
                    cart_products: {
                        product_id: product_id,
                    },
                },
                $inc: {cart_count_products: -1},
            },
            {new: true}
        );

        if (!newCart) throw new InternalServerError("Error delete product in cart , please try again !");
        return newCart;
    }

    static async incrementOrDecrementQuantityProductInCart(
        type: "INCREMENT" | "DECREMENT",
        cart_user_id: string,
        product_id: string
    ) {
        const checkCartExist = await this.checkCart(cart_user_id);
        if (!checkCartExist) throw new ResourceNotFoundError("Cant not find cart by user_id");
        const checkProductInCart = await this.checkProductInCart(cart_user_id, product_id);
        if (!checkProductInCart) throw new ResourceNotFoundError("This product does not exist in Cart !");

        if (type == "INCREMENT") {
            // tăng số lượng của product id trong cart lên 1

            const NewCart = await Cart.findOneAndUpdate(
                {cart_user_id: cart_user_id, "cart_products.product_id": product_id},
                {
                    $inc: {"cart_products.$.product_quantity": 1},
                },
                {
                    new: true,
                }
            );

            return NewCart;
        }

        if (type == "DECREMENT") {
            // gi số lượng của product id trong cart lên 1
            // const CurrentQuantity = await Cart.findOne(
            //     { cart_user_id: cart_user_id, "cart_products.product_id": product_id }
            // );

            // const checkQuantityEqual1 = CurrentQuantity.cart_products.filter((e: any) => e.product_id != product_id)
            // if (checkQuantityEqual1.product_quantity == 1)
            //     return "Anh bạn à , không thể Giảm số lượng giỏ hàng xuống 0 được"

            const NewCart = await Cart.findOneAndUpdate(
                {cart_user_id: cart_user_id, "cart_products.product_id": product_id},
                {
                    $inc: {"cart_products.$.product_quantity": -1},
                },
                {
                    new: true,
                }
            );

            return NewCart;
        }
        return;
    }

    static async updateSelectedProductInCart(cart_user_id: string, cart_item: ICartSelectItem[]) {
        const checkCartExist = await this.checkCart(cart_user_id);
        if (!checkCartExist) throw new ResourceNotFoundError("Cant not find cart by user_id");

        const {cart_products} = checkCartExist;

        cart_products.map((item: any, index: number) =>
            item._id == cart_item[index]._id ? (item.selected = cart_item[index].selected) : item
        );

        const newCart = await Cart.findOneAndUpdate({cart_user_id}, {cart_products}, {new: true});
        if (!newCart) throw new InternalServerError("Error delete product in cart , please try again !");
        return newCart;
    }

    static async emptyCart(cart_user_id: string) {
        const checkCartExist = await this.checkCart(cart_user_id);
        if (!checkCartExist) throw new ResourceNotFoundError("Cant not find cart by user_id");

        const updatedCart = await Cart.findOneAndUpdate({
            cart_user_id: cart_user_id,
        }, {
            cart_products: [],
            cart_count_products: 0,
            cart_total_price: 0,
        })
        if (!updatedCart) throw new InternalServerError("Error delete product in cart , please try again !");
        return updatedCart;
    }
}

export default CartService;
