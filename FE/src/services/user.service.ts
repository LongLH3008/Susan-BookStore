import { SendRequest } from "@/config";

export const getUserAddress = async (arg: { user_id: string }) => {
    return SendRequest('GET', `Getall/info-user-WithUserId?userId=${arg.user_id}&page=1&limit=12`)
}

export const createUserAddress = async (arg: any) => {
    return SendRequest('POST', 'create/info-user', arg);
}

export const updateUserAddress = async (arg: any) => {
    return SendRequest('PATCH', `info-user/update/${arg.id}`, arg)
}

export const removeUserAddress = async (id: string) => {
    return SendRequest('DELETE', `Delete/info-user/${id}`);
}

export const cancelOrderUser = async (id: string, state: string) => {
    return SendRequest("PATCH", `update-status-order/${id}`, { state })
}