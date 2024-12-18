import {
    BadRequestError,
    ResourceNotFoundError,
} from "../cores/error.response";
import { PaymentMethod, PaymentStatus } from "../interfaces/models/IOrder";
import Book from "../models/Book.model";
import Discount from "../models/Discount.model";
import Order from "../models/Order.model";
import User from "../models/User.model";
import emailQueue from "../queues/mail.queue";
import CartService from "./Cart.service";
import DiscountService, { DiscountInput } from "./Discount.service";
import GiaoHangNhanhService from "./GiaoHangNhanh.service";
import { vnpayService } from "./Vnpay.service";
import {
    GetAllOrderWithPaginateForAdminData,
    GetAllOrderWithPaginateForAdminRequest,
    GetAllOrderWithPaginateForAdminResponse,
    detailOrderData,
} from "./dtos/GetAllOrderWithPaginateForAdmin";
import {
    GetAllOrderWithPaginationAndUserData,
    GetAllOrderWithPaginationAndUserRequest,
    GetAllOrderWithPaginationAndUserResponse,
} from "./dtos/GetAllOrderWithPagination.cs";
import {
    CheckoutReviewInputDTO,
    CreateOrderInputDTO,
    IOrderItem,
} from "./dtos/Order.dto";
import {
    SearchOrderCode,
    SearchOrderCodeData,
    SearchOrderCodeReponse,
} from "./dtos/SearchOrderCodeRequest";

type PaymentMethodInput = "COD" | "VNPAY";

interface CustomerInfo {
    name: string;
    email: string;
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
        const { userId, code, products } = data;
        // const user = await User.findById(userId);
        // if (!user) {
        //     throw new ResourceNotFoundError("User not found");

        // }
        if (userId) {

            const user = await User.findById(userId);
            if (!user)
                throw new ResourceNotFoundError("User not found");
        }


        const productPromises = products.map((book: IOrderItem) =>
            Book.findById(book.bookId)
        );
        const productsFound = await Promise.all(productPromises);
        console.log({ productsFound });
        const notFoundProducts = productsFound.filter(product => !product);

        if (notFoundProducts?.length > 0) {
            throw new ResourceNotFoundError("Product not found");
        }


        const discountAmountInput: DiscountInput = {
            products: products.map((book: IOrderItem, index) => ({
                discount: Math.abs(Number(productsFound[index]?.discount)) || 0,
                product_id: book.bookId,
                quantity: book.quantity,
                image: productsFound[index]?.images[0]?.url || '',
                title: productsFound[index]?.title || "",
                product_price: productsFound[index]?.price || 0,
                isbn: productsFound[index]?.isbn,
                width: productsFound[index]?.dimensions?.width || 0,
                height: productsFound[index]?.dimensions?.thickness || 0,
                length: productsFound[index]?.dimensions?.height || 0,
                weight: productsFound[index]?.weight?.value || 0

            })),
            userId: userId,
            code
        }

        console.log({ discountAmountInput });


        const {
            total,
            subtotal,
            discountAmount,
            discountAmountVoucher,
            productsAfterDiscount
        } = await DiscountService.getDiscountAmount2(discountAmountInput);
        return { total, subtotal, code, discountAmount, discountAmountVoucher, productsAfterDiscount };
    }

    static async createOrder(data: CreateOrderInputDTO) {
        const { userId, shipping, code, payment, products, total, trackingNumber, userInfo } = data;

        if (userId) {
            const foundUser = await User.findById(userId);
            if (!foundUser) throw new ResourceNotFoundError("nguoi dung khong ton tai");
            if (code) {
                const foundCode = await Discount.findOne({
                    discount_code: code,
                });
                if (!foundCode) throw new ResourceNotFoundError("ma giam gia khogn ton tai ton tai");
                foundCode.discount_stock = foundCode.discount_stock - 1
                foundCode.discount_users_used.push(userId as any);
                await foundCode.save()
            }
        }
        if (!userId && code) throw new ResourceNotFoundError("ban can dang nhap de suu dung code");


        const newOrder = await Order.create({
            userId,
            shipping,
            userInfo,
            payment,
            products,
            code,
            total,
            trackingNumber,
        });
        return newOrder;
    }

    static async prepareOrderInput({
        userId,
        customerInfo,
        products,
        code
    }: {
        userId: string;
        products: IOrderItem[];
        customerInfo: CustomerInfo;
        code?: string;
    }) {
        const { total, productsAfterDiscount } = await OrderService.checkOutReview({
            userId,
            products,
            code
        });
        const shippingInput: any = {
            payment_type_id: 2,
            required_note: "KHONGCHOXEMHANG", // *
            return_district_id: 1717, //
            return_ward_code: "220216",
            client_order_code: "",
            to_name: customerInfo.name, // tên ngườu nhận hàng *
            to_phone: customerInfo.phone, // sdt người nhận hàng *
            to_address: customerInfo.address, // địa chỉ shipper tới giao hàng *
            to_ward_name: customerInfo.ward, // phường xã người nhận hàng *
            to_district_name: customerInfo.district, // quận huyện người nhận hàng *
            to_province_name: customerInfo.province, // tỉnh người nhận hàng *
            cod_amount: total, // tiền thu hộ cho người gửi
            weight: 9999, // khối lượng đơn hàng *
            length: 9999, // chiều dài đơn hàng (cm) max: 200*
            width: 9999, // chiều rộng đơn hàng (cm) max 200*
            height: 9999, // chiều cao đơn hàng (cm) max 200*
            service_id: 0, // 2: chuyển phát thương mại, 5 chuyển phát truyền thống *
            items: productsAfterDiscount,
            to_ward_code: customerInfo.wardCode,
            to_district_id: customerInfo.districtId,
            service_type_id: 2,
            return_phone: "0944444444",
        };

        const { output, input } = await GiaoHangNhanhService.FeeTotal(
            shippingInput
        );

        shippingInput.weight = input.weight;
        shippingInput.height = input.height;
        shippingInput.width = input.width;
        shippingInput.length = input.length;

        return { shippingInput, output, total, productsAfterDiscount };
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

    static async createOrderByType({
        output,
        paymentMethod,
        shippingInput,
        total,
        userId,
        code,
        customerInfo,
        productsAfterDiscount,
        url,
    }: any) {
        const feeShip =
            output.data.service_fee + output.data.deliver_remote_areas_fee;

        console.log({ productsAfterDiscount })

        let payment;

        console.log({ paymentMethod, url });

        if (paymentMethod === "COD") {
            payment = {
                method: PaymentMethod.COD,
                amount: feeShip + total,
                status: PaymentStatus.Processed,
                date: new Date(),
            };
            shippingInput.cod_amount = total;
            shippingInput.payment_type_id = 2;
        } else if (url && paymentMethod === "VNPAY") {
            payment = {
                method: PaymentMethod.VNPAY,
                amount: feeShip + total,
                status: PaymentStatus.Processed,
                date: new Date(),
            };
            shippingInput.cod_amount = 0;
            shippingInput.payment_type_id = 1;
        }

        await this.checkStock(productsAfterDiscount);



        console.log({ shippingInput: shippingInput });

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let randomCode = "";


        for (let i = 0; i < 9; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomCode += characters[randomIndex];
        }

        //const newShipping = await GiaoHangNhanhService.CreateOrderGHN(shippingInput)
        const data: any = {
            userId,
            userInfo: {
                name: customerInfo.name,
                email: customerInfo.email,
                phone: customerInfo.phone
            },
            shipping: {
                street: customerInfo.address,
                city: customerInfo.province,
                state: customerInfo.district,
                zipcode: customerInfo.ward,
                country: customerInfo.country,
                fee: feeShip, //newShipping.fee.main_service
            },
            payment,
            products: productsAfterDiscount,
            total: total + feeShip,
            trackingNumber: randomCode.toUpperCase(),
            code
        };

        console.log({ data: data.products })

        const newOrder = await this.createOrder(data);

        return newOrder;
    }

    static async handleCreateOrder({
        paymentMethod,
        userId,
        customerInfo,
        products,
        url,
        code
    }: {
        paymentMethod: PaymentMethodInput;
        userId: string;
        products: IOrderItem[];
        url?: string;
        customerInfo: CustomerInfo;
        code: string
    }) {
        if (paymentMethod === "VNPAY" && url) {
            const { isValid, order } = await vnpayService.verifyUrl(url);

            if (!isValid) {
                throw new BadRequestError("Something went wrongs!");
            }

            const { paymentMethod, userId, customerInfo, code, products } = order;

            console.log({ order });

            const { shippingInput, output, total, productsAfterDiscount } =
                await this.prepareOrderInput({ userId, customerInfo, code, products });

            const newOrder = await this.createOrderByType({
                output,
                shippingInput,
                paymentMethod,
                total,
                userId,
                code,
                customerInfo,
                productsAfterDiscount,
                url,
            });
            if (userId) {
                await CartService.emptyCart(userId)
            }
            return newOrder;
        } else {
            const { shippingInput, output, total, productsAfterDiscount } =
                await this.prepareOrderInput({ userId, customerInfo, code, products });

            const newOrder = await this.createOrderByType({
                output,
                paymentMethod,
                shippingInput,
                total,
                userId,
                code,
                customerInfo,
                productsAfterDiscount,
            });

            if (userId) {
                await CartService.emptyCart(userId)
            }

            emailQueue.push({
                type: "createOrder",
                email: customerInfo.email,
                trackingNumber: newOrder.trackingNumber
            })
            return newOrder;
        }
    }

    // search order code
    static async SearchOrderCode(
        query: SearchOrderCode
    ): Promise<SearchOrderCodeReponse> {
        const { search } = query;
        const searchCondition: Record<string, any> = {};
        const fieldsToSelect =
            "_id userId products trackingNumber total state createdAt";
        if (search && search.trim() !== "") {
            searchCondition.trackingNumber = { $regex: search, $options: "i" };
        }
        let order: SearchOrderCodeData[] = [];
        order = await Order.find(searchCondition).lean();

        return {
            data: order as SearchOrderCodeData[],
        };
    }

    //list order  pagination
    static async GetAllOrderWithPaginationAndUser(
        query: GetAllOrderWithPaginationAndUserRequest
    ): Promise<GetAllOrderWithPaginationAndUserResponse> {
        const { userId, page = 1, limit = 10 } = query;
        var checkuserId = await User.findById(userId);
        if (!checkuserId)
            throw new ResourceNotFoundError("nguoi dung khong ton tai");
        const listfiletoselect =
            "_id userId products trackingNumber total state createdAt updatedAt userInfo payment shipping ";
        const skip = (page - 1) * limit;
        let Getall: GetAllOrderWithPaginationAndUserData[] = [];
        Getall = await Order.find({ userId })
            .select(listfiletoselect)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        const total = await Order.countDocuments({ userId });
        return {
            data: Getall as GetAllOrderWithPaginationAndUserData[],
            total,
            page,
            limit,
        };
    }

    // listOrderpaginateadmin
    static async ListOrderPaginateAdmin(
        query: GetAllOrderWithPaginateForAdminRequest
    ): Promise<GetAllOrderWithPaginateForAdminResponse> {
        try {
            const { page = 1, limit = 10, search } = query;

            // Validate và parse limit
            const parsedLimit = parseInt(limit.toString(), 10);
            if (isNaN(parsedLimit) || parsedLimit <= 0) {
                throw new Error("Invalid limit value");
            }

            // Tính skip cho pagination
            const skip = (page - 1) * parsedLimit;

            // Xây dựng điều kiện tìm kiếm
            const searchCondition: Record<string, any> = {};
            if (search && search.trim() !== "") {
                searchCondition.trackingNumber = { $regex: search, $options: "i" };
            }

            const fieldsToSelect =
                "_id userId products shipping payment trackingNumber total state createdAt userInfo";

            // Lấy orders
            let orders: GetAllOrderWithPaginateForAdminData[] = await Order.find(
                searchCondition
            )
                .select(fieldsToSelect)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parsedLimit)
                .lean();

            // Lấy danh sách userIds duy nhất (lọc bỏ các userId undefined)
            const userIds = [
                ...new Set(
                    orders
                        .map((order) => order.userId)
                        .filter((userId) => userId !== undefined && userId !== null) // Loại bỏ undefined hoặc null
                        .map((userId) => userId.toString()) // Chuyển đổi sang chuỗi
                ),
            ];

            // Lấy thông tin users
            const users = await User.find({ _id: { $in: userIds } })
                .select("_id user_email user_name user_avatar user_phone_number")
                .lean();

            if (!users || users.length === 0) {
                console.error("No users found for the given userIds:", userIds);
            }


            // Tạo map để mapping nhanh user info
            const userMap = new Map(
                users.map((user) => [user._id.toString(), user]) // Sử dụng .toString()
            );

            // Thêm thông tin user vào orders
            orders = orders.map((order) => ({
                ...order,
                user_name: userMap.get(order.userId?.toString())?.user_name || "",
                user_email: userMap.get(order.userId?.toString())?.user_email || "",
                user_avatar: userMap.get(order.userId?.toString())?.user_avatar || "",
                user_phone_number:
                    userMap.get(order.userId?.toString())?.user_phone_number || "",
            }));
            // Đếm tổng số orders theo điều kiện tìm kiếm
            const total = await Order.countDocuments(searchCondition);


            const totalAmount = orders.reduce((total, order) => {
                // quantity trong prd
                return total + (order.total || 0);
            }, 0);
            return {
                data: orders,
                total,
                totalAmount,
                page,
                limit: parsedLimit,
            };
        } catch (error) {
            throw error;
        }
    }

    // detail order
    static async DetailOrder(
        id: string
    ): Promise<detailOrderData> {
        try {
            // Tìm order theo id
            const order: detailOrderData | null = await Order.findById(id)
                .select("_id userId products shipping payment trackingNumber total state createdAt")
                .lean();

            if (!order) {
                throw new ResourceNotFoundError("Order not found");
            }

            // Lấy danh sách userIds (trong trường hợp có nhiều hơn 1 order, xử lý như phần getall)
            const userIds = [order.userId]; // Chỉ có 1 order nên userIds chứa 1 phần tử

            // Truy vấn thông tin người dùng từ danh sách userIds
            const users = await User.find({ _id: { $in: userIds } })
                .select("_id user_email user_name user_avatar user_phone_number")
                .lean();

            // Tạo map để ánh xạ nhanh thông tin người dùng
            const userMap = new Map(users.map((user) => [user._id.toString(), user]));

            // Thêm thông tin người dùng vào order
            order.user_name = userMap.get(order.userId.toString())?.user_name || "";
            order.user_email = userMap.get(order.userId.toString())?.user_email || "";
            order.user_avatar = userMap.get(order.userId.toString())?.user_avatar || "";
            order.user_phone_number =
                userMap.get(order.userId.toString())?.user_phone_number || "";
            return order;
        } catch (error) {
            throw error;
        }
    }

}

export default OrderService;
