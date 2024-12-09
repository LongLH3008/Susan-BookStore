import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { ConvertVNDString } from "@/common/shared/round-number";
import { cancelOrderUser } from "@/services/user.service";
import { useQueryClient } from "@tanstack/react-query";

const ProductOrderItem = ({ product }: { product: any }) => {
	const calcDiscount =
		Math.abs(product.discount) > 0 ? product.price * Math.abs((100 - product.discount) / 100) : product.price;

	return (
		<div className="max-sm:flex max-sm:flex-col grid grid-cols-7 max-sm:text-[15px] text-[13px] last-of-type:border-0 border-b border-dashed">
			<div className="col-span-2">{product.title}</div>
			<div className="col-span-1">
				{Math.abs(product.discount) > 0 ? "- " + Math.abs(product.discount) + "%" : ""}
			</div>
			<div className="col-span-1 line-through">
				{Math.abs(product.discount) > 0 ? ConvertVNDString(product.price) : ""}
			</div>
			<div className="col-span-1">{ConvertVNDString(calcDiscount)}đ</div>
			<div className="col-span-1">x{product.quantity}</div>
			<div className="col-span-1 font-[500]">{ConvertVNDString(product.total)}đ</div>
		</div>
	);
};

const OrderItem = ({ item }: { item: any }) => {
	const queryClient = useQueryClient();
	const { toast, close } = useToast();
	const handleStates = (state: string) => {
		const states: Record<string, { label: string; bg: string; text: string }> = {
			pending: {
				label: "Đang chờ duyệt",
				bg: "bg-amber-100",
				text: "text-amber-500",
			},
			confirmed: {
				label: "Chờ giao",
				bg: "bg-[#bee3f8]",
				text: "text-[#2b6cb0]",
			},
			shipped: {
				label: "Đang giao hàng",
				bg: "bg-[#d4f1f4]",
				text: "text-[#3182ce]",
			},
			cancelled: {
				label: "Đã hủy",
				bg: "bg-red-100",
				text: "text-red-500",
			},
			success: {
				label: "Giao thành công",
				bg: "bg-[#c6f6d5]",
				text: "text-[#2f855a]",
			},
		};

		const currentState = states[state];
		if (!currentState) {
			return {
				label: "Không xác định",
				bg: "#e2e8f0",
				text: "#4a5568",
			};
		}

		return {
			label: currentState.label.toUpperCase(),
			bg: currentState.bg,
			text: currentState.text,
		};
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

	const cancelOrder = (id: string) => {
		toast({
			variant: ToastVariant.CONFIRM,
			confirmTextButton: "Đồng ý",
			confirm: async () => {
				try {
					const res = await cancelOrderUser(id, "cancelled");
					queryClient.invalidateQueries({ queryKey: ["orders_user"] });
				} catch (error) {
					toast({
						variant: ToastVariant.ERROR,
						content: "Hủy đơn hàng thất bại. Đã có lỗi xảy ra !",
					});
				}
				close();
			},
			content: "Bạn chắc chắn muốn hủy đơn hàng này ?",
		});
	};

	return (
		<div className="max-h-fit w-full text-red-100 bg-[#fff] p-3 border flex flex-col justify-between shadow-md rounded-md">
			<div className="flex justify-between items-center max-sm:flex-wrap">
				<h4 className="font-[600] text-zinc-600">#{item.trackingNumber}</h4>
				<div className="flex justify-between flex-wrap text-sm text-zinc-500 items-start gap-1">
					<span className="font-[400] bg-zinc-200 text-black p-2 rounded-sm">
						Tạo lúc {new Date(item.createdAt).toLocaleString("vi-VN")}
					</span>
					<span
						className={`p-2 rounded-sm font-[500]
						${handleStates(item.state).bg} ${handleStates(item.state).text}`}
					>
						{handleStates(item.state).label}
					</span>
					{item.state === "pending" && (
						<span
							onClick={() => cancelOrder(item._id)}
							className="bg-red-500 text-white p-2 cursor-pointer rounded-sm font-[500] ml-5"
						>
							Hủy đơn hàng
						</span>
					)}
				</div>
			</div>
			<div className="flex flex-col my-5 h-fit max-h-[25dvh] overflow-y-scroll order_scroll border-y text-zinc-500 border-zinc-300 border-dashed *:py-5">
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
