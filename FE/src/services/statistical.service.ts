import { IFilterDate } from "@/common/interfaces/statiscal";
import { SendRequest } from "@/config";

export const filterByDayAndMonth = async (data: IFilterDate) => {
  return await SendRequest("POST", "filterbydayandmonth", data);
};

export const getTopBook = async () => {
  return await SendRequest("GET", "topfivebook");
};

export const getTopUser = async () => {
  return await SendRequest("GET", "topfiveuser");
};
