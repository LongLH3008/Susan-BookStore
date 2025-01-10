import { getLocation } from "@/config";

export const getAllCity = async () => {
    return await getLocation({ location: 'province' });
}

export const getAllDistrict = async (parent_id?: any) => {
    return await getLocation({ location: 'district', parent_id: Number(parent_id) })
}

export const getWards = async (parent_id: any) => {
    return await getLocation({ location: 'ward', parent_id: Number(parent_id) })
}
