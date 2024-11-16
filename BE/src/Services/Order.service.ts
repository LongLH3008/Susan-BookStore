import { BadRequestError, ResourceNotFoundError } from "../cores/error.response";
import { PaymentMethod, PaymentStatus } from "../interfaces/models/IOrder";
import Book from "../models/Book.model";
import Order from "../models/Order.model";
import User from "../models/User.model";
import DiscountService, { DiscountInput } from "./Discount.service";
import { CheckoutReviewInputDTO, CreateOrderInputDTO, IOrderItem } from "./dtos/Order.dto";
import GiaoHangNhanhService from "./GiaoHangNhanh.service";
import { vnpayService } from "./Vnpay.service";
import { v4 as uuidv4 } from 'uuid';


type PaymentMethodInput = "COD" | "VNPAY"

interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
    ward: string;
    district: string;
    province: string;
    country: string;
    wardCode: string;
    districtId: number;
}

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

        if (notFoundProducts?.length > 0) {
            throw new ResourceNotFoundError("Product not found");
        }


        const discountAmountInput: DiscountInput = {
            products: products.map((book: IOrderItem, index) => ({
                discount: productsFound[index]?.discount || 0,
                product_id: book.bookId,
                quantity: book.quantity,
                title: productsFound[index]?.title || "",
                product_price: productsFound[index]?.price || 0,
                code: book.code,
                isbn: productsFound[index]?.isbn,
                width: productsFound[index]?.dimensions?.width || 0,
                height: productsFound[index]?.dimensions?.thickness || 0,
                length: productsFound[index]?.dimensions?.height || 0,
                weight: productsFound[index]?.weight?.value || 0

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


        const newOrder = await Order.create({
            userId,
            shipping,
            payment,
            products,
            total,
            trackingNumber
        })
        return newOrder
    }

    static async prepareOrderInput({ userId, customerInfo, products, }:
        {
            userId: string,
            products: IOrderItem[],
            customerInfo: CustomerInfo
        }
    ) {

        const { total, productsAfterDiscount } = await OrderService.checkOutReview({ userId, products })
        const shippingInput: any = {
            payment_type_id: 2,
            required_note: "KHONGCHOXEMHANG", // *
            return_district_id: 1717, // 
            return_ward_code: "220216",
            client_order_code: "",
            from_name: "Susan shop", // tên người gủi 
            from_phone: "0999999999", // sdt người gửi 
            to_name: customerInfo.name, // tên ngườu nhận hàng *
            to_phone: customerInfo.phone, // sdt người nhận hàng *
            to_address: customerInfo.address, // địa chỉ shipper tới giao hàng * 
            to_ward_name: customerInfo.ward, // phường xã người nhận hàng *
            to_district_name: customerInfo.district, // quận huyện người nhận hàng *
            to_province_name: customerInfo.province, // tỉnh người nhận hàng * 
            cod_amount: total, // tiền thu hộ cho người gửi 
            weight: 9999, // khối lượng đơn hàng *
            length: 9999, // chiều dài đơn hàng (cm) max: 200*
            width: 9999,  // chiều rộng đơn hàng (cm) max 200*
            height: 9999, // chiều cao đơn hàng (cm) max 200*
            service_id: 0, // 2: chuyển phát thương mại, 5 chuyển phát truyền thống *
            items: productsAfterDiscount,
            to_ward_code: customerInfo.wardCode,
            to_district_id: customerInfo.districtId,
            service_type_id: 5,
            from_address: "Kim dong ",
            from_ward_name: "Xã Vĩnh Xá",
            from_district_name: "Huyện Kim Động",
            from_province_name: "Hưng Yên",
            return_phone: "0944444444",

        }



        const { output, input } = await GiaoHangNhanhService.FeeTotal(shippingInput)

        shippingInput.weight = input.weight
        shippingInput.height = input.height
        shippingInput.width = input.width
        shippingInput.length = input.length


        return { shippingInput, output, total, productsAfterDiscount }


    }


    static async checkStock(products: { bookId: string }[]) {
        const insufficientStockProducts: any[] = [];
        const productPromises = products.map(async (item: any) => {
            const book = await Book.findById(item.bookId);

            if (book!.stock < item.quantity) {
                insufficientStockProducts.push({
                    bookId: book!._id,
                    title: book!.title,
                    stock: book!.stock,
                    requested: item.quantity,
                });
            }

            return book;
        });

        const books = await Promise.all(productPromises);

        if (insufficientStockProducts.length > 0) {
            return {
                success: false,
                message: "Some products do not have enough stock",
                products: insufficientStockProducts,
            };
        }

    }


    static async createOrderByType({ output, paymentMethod, shippingInput, total, userId, customerInfo, productsAfterDiscount, url }: any) {

        const feeShip = output.data.service_fee + output.data.deliver_remote_areas_fee

        // console.log({ productsAfterDiscount })


        let payment

        console.log({ paymentMethod, url })

        if (paymentMethod === "COD") {
            payment = {
                method: PaymentMethod.COD,
                amount: feeShip + total,
                status: PaymentStatus.Processed,
                date: new Date(),
            }
            shippingInput.cod_amount = total
            shippingInput.payment_type_id = 2
        } else if (url && (paymentMethod === "VNPAY")) {
            payment = {
                method: PaymentMethod.VNPAY,
                amount: feeShip + total,
                status: PaymentStatus.Processed,
                date: new Date(),
            }
            shippingInput.cod_amount = 0
            shippingInput.payment_type_id = 1

        }

        await this.checkStock(productsAfterDiscount)


        const bulkUpdateOperations = productsAfterDiscount.map((item: any) => ({
            updateOne: {
                filter: { _id: item.bookId },
                update: { $inc: { stock: -item.quantity } },
            },
        }));

        await Book.bulkWrite(bulkUpdateOperations);


        console.log({ shippingInput: shippingInput })

        //const newShipping = await GiaoHangNhanhService.CreateOrderGHN(shippingInput)
        const data: any = {
            userId,
            shipping: {
                street: customerInfo.address,
                city: customerInfo.province,
                state: customerInfo.district,
                zipcode: customerInfo.ward,
                country: customerInfo.country,
                fee: feeShip,
            },
            payment,
            products: productsAfterDiscount,
            total: total + feeShip,
            trackingNumber: `code_test_demo`
        }

        const newOrder = await this.createOrder(data)

        return newOrder
    }


    static async handleCreateOrder({ paymentMethod, userId, customerInfo, products, url }:
        {
            paymentMethod: PaymentMethodInput,
            userId: string,
            products: IOrderItem[],
            url?: string,
            customerInfo: CustomerInfo
        }
    ) {


        if (paymentMethod === "VNPAY" && url) {
            const { isValid, order } = await vnpayService.verifyUrl(url)

            if (!isValid) {

                throw new BadRequestError("Something went wrongs!")
            }

            const { paymentMethod, userId, customerInfo, products } = order

            console.log({ order })

            const { shippingInput, output, total, productsAfterDiscount } = await this.prepareOrderInput({ userId, customerInfo, products })

            const newOrder = await this.createOrderByType({ output, shippingInput, paymentMethod, total, userId, customerInfo, productsAfterDiscount, url })
            return newOrder

        } else {
            const { shippingInput, output, total, productsAfterDiscount } = await this.prepareOrderInput({ userId, customerInfo, products })

            const newOrder = await this.createOrderByType({ output, paymentMethod, shippingInput, total, userId, customerInfo, productsAfterDiscount })
            return newOrder
        }

    }

}

export default OrderService;


