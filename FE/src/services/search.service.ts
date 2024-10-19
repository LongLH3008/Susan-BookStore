import { SendRequest } from "@/config";


export const getKeywords = async (data: any) => {
    return await SendRequest("POST", `search`, data);
  };