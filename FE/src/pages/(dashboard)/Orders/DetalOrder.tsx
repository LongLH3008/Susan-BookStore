import { IOrder, IProductOrrder } from "@/common/interfaces/checkout";
import { ConvertVNDString } from "@/common/shared/round-number";
import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";

interface IStatusList {
  label: string;
  title: string;
  color: string;
}
interface Props {
  dataOrder: IOrder;
  statusList: Array<IStatusList>;
}
const DetalOrder = ({ dataOrder, statusList }: Props) => {
  const [state, setState] = useState<IStatusList | null>(null);
  useEffect(() => {
    const foundStatus = statusList.find((s) => s.label === dataOrder.state);
    if (foundStatus) {
      setState(foundStatus);
    }
  }, [dataOrder.state]);
  console.log("dataOrder", dataOrder);

  return (
    <>
      <div className="grid grid-cols-5 *:p-3 bg-[#eaecf0]">
        <div className="col-span-3  rounded-lg">
          <div className="bg-white p-4 rounded-lg">
            <p className="font-bold mb-4 rounded-lg">Sản phẩm</p>

            <div className="bg-[#eaecf0] p-3 rounded-lg">
              <div className="flex *:me-5 *:text-sm ">
                <p>Số loại SP : {dataOrder?.products.length} </p>
                <p>
                  Số lượng SP : {""}
                  {dataOrder.products.reduce(
                    (total, product) => total + product.quantity,
                    0
                  )}{" "}
                </p>
              </div>
              {dataOrder?.products?.map((product: IProductOrrder) => (
                <div key={product._id} className="rounded-lg p-3 bg-white mt-3">
                  <h2 className="text-sm font-bold ">
                    {/* <Chip
                      label={product?.isbn}
                      className="bg-pink-100 border border-pink-500 text-pink-500 truncate"
                      size="small"
                    />{" "} */}
                    {product.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      Giảm giá SP : {product.discount} %
                    </p>
                    <span>
                      <Chip
                        label={ConvertVNDString(product.price) + " đ"}
                        size="small"
                      />{" "}
                      x
                      <Chip label={product.quantity} size="small" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg mt-3">
            <p className="font-bold mb-4 rounded-lg">Thanh toán</p>
            <div className=" p-3 ">
              <div className="rounded-lg p-3 bg-[#eaecf0] ">
                <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
                  <p>Tiền chuyển khoản</p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg font-bold">
                    {dataOrder?.payment.method == "COD"
                      ? 0
                      : ConvertVNDString(dataOrder.total)}
                    đ
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
                  <p>Tổng số tiền SP</p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg font-bold">
                    {ConvertVNDString(
                      dataOrder.products.reduce(
                        (total, product) => total + product.subtotal,
                        0
                      )
                    )}{" "}
                    đ
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4 border-dashed border-b-2 border-gray-300 *:text-sm *:text-end">
                  <p>Giảm giá SP</p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg font-bold text-green-600">
                    {ConvertVNDString(
                      dataOrder.products.reduce(
                        (total, product) => total + product.discountAmount,
                        0
                      )
                    )}{" "}
                    đ
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4 border-dashed border-b-2 border-gray-300 *:text-sm *:text-end">
                  <p>Giảm giá Voucher </p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg font-bold text-green-600">
                    {ConvertVNDString(
                      dataOrder.products.reduce(
                        (total, product) =>
                          total + product.discountAmountVoucher,
                        0
                      )
                    )}{" "}
                    đ
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4 border-dashed border-b-2 border-gray-300 *:text-sm *:text-end">
                  <p>Sau giảm giá</p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg font-bold">
                    {ConvertVNDString(
                      dataOrder.products.reduce(
                        (total, product) => total + product.total,
                        0
                      )
                    )}{" "}
                    đ
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
                  <p>Phí ship</p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg font-bold text-blue-600">
                    25.000 đ
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4 border-dashed border-b-2 border-gray-300 *:text-sm *:text-end">
                  <p>Cần thanh toán</p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg font-bold text-blue-600">
                    {ConvertVNDString(dataOrder.total)} đ
                  </p>
                </div>
                {dataOrder?.payment.method !== "COD" && (
                  <div className="flex items-center justify-between mb-4 border-dashed border-b-2 border-gray-300 *:text-sm *:text-end">
                    <p>Đã thanh toán</p>
                    <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg font-bold">
                      {dataOrder?.payment.method == "COD"
                        ? 0
                        : ConvertVNDString(dataOrder.total)}{" "}
                      đ
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
                  <p>Còn thiếu</p>

                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg font-bold text-red-600">
                    {dataOrder.state !== "success"
                      ? dataOrder?.payment.method == "COD"
                        ? ConvertVNDString(dataOrder.total)
                        : 0
                      : 0}
                    đ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-white p-4 rounded-lg *:mb-4">
            <p className="font-bold rounded-lg">Khách hàng</p>
            <div className="grid grid-cols-2 gap-2 *:rounded-lg *:text-sm *:truncate">
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.user_name || "chưa điền"}
              </p>
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.user_phone_number || "chưa điền"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 *:rounded-lg *:text-sm *:truncate">
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.user_email || "chưa điền"}
              </p>
              {/* <p className="bg-[#eaecf0] py-1 px-2">0707709155</p> */}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg *:mb-4 mt-3">
            <p className="font-bold rounded-lg">Nhận hàng</p>
            <div className="grid grid-cols-2 gap-2 *:rounded-lg *:text-sm *:truncate">
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.user_name || "chưa điền"}
              </p>
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.user_phone_number || "chưa điền"}
              </p>
            </div>
            <p className="bg-[#eaecf0] py-1 px-2 rounded-lg text-sm truncate">
              {dataOrder.shipping.street}
            </p>
            <div className="grid grid-cols-3 gap-2 *:rounded-lg *:text-sm *:truncate">
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.shipping.city}
              </p>
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.shipping.state}
              </p>
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.shipping.zipcode}
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg *:mb-4 mt-3">
            <p className="font-bold rounded-lg">Đơn hàng</p>
            <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
              <p>Phương thức thanh toán</p>
              <p
                className={`${
                  dataOrder?.payment?.method == "COD"
                    ? "bg-green-500"
                    : "bg-red-500"
                } text-white p-1 rounded-lg px-7`}
              >
                {dataOrder?.payment?.method}
              </p>
            </div>
            <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
              <p>Trạng thái thanh toán</p>

              {dataOrder?.payment.method === "COD" ? (
                dataOrder.state === "success" ? (
                  <Chip
                    label="Đã thanh toán"
                    className="bg-green-100 text-green-700 font-bold"
                  />
                ) : (
                  <Chip
                    label="Chưa thanh toán"
                    className="bg-blue-100 text-blue-700 font-bold"
                  />
                )
              ) : (
                <Chip
                  label="Đã thanh toán"
                  className="bg-green-100 text-green-700 font-bold"
                />
              )}
            </div>
            <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
              <p>Trạng thái đơn hàng</p>
              <p
                className={` text-white p-1 rounded-lg px-7`}
                style={{ backgroundColor: state?.color }}
              >
                {state?.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalOrder;
