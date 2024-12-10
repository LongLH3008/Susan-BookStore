import { ConvertVNDString } from "@/common/shared/round-number";
import { useEffect, useState } from "react";

interface IStatusList {
	label: string;
	title: string;
	color: string;
}
interface Props {
	dataOrder: any;
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

	const handleFeeShip = (total: number, products: any[]) => {
		if (products.length == 0 || !products) return;
		const calc = total - products.reduce((init: number, item: any) => item.total + init, 0);
		return ConvertVNDString(calc);
	};

	return (
		<>
			<div className="grid grid-cols-5">
				<div className="col-span-3 flex flex-col justify-between p-3 rounded-lg">
					<div className="border-b mb-5 pb-5 w-full border-zinc-300">
						<p className="font-[500] text-lg mb-4 flex items-center gap-2rounded-lg">
							Sản phẩm
							<span className="text-lg ml-2">({dataOrder?.products.length})</span>
						</p>
						<div className="rounded-lg h-[25dvh] overflow-y-scroll order_scroll w-full">
							{dataOrder?.products?.map((product: any) => (
								<div
									key={product._id}
									className="rounded-lg w-full p-3 flex items-center justify-between gap-5 bg-white mt-3"
								>
									<div className="flex items-center gap-3">
										<figure className="size-14 grid place-items-center overflow-hidden rounded-md border border-zinc-100">
											<img
												src={product.image}
												alt=""
												className="w-full h-full object-cover"
											/>
										</figure>
										<h2 className="text-sm font-[500] max-w-[80%] text-wrap">
											{product.title}
										</h2>
									</div>
									<div className="flex flex-col gap-1">
										<div className="flex items-center justify-between">
											<p className="text-sm mr-3">-{product.discount}%</p>
											<div className="flex items-center gap-2 text-sm">
												<span>
													{ConvertVNDString(product.price) + "đ"}
												</span>
												x<span>{product.quantity}</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="bg-white rounded-lg">
						<p className="font-[500] text-lg rounded-lg">Thanh toán</p>
						<div className="">
							<div className="rounded-lg flex flex-col gap-1">
								<div className="flex items-center justify-between *:text-sm *:text-end">
									<p>Tạm tính</p>
									<p className="w-[25%] p-1 rounded-lg font-[500]">
										{ConvertVNDString(
											dataOrder.products.reduce(
												(total: number, product: any) =>
													total + product.subtotal,
												0
											)
										)}{" "}
										đ
									</p>
								</div>
								<div className="flex items-center justify-between border-gray-300 *:text-sm *:text-end">
									<p>Giảm giá sản phẩm</p>
									<p className="w-[25%] p-1 rounded-lg font-[500]">
										-{" "}
										{ConvertVNDString(
											dataOrder.products.reduce(
												(total: number, product: any) =>
													total + product.discountAmount,
												0
											)
										)}{" "}
										đ
									</p>
								</div>
								<div className="flex items-center justify-between border-gray-300 *:text-sm *:text-end">
									<p>Giảm giá mã giảm giá</p>
									<p className="w-[25%] p-1 rounded-lg font-[500]">
										-{" "}
										{ConvertVNDString(
											dataOrder.products.reduce(
												(total: number, product: any) =>
													total + product.discountAmountVoucher,
												0
											)
										)}{" "}
										đ
									</p>
								</div>
								<div className="flex items-center justify-between *:text-sm *:text-end">
									<p>Phí vận chuyển</p>
									<p className="w-[25%] p-1 rounded-lg font-[500]">
										{handleFeeShip(dataOrder.total, dataOrder.products)}đ
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-between border-t pt-5 mt-5 border-gray-300 *:text-end">
						<h3 className="font-[500] text-lg">Tổng cộng</h3>
						<p className="w-[25%] p-1 rounded-lg font-[500]">
							{ConvertVNDString(dataOrder.total)} đ
						</p>
					</div>
				</div>
				<div className="col-span-2 ml-3 pl-3 flex flex-col justify-between border-l">
					<div className="bg-white p-4 rounded-lg *:mb-4">
						<p className="font-[500] rounded-lg">Khách hàng</p>
						<ul className="flex flex-col gap-3">
							<li className="flex items-center gap-2 text-sm">
								<span>Tên khách hàng:</span>
								<span>{dataOrder.userInfo.name}</span>
							</li>
							<li className="flex items-center gap-2 text-sm">
								<span>Email:</span>
								<span>{dataOrder.userInfo.email}</span>
							</li>
							<li className="flex items-center gap-2 text-sm">
								<span>SDT:</span>
								<span>{dataOrder.userInfo.phone}</span>
							</li>
							<li className="flex items-center gap-2 text-sm">
								<span>Loại khách hàng:</span>
								<span>
									{dataOrder.user_email !== ""
										? "Chưa có tài khoản"
										: "Đã đăng nhập"}
								</span>
							</li>
						</ul>
					</div>
					<div className="bg-white border-t p-4 *:mb-4 mt-3">
						<p className="font-[500] rounded-lg">Địa chỉ nhận hàng</p>
						<ul className="flex flex-col gap-3">
							<li className="flex items-start gap-3 text-sm">
								<span className="text-wrap">
									{dataOrder.shipping.street}, {dataOrder.shipping.zipcode},{" "}
									{dataOrder.shipping.state}, {dataOrder.shipping.city}
								</span>
							</li>
						</ul>
					</div>
					<div className="bg-white p-4 border-t *:mb-4 mt-3">
						<p className="font-[500] rounded-lg">Đơn hàng</p>
						<div className="flex items-center justify-between mb-4 text-sm *:text-end">
							<p>Phương thức thanh toán</p>
							<p className={`font-[500] text-[13px]`}>
								{dataOrder?.payment?.method == "COD"
									? "Thanh toán khi nhận hàng (COD)"
									: "Chuyển khoản (VNPAY)"}
							</p>
						</div>
						<div className="flex items-center justify-between mb-4 text-sm *:text-end">
							<p>Trạng thái thanh toán</p>
							<span className="font-[500] text-sm">
								{dataOrder?.payment.method === "COD"
									? dataOrder.state === "success"
										? "Đã thanh toán"
										: "Chưa thanh toán"
									: "Đã thanh toán"}
							</span>
						</div>
						<div className="flex items-center justify-between mb-4 *:text-sm *:text-end">
							<p>Trạng thái đơn hàng</p>
							<p className={`font-[500]`}>{state?.title}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DetalOrder;
