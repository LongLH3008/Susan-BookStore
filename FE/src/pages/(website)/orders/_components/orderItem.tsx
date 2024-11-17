import { ConvertVNDString } from "@/common/shared/round-number";
import ProductOrderItem from "./productOrderItem";

type Props = {};

const OrderItem = ({ item }: { item: any }) => {
	const handleState = (state: string) => {
		const states: any = {
			pending: "Đang giao hàng",
			success: "Đã hoàn thành",
		};
		return states[state].toUpperCase();
	};

	const handleFeeShip = (total: number, products: any[]) => {
		if (products.length == 0 || !products) return;
		const calc = total - products.reduce((init: number, item: any) => item.total + init, 0);
		return ConvertVNDString(calc);
	};

	const handleFeeProducts = (products: any[]) => {
		if (products.length == 0 || !products) return;
		const calc = products.reduce((init: number, item: any) => item.total + init, 0);
		return ConvertVNDString(calc);
	};

	return (
		<div className="max-h-fit w-full bg-[#fff] p-3 border flex flex-col justify-between shadow-md rounded-md">
			<div className="flex justify-between items-center max-sm:flex-wrap">
				<h4 className="font-[600] text-zinc-600">#{item.trackingNumber}</h4>
				<div className="flex justify-between flex-wrap text-sm text-zinc-500 items-start gap-1">
					<p className="font-[400]">
						đơn hàng được tạo lúc {new Date(item.createdAt).toLocaleString("vi-VN")}
					</p>
					- <p>trạng thái: {handleState(item.state)}</p>
				</div>
			</div>
			<div className="flex flex-col my-10 h-fit border-y border-zinc-300 border-dashed *:py-5">
				{item.products.map((e: any, i: number) => (
					<ProductOrderItem product={e} key={i} />
				))}
			</div>
			<div className="flex flex-wrap max-sm:*:w-full max-sm:text-center justify-end items-end gap-3 *:rounded-md *:px-3 *:py-2 font-[500] text-[#00bfc5]">
				<span className="bg-[#cdfffa]">Tạm tính : {handleFeeProducts(item.products)}đ</span>
				<span className="bg-zinc-100 border border-zinc-100 text-zinc-700">
					Phí giao hàng : {handleFeeShip(item.total, item.products)}đ
				</span>
				<span className="bg-black text-[#fff] font-[500]">
					Thành tiền : {ConvertVNDString(item.total)}đ
				</span>
			</div>
		</div>
	);
};

export default OrderItem;
