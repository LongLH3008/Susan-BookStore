import { vnpay } from '../configs/vnpay.config';
import { ProductCode, VnpLocale, dateFormat, Bank, ReturnQueryFromVNPay } from 'vnpay';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestError } from '../cores/error.response';
import { CreateOrderInputDTO } from './dtos/Order.dto';
import Cache from '../providers/Cache';

class VnpayService {

    private cache: Cache;
    constructor() {
        this.cache = new Cache()
    }

    public async getBankList() {
        const bankList: Bank[] = await vnpay.getBankList();
        return bankList
    }
    public async creatPaymentUrl({ ip, amount, bankCode, orderInfo }: { ip: string, amount: number, bankCode: string, orderInfo: Partial<CreateOrderInputDTO> }) {
        const expiredTime = new Date();
        expiredTime.setHours(expiredTime.getHours() + 1);
        const id = uuidv4()

        const order = this.cache.getCache(id)
        if (!order) {
            this.cache.storeCache({
                key: id,
                val: JSON.stringify(orderInfo),
                time: 60 * 60,
                callback: () => {
                    console.log(`data ${id} da het han`)
                }
            })
        }


        const paymentUrl = vnpay.buildPaymentUrl({
            vnp_Amount: amount,
            vnp_IpAddr: ip,
            vnp_TxnRef: id,
            vnp_OrderInfo: "tao don hang",
            vnp_OrderType: ProductCode.Books_Newspapers_Magazines,
            vnp_ReturnUrl: 'http://localhost:3000/vnpay-return',
            vnp_Locale: VnpLocale.VN,
            vnp_CreateDate: dateFormat(new Date()),
            vnp_ExpireDate: dateFormat(expiredTime),
            vnp_BankCode: bankCode
        });

        return paymentUrl
    }
    public async verifyUrl(url: string) {

        const urlObject = new URL(url)
        const params = new URLSearchParams(urlObject.search);
        const paramsObject = Object.fromEntries(params.entries()) as ReturnQueryFromVNPay;
        const id = paramsObject.vnp_TxnRef

        const verify = vnpay.verifyReturnUrl(paramsObject)

        if (!verify.isVerified) {
            throw new BadRequestError("url không xác thực!!")
        }
        if (!verify.isSuccess) {
            throw new BadRequestError('Đơn hàng thanh toán không thành công');
        }
        const order = this.cache.getCache(id)
        console.log(order)
        //tao order tai day

        //tao xong xoa cache
        return {}
    }


 

}

export const vnpayService = new VnpayService()

//http://localhost:3000/vnpay-return?
// vnp_Amount=50000000&
// vnp_BankCode=NCB&
// vnp_BankTranNo=VNP14573289&
// vnp_CardType=ATM&
// vnp_OrderInfo=Thanh+toan+don+hang
// &vnp_PayDate=20240901205323
// &vnp_ResponseCode=00
// &vnp_TmnCode=P6DTVGDE
// &vnp_TransactionNo=14573289
// &vnp_TransactionStatus=00
// &vnp_TxnRef=80c34c2e-d546-4e4d-83a8-a290ff9b24cf
// &vnp_SecureHash=5b3f55db7f2a7f9d0a2fe0275b3db31ab06b845e0bde72a0bd8e99d76d73dcf791aaa778b33027f312fced095a21780dbf0da9c7d360c8222c40efd21dad5895