import { ResourceNotFoundError } from "../cores/error.response";
import Book from "../models/Book.model";
import User from "../models/User.model";
import DiscountService, { DiscountInput } from "./Discount.service";
import { CheckoutReviewInputDTO, CreateOrderInputDTO, IOrderItem } from "./dtos/Order.dto";

class OrderService {
    static async checkOutReview(data: CheckoutReviewInputDTO) {
        const { userId, products } = data;
        const user = await User.findById(userId);
        if (!user) {
            throw new ResourceNotFoundError("User not found");
        }
        const productPromises = products.map((book: IOrderItem) =>
            Book.findById(book.bookId)
        );
        const productsFound = await Promise.all(productPromises);
        const notFoundProducts = productsFound.filter(product => !product);

        if (notFoundProducts.length > 0) {
            throw new ResourceNotFoundError("Product not found");
        }
        const discountAmountInput: DiscountInput = {
            products: products.map((book: IOrderItem, index) => ({
                discount: productsFound[index]?.discount || 0,
                product_id: book.bookId,
                quantity: book.quantity,
                title: productsFound[index]?.title || "",
                product_price: productsFound[index]?.price || 0,
                code: book.code
            })),
            userId: userId
        }
        const { total, subtotal, discountAmount, discountAmountVoucher, productsAfterDiscount } = await DiscountService.getDiscountAmount2(discountAmountInput);
        return { total, subtotal, discountAmount, discountAmountVoucher, productsAfterDiscount };
    }
    static async createOrder(data: CreateOrderInputDTO) {
        const { userId, shipping, payment, products, total, trackingNumber } = data

        const foundUser = await User.findById(userId)
        if (!foundUser) throw new ResourceNotFoundError("nguoi dung khong ton tai")
        return {}


    }

}

export default OrderService;