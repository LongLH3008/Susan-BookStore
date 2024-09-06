import axios from "axios";
import { GiaoHangNhanhDto } from "./dtos/GiaoHangNhanh.dto";
import { token } from "morgan";
import { BadRequestError, InternalServerError } from "../cores/error.response";
import Locals from "../providers/Locals";

class GiaoHangNhanhService {
    static readonly token: string = "c5793e8f-688e-11ef-8e53-0a00184fe694";
    static readonly shop_id: number = 194426;

    // Tạo đơn hàng bên phía giao hàng nhanh 
    static CreateOrderGHN = async (orderData: GiaoHangNhanhDto) => {
        try {
            // Gửi yêu cầu POST đến API của GHN
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
                console.log('Lỗi tạo đơn hàng:', response.data.message);
                throw new BadRequestError(response.data.message)
            }
        } catch (error: any) {
            console.error('Lỗi khi gửi yêu cầu đến GHN:', error.message);
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
                console.log('Lỗi khi lấy chi tiết đơn hàng đơn hàng:', response.data.message);
                throw new BadRequestError(response.data.message)
            }
        } catch (error: any) {
            console.error('Lỗi khi gửi yêu cầu đến GHN:', error.message);
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
            const res = await axios.get(Locals.config().api_get_province,{
                headers: {
                    'Content-Type': 'application/json',
                    'Token': this.token,
                    'ShopId': this.shop_id
                },
            })

            if(res.data.status == 200) return res.data.data;
            throw new BadRequestError(res.data.message)
        } catch (error: any) {
            throw new InternalServerError(error.message)
        }
    }

}

export default GiaoHangNhanhService;