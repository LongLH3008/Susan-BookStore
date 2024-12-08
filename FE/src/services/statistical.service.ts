import { IFilterDate, IFilterTopBook } from "@/common/interfaces/statiscal";
import { SendRequest } from "@/config";

export const filterByDayAndMonth = async (data: IFilterDate) => {
  return await SendRequest("POST", "filterbydayandmonth/admin", data);
};

export const filterByDay = async (data: IFilterDate) => {
  return await SendRequest("POST", "filterbyday/admin", data);
};

export const getTopBook = async (arg: IFilterTopBook) => {
  return await SendRequest("POST", "statistical-prd-by-date", arg);
};

export const getTopUser = async () => {
  return await SendRequest("GET", "topfiveuser");
};
