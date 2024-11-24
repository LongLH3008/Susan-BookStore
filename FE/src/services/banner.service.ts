import { SendRequest } from "@/config";

export const getAllBanners = async () => {
  return await SendRequest("GET", `GetAll/banner/inAdmin`);
};
