import axios from "axios";
import { BadRequestError, InternalServerError } from "../cores/error.response";
import Book, { IBookModel } from "../models/Book.model";
import Locals from "../providers/Locals";
import { GiaoHangNhanhDto, PreviewShipFee } from "./dtos/GiaoHangNhanh.dto";

class GiaoHangNhanhService {
    // static readonly token: string = "c5793e8f-688e-11ef-8e53-0a00184fe694";
    // static readonly shop_id: number = 195530;

    // product
    static readonly token: string = "c2204b30-6812-11ef-b3c4-52669f455b4f";
    static readonly shop_id: number = 5298137;

    // Tạo đơn hàng bên phía giao hàng nhanh 
    static CreateOrderGHN = async (orderData: GiaoHangNhanhDto) => {
        try {
            // Gửi yêu cầu POST đến API của GHN
            console.log({ orderDataDongtest: orderData })
            const response = await axios.post(Locals.config().api_create_order_ghn, orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Token': this.token,
                    'ShopId': this.shop_id
                },
            });

            // Xử lý phản hồi từ API
            if (response.data.code === 200) {
                const orderInfo = response.data.data; // Thông tin đơn hàng trả về từ GHN
                console.log('Đơn hàng đã được tạo thành công:', orderInfo);
                return orderInfo
            } else {
                console.log('Lỗi tạo đơn hàng:', response);
                throw new BadRequestError(response.data.message)
            }
        } catch (error: any) {
            console.error('Lỗi khi gửi yêu cầu đến GHN:', error);
            throw new BadRequestError(error.message)
        }
    }

    // lấy chi tiết đơn hàng 
    static GetDetailOrderGHN = async ({ order_code }: { order_code: string }) => {
        try {
            const response = await axios.post(Locals.config().api_get_detail_order_ghn,
                {
                    order_code: order_code
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': this.token,
                        'ShopId': this.shop_id
                    },
                });

            // Xử lý phản hồi từ API
            if (response.data.code === 200) {
                const orderInfo = response.data.data; // Thông tin đơn hàng trả về từ GHN
                console.log('Lấy thông tin đơn hàng thành công:', orderInfo);
                return orderInfo
            } else {
                console.log('Lỗi khi lấy chi tiết đơn hàng đơn hàng:', response);
                throw new BadRequestError(response.data.message)
            }
        } catch (error: any) {
            console.error('Lỗi khi gửi yêu cầu đến GHN:', error);
            throw new BadRequestError(error.message)
        }
    }

    // xem trước thông tin khi đặt hàng 
    static PreviewOrderInformation = async (order_data: GiaoHangNhanhDto) => {
        try {
            const res = await axios.post(Locals.config().api_preview_order_information, order_data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Token': this.token,
                    'ShopId': this.shop_id
                },
            })

            if (res.data.code == 200) {
                return res.data.data;
            } else {
                throw new BadRequestError(res.data.message)
            }
        } catch (error: any) {
            throw new InternalServerError(error.message)
        }
    }

    // lấy tỉnh 
    static GetProvince = async () => {
        try {
            const res = await axios.get(Locals.config().api_get_province, {
                headers: {
                    'Content-Type': 'application/json',
                    'Token': this.token,
                    'ShopId': this.shop_id
                },
            })

            if (res.data.status == 200) return res.data.data;
            throw new BadRequestError(res.data.message)
        } catch (error: any) {
            throw new InternalServerError(error.message)
        }
    }

    /// tính trước phí giao hàng 
    static FeeTotal = async (req: PreviewShipFee) => {
        const unit: number = 2.54; // inch => cm
        const unitW: number = 453.592; // pound => gram
        try {
            // lấy danh sách sản phẩm muốn tính tiền ra 
            const ListIdBooks = req.items.map(item => item.bookId);
            // lấy ra mảng sản phẩm 
            const ListBooks = await Book.find({ _id: { $in: ListIdBooks } })

            // tìm quyển sách nào có chiều tộng nhất 
            const ListWidth = ListBooks.map((book: IBookModel) => parseFloat(book.dimensions?.width as any) * unit)
            const MaxWidth = Math.max(...ListWidth) || 0// chiều rộng có đôh dài lớn nhất 
            // tìm quyển sách nào có chiều dài dài nhất 
            const ListHeight = ListBooks.map((book: IBookModel) => parseFloat(book.dimensions?.height as any) * unit)
            const MaxHeight = Math.max(...ListHeight) || 0 // chiều dài lớn nhất 
            // cộng tổng độ dày của số sách 
            // mảng list ra dộ dày quyển sách và số lượng
            const ListThickness = ListBooks.map((book: IBookModel) => parseFloat(book.dimensions?.thickness as any) * unit)
            // result
            let TotalThickness: number = 0;
            let TotalWeight: number = 0;
            let TotalPrice: number = 0;

            const ListItems: any[] = []
            const arrayThick: any[] = []
            for (let i = 0; i < ListThickness.length; i++) {
                ListItems.push({
                    name: ListBooks[i].title,
                    quantity: req.items[i].quantity,
                    length: Math.ceil(parseFloat(ListBooks[i].dimensions?.height as any) * unit) || 10,
                    weight: Math.ceil(parseFloat(ListBooks[i].weight?.value as any) * unitW) || 1,
                    height: Math.ceil(ListThickness[i] * unit) || 10,
                    width: Math.ceil(parseFloat(ListBooks[i].dimensions?.width as any) * unit) || 10

                })
                // độ dày 
                TotalThickness += ListThickness[i] * req.items[i].quantity || 0;
                // khối lượng 
                TotalWeight += (parseFloat(ListBooks[i].weight?.value as any) * unitW) * req.items[i].quantity || 0
                // tổng tiền 
                TotalPrice += parseFloat(ListBooks[i].price as any)

            }
            const body = {
                service_type_id: 2,
                to_district_id: req.to_district_id,
                to_ward_code: req.to_ward_code,
                height: Math.ceil(TotalThickness + 5 as any),
                length: Math.ceil(MaxHeight + 5 as any),
                weight: Math.ceil(TotalWeight as any),
                width: Math.ceil(MaxWidth + 5 as any),
                cod_value: Math.ceil(TotalPrice as any),
                insurance_value: Math.ceil(TotalPrice as any),
                items: ListItems

            }

            console.log(body);

            //call api tính tiền phí 
            const res = await axios.post(Locals.config().api_preview_totalfee, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Token': this.token,
                    'ShopId': this.shop_id
                },
            })
            return {
                input: body,
                output: res.data
            }
        } catch (error: any) {
            throw new BadRequestError(error)
        }
    }

}

export default GiaoHangNhanhService;

