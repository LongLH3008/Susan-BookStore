import axios from "axios";
import { GiaoHangNhanhDto } from "./dtos/GiaoHangNhanh.dto";
import { token } from "morgan";
import { BadRequestError } from "../cores/error.response";

class GiaoHangNhanhService {
    static readonly token: string = "c5793e8f-688e-11ef-8e53-0a00184fe694";
    static readonly shop_id: number = 194426;
    
    // Tạo đơn hàng bên phía giao hàng nhanh 
    static CreateOrderGHN = async (orderData: GiaoHangNhanhDto) => {
        try {
            // Gửi yêu cầu POST đến API của GHN
            const response = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create', orderData, {
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
            const response = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
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
                console.log('Đơn hàng đã được tạo thành công:', orderInfo);
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
}

export default GiaoHangNhanhService;