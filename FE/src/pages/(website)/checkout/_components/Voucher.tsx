import { CheckoutContext } from "@/common/context/ContextCheckout";
import { IOrderChecking } from "@/common/interfaces/checkout";
import { IVoucher } from "@/common/interfaces/voucher";
import { calcCheckout } from "@/services/checkout.service";
import { getAllVoucher } from "@/services/voucher.service";
import { debounce } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Voucher = () => {
	const [chooseVoucher, setChooseVoucher] = useState({ open: false, choose: "" });
	const [data, setData] = useState<IVoucher[]>([]);
	const {
		data: cart,
		checkingOrder,
		setcheckingOrder,
		setOrder_A_P_D,
		orderAddress_Payment_Discount,
	} = useContext(CheckoutContext);

	useEffect(() => {
		(async () => {
			const data = await getAllVoucher();
			setData(data?.metadata?.discounts);
		})();
	}, []);

	const onChange = debounce(async (value: string) => {
		if (value === "") {
			const data = await getAllVoucher();
			setData(data?.metadata?.discounts);
			return;
		}
		setData((prev) => prev.filter((item) => item.discount_code.includes(value)));
	}, 300);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value; // Lưu giá trị
		onChange(value); // Gọi debounce với giá trị
	};

	const checkDiscountCode = (item: IVoucher) => {
		const present = new Date();
		if (
			new Date(item.discount_end_date) < present ||
			!item.discount_is_active ||
			item.discount_min_order_value > checkingOrder.total
		) {
			return false;
		}
		if (item.discount_applies_to == "all") {
			return true;
		}
		if (item.discount_product_ids && item.discount_product_ids?.length > 0) {
			const product_cart = cart.map((item: ICart) => item.product_id._id);
			const check = product_cart.filter((id: string) => item.discount_product_ids?.includes(id));
			return check.length > 0;
		}
		return false;
	};

	const chooseDiscountCode = async (item: IVoucher) => {
		const code =
			chooseVoucher.choose == `${item.discount_code} ( ${item.discount_description} )`
				? ""
				: `${item.discount_code} ( ${item.discount_description} )`;
		setChooseVoucher({
			choose: code,
			open: chooseVoucher.choose == `${item.discount_code} ( ${item.discount_description} )`,
		});
		await recaculate(code.split("/")[0] ?? "");
	};

	const reset = async () => {
		setChooseVoucher({
			choose: "",
			open: false,
		});
		await recaculate();
	};

	const recaculate = async (code?: string) => {
		setOrder_A_P_D({
			...orderAddress_Payment_Discount,
			discountCode: code ?? "",
		});
		const payloadChecking: IOrderChecking = {
			code: code?.split("(")[0].trim() ?? "",
			products: cart.map((item: ICart) => ({
				bookId: item.product_id._id,
				quantity: item.product_quantity,
			})),
		};

		const checking = await calcCheckout(payloadChecking);
		const { subtotal, total, discountAmount, discountAmountVoucher } = checking?.metadata;
		const feeShip = typeof checkingOrder.feeShip == "number" ? checkingOrder.feeShip : 0;
		setcheckingOrder({
			...checkingOrder,
			subtotal,
			discountAmount,
			discountAmountVoucher,
			total: total + feeShip,
		});
	};

	const handleHeight = () => {
		if (data.length == 0) return 16;
		if (data.length > 3) return 30;
		return data.length * 16;
	};

	return (
		<div className="relative flex flex-col gap-4 group">
			<p className="text-[16px] font-semibold">Mã giảm giá</p>
			<div className="flex z-10 items-center justify-between px-3 border border-zinc-300 rounded">
				<label className="w-full cursor-pointer flex items-center p-4 pl-0 ms-2 text-sm font-medium text-gray-900">
					<i className="fa-solid fa-ticket mr-2 text-[16px]"></i>
					<span>{chooseVoucher.choose == "" ? "Sử dụng mã giảm giá" : chooseVoucher.choose}</span>
				</label>
				{chooseVoucher.choose !== "" && (
					<div className="flex items-center">
						<span
							onClick={() => reset()}
							className="text-[#222] z-20 text-[12px] underline w-24 cursor-pointer"
						>
							Loại bỏ
						</span>
						<i className="fa-solid fa-check"></i>
					</div>
				)}
			</div>
			<div
				className={`group-hover:h-[${
					handleHeight() + "dvh"
				}] group-hover:opacity-100 group-hover:translate-y-0 h-0 p-0 opacity-0 -translate-y-1
				flex flex-col group-hover:py-2 px-2 min-h-0 max-h-[30dvh] duration-500 ease-in-out border rounded-md overflow-hidden border-[#222] gap-1`}
			>
				<input
					type="search"
					onKeyDown={(e) => e.key == "Enter" && e.preventDefault()}
					onChange={(e) => handleInputChange(e)}
					className="ring-0 border-0 text-sm rounded-sm py-2"
					placeholder="Nhập mã giảm giá"
				/>
				<div className="border-t border-zinc-300 pt-2 mt-1 relative flex flex-col gap-2 *:px-3 *:text-sm text-zinc-500 *:cursor-pointer *:border-b overflow-hidden overflow-y-scroll">
					{data.length > 0 ? (
						data.map((item: IVoucher, index: number) => (
							<div
								key={index}
								onClick={() => checkDiscountCode(item) && chooseDiscountCode(item)}
								className={`${
									checkDiscountCode(item) &&
									chooseVoucher.choose == item.discount_code
										? "border-l-[#00BFC5] hover:border-l-red-500"
										: "border-l-transparent"
								} ${
									!checkDiscountCode(item) ? "opacity-75" : "hover:bg-zinc-100"
								} border-l-2 py-2 flex justify-between last-of-type:border-b-0`}
							>
								<div className="flex flex-col gap-1">
									<span>{item.discount_code}</span>
									<span className="text-[12px]">{item.discount_description}</span>
								</div>
								<div className="flex flex-col gap-1 items-end justify-center">
									<span
										className={`${
											checkDiscountCode(item)
												? "bg-black text-white"
												: "border border-zinc-400"
										} w-fit p-1`}
									>
										-{item.discount_value}%
									</span>
									{!checkDiscountCode(item) && (
										<span className="text-[12px] text-black">
											Không đủ điều kiên áp dụng
										</span>
									)}
								</div>
							</div>
						))
					) : (
						<span className="py-2 border-none">Chưa có mã giảm giá nào</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Voucher;
