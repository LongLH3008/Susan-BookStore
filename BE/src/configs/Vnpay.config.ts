import { HashAlgorithm, VNPay, ignoreLogger } from 'vnpay';

export const vnpay = new VNPay({
    tmnCode: process.env.TMN_CODE || "ULF0RWPF",
    secureSecret: process.env.VNPAY_SECRET_KEY || "NERTVJRP2CEBHMWY3J5DXDECZ8WDFTG4",
    vnpayHost: 'https://sandbox.vnpayment.vn',
    testMode: true,
    hashAlgorithm: HashAlgorithm.SHA512,// tùy chọn, ghi đè vnpayHost thành sandbox nếu là true


    /**
     * Sử dụng enableLog để bật/tắt logger
     * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
     */
    enableLog: true, // optional

    /**
     * Hàm `loggerFn` sẽ được gọi để ghi log
     * Mặc định, loggerFn sẽ ghi log ra console
     * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
     *
     * `ignoreLogger` là một hàm không làm gì cả
     */
    loggerFn: ignoreLogger, // optional
});