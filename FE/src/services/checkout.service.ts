import { SendRequest } from "@/config";

export const getListBank = async () => {
    return await SendRequest('GET', 'payment/bank-list');
}