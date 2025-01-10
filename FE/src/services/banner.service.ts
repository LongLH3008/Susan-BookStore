import { IBannerHome, IBannerSale } from "@/common/interfaces/banner";
import { SendRequest } from "@/config";

export const getAllBanners = async () => {
  return await SendRequest("GET", `GetAll/banner/inAdmin`);
};

export const getBannersByID = async (id: string) => {
  return await SendRequest("GET", `GetbyBanner/${id}`);
};

export const CreateBanners = async (banner: IBannerHome) => {
  return await SendRequest("POST", `create/banner`, banner);
};

export const createBannerSale = async (banner: { link: string, is_active: boolean, image: string }) => {
  return await SendRequest("POST", `create/banner-sale`, banner);
};

export const DeleteBanners = async (id: string) => {
  return await SendRequest("DELETE", `DeleteBanner/${id}`);
};

export const UpdateBanners = async (id: string, banner: IBannerHome) => {
  return await SendRequest("PUT", `UpdateBanner/${id}`, banner);
};
export const UpdateStatusBanners = async (
  id: string,
  payload: { is_active: boolean }
) => {
  return await SendRequest("PATCH", "UpdateStatusbanner/" + id, payload);
};
export const UpdateStatusBannerSale = async (
  id: string,
  payload: { is_active: boolean }
) => {
  return await SendRequest("PATCH", "UpdateStatusbanner-sale/" + id, payload);
};

export const getAllBannerSale = async () => {
  return await SendRequest("GET", `GetAll/banner-sale/inAdmin`);
};

export const getBannerSaleByID = async (id: string) => {
  return await SendRequest("GET", `GetbyBanner-sale/${id}`);
};

export const CreateBannerSale = async (banner: IBannerSale) => {
  return await SendRequest("POST", `create/banner-sale/`, banner);
};
export const DeleteBannerSale = async (id: string) => {
  return await SendRequest("DELETE", `DeleteBanner-sale/${id}`);
};
export const UpdateBannerSale = async (id: string, banner: IBannerSale) => {
  return await SendRequest("PUT", `UpdateBanner-sale/${id}`, banner);
};
