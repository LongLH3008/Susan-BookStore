import { FeeShip, IBankingPayment, ICaclCheckout } from "@/common/interfaces/checkout";
import { SendRequest } from "@/config";

export const getListBank = async () => {
    return await SendRequest('GET', 'payment/bank-list');
}

export const calcCheckout = async (arg: ICaclCheckout) => {
    return await SendRequest('POST', 'orders/checkout-review', arg)
}

export const createOrder = async (arg: any) => {
    return await SendRequest('POST', 'orders/checkout', arg);
}

export const bankingPayment = async (args: IBankingPayment) => {
    return await SendRequest('POST', '/payment/create-payment-url', args);
}

export const checkBankingSuccess = async (url: string) => {
    return await SendRequest('POST', '/payment/verify-url', { url });
}

export const checkFeeShip = async (arg: FeeShip) => {
    return await SendRequest('POST', '/giao-hang-nhanh/preview-shipfee', arg)
}