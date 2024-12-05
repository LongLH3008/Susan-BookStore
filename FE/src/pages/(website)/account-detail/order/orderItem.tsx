import { ConvertVNDString } from "@/common/shared/round-number";

const ProductOrderItem = ({ product }: { product: any }) => {
	return (
		<div className="max-sm:flex max-sm:flex-col grid grid-cols-7 max-sm:text-[15px] text-[13px] last-of-type:border-0 border-b border-dashed">
			<div className="col-span-2">{product.title}</div>
			<div className="col-span-1">
				{Math.abs(product.discount) > 0 ? "- " + Math.abs(product.discount) + "%" : ""}
			</div>
			<div className="col-span-1 line-through">
				{Math.abs(product.discount) > 0 ? ConvertVNDString(product.price) : ""}
			</div>
			<div className="col-span-1">
				{Math.abs(product.discount) > 0
					? ConvertVNDString(product.price * ((100 - Math.abs(product.discount)) / 100))
					: ConvertVNDString(product.price)}
				đ
			</div>
			<div className="col-span-1">x{product.quantity}</div>
			<div className="col-span-1 font-[500]">{ConvertVNDString(product.total)}đ</div>
		</div>
	);
};

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

	const handleVoucher = (products: any[]) => {
		if (products.length == 0 || !products) return;
		const check = products.find((item) => item.discountAmountVoucher > 0);
		if (!check) return "";
		return ConvertVNDString(check.discountAmountVoucher);
	};

	return (
		<div className="max-h-fit w-full bg-[#fff] p-3 border flex flex-col justify-between shadow-md rounded-md">
			<div className="flex justify-between items-center max-sm:flex-wrap">
				<h4 className="font-[600] text-zinc-600">#{item.trackingNumber}</h4>
				<div className="flex justify-between flex-wrap text-sm text-zinc-500 items-start gap-1">
					<span className="font-[400] bg-zinc-200 text-black p-2 rounded-sm">
						Tạo lúc {new Date(item.createdAt).toLocaleString("vi-VN")}
					</span>
					<span className="text-[#00bfc5] font-[500] bg-[#cdfffa] p-2 rounded-sm">
						{handleState(item.state)}
					</span>
				</div>
			</div>
			<div className="flex flex-col my-5 h-fit border-y text-zinc-500 border-zinc-300 border-dashed *:py-5">
				{item.products.map((e: any, i: number) => (
					<ProductOrderItem product={e} key={i} />
				))}
			</div>
			<div className="flex flex-wrap font-[400] text-sm max-sm:*:w-full text-zinc-500 max-sm:text-center justify-end items-center gap-1 *:rounded-md *:px-3 *:py-2">
				<span className="">Tạm tính : {handleFeeProducts(item.products)}đ</span>|
				{handleVoucher(item.products) !== "" && (
					<span className="">Mã giảm giá : -{handleVoucher(item.products)}đ</span>
				)}
				<span className="">Phí giao hàng : {handleFeeShip(item.total, item.products)}đ</span>|
				<span className="">Thành tiền : {ConvertVNDString(item.total)}đ</span>
			</div>
		</div>
	);
};

export default OrderItem;
