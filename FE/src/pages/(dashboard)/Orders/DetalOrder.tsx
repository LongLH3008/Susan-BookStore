import { IOrder, IProductOrrder } from "@/common/interfaces/checkout";
import { ConvertVNDString } from "@/common/shared/round-number";
import { Chip } from "@mui/material";
import React from "react";

const DetalOrder = ({ dataOrder }: { dataOrder: IOrder }) => {
  return (
    <>
      <div className="grid grid-cols-5 *:p-3 bg-[#eaecf0]">
        <div className="col-span-3  rounded-lg">
          <div className="bg-white p-4 rounded-lg">
            <p className="font-bold mb-4 rounded-lg">Sản phẩm</p>

            <div className="bg-[#eaecf0] p-3 rounded-lg">
              <div className="flex *:me-5 *:text-sm ">
                <p>Số loại SP : {dataOrder?.products.length} </p>
                {/* <p>Số lượng SP : {dataOrder?.products} </p> */}
              </div>
              {dataOrder?.products?.map((product: IProductOrrder) => (
                <div className="rounded-lg p-3 bg-white mt-3">
                  <h2 className="text-sm font-bold ">
                    <Chip
                      label={product?.isbn}
                      className="bg-pink-100 border border-pink-500 text-pink-500 truncate"
                      size="small"
                    />{" "}
                    {product.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Số trang : {product.length}</p>
                    <p>
                      <Chip
                        label={ConvertVNDString(product.price) + " đ"}
                        size="small"
                      />{" "}
                      x
                      <Chip label={product.quantity} size="small" />
                    </p>
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
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg">
                    {dataOrder.payment.method == "COD"
                      ? 0
                      : ConvertVNDString(dataOrder.total)}
                    đ
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
                  <p>Tổng số tiền SP</p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg">
                    {ConvertVNDString(
                      dataOrder.products.reduce(
                        (total, product) => total + product.price,
                        0
                      )
                    )}{" "}
                    đ
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4 border-dashed border-b-2 border-gray-300 *:text-sm *:text-end">
                  <p>Giảm giá </p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg text-green-600">
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
                  <p>Sau giảm giá</p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg">
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
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg text-blue-600">
                    25.000 đ
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4 border-dashed border-b-2 border-gray-300 *:text-sm *:text-end">
                  <p>Cần thanh toán</p>
                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg text-blue-600">
                    {ConvertVNDString(dataOrder.total)} đ
                  </p>
                </div>
                {dataOrder.payment.method !== "COD" && (
                  <div className="flex items-center justify-between mb-4 border-dashed border-b-2 border-gray-300 *:text-sm *:text-end">
                    <p>Đã thanh toán</p>
                    <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg">
                      {dataOrder.payment.method == "COD"
                        ? 0
                        : ConvertVNDString(dataOrder.total)}{" "}
                      đ
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
                  <p>Còn thiếu</p>

                  <p className="bg-[#eaecf0] w-[25%] p-1 rounded-lg text-red-600">
                    {dataOrder.state !== "success"
                      ? dataOrder.payment.method == "COD"
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
              <p className="bg-[#eaecf0] py-1 px-2">{dataOrder.user_name}</p>
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.user_phone_number}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 *:rounded-lg *:text-sm *:truncate">
              <p className="bg-[#eaecf0] py-1 px-2">{dataOrder.user_email}</p>
              {/* <p className="bg-[#eaecf0] py-1 px-2">0707709155</p> */}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg *:mb-4 mt-3">
            <p className="font-bold rounded-lg">Nhận hàng</p>
            <div className="grid grid-cols-2 gap-2 *:rounded-lg *:text-sm *:truncate">
              <p className="bg-[#eaecf0] py-1 px-2">{dataOrder.user_name}</p>
              <p className="bg-[#eaecf0] py-1 px-2">
                {dataOrder.user_phone_number}
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
            <p className="font-bold rounded-lg">Vận chuyển</p>
            <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
              <p>Mã vận đơn</p>
              <p className="bg-green-900 text-white p-1 rounded-lg">
                {dataOrder.trackingNumber}
              </p>
            </div>
            <div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
              <p>Trạng thái đơn hàng</p>
              <p className="bg-green-900 text-white p-1 rounded-lg">
                {dataOrder?.state}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalOrder;
