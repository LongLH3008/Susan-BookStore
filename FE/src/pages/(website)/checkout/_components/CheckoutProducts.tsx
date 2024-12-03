import { CheckoutContext } from "@/common/context/ContextCheckout";
import { ConvertVNDString } from "@/common/shared/round-number";
import { useContext } from "react";
import ItemInCheckout from "./ItemInCheckout";

const CheckoutProducts = () => {
	const { data: cart, checkingOrder, orderAddress_Payment_Discount } = useContext(CheckoutContext);

	return (
		<div
			className={`max-lg:order-first max-lg:border-b-[1px] max-lg:mb-5 max-lg:pb-10 border-b-zinc-600
			lg:sticky lg:top-0 lg:left-[54.2%] lg:h-screen
			w-full lg:w-[55.5%] max-h-full lg:bg-zinc-50 lg:border-l flex flex-col justify-start items-start max-lg:px-0 p-[30px] lg:pr-[5.3%] xl:pr-[13%] 2xl:pr-[21%]`}
		>
			{cart && cart.map((item: ICart, index: number) => <ItemInCheckout key={index} data={item} />)}
			<div className="w-full mt-10 flex flex-col gap-2 *:flex *:justify-between *:items-center">
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Tạm tính</p>
					<p>{ConvertVNDString(checkingOrder.subtotal)} đ</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Giảm giá</p>
					<p>{ConvertVNDString(checkingOrder.discountAmount)} đ</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Phí vận chuyển</p>
					<p>{ConvertVNDString(checkingOrder.feeShip)} đ</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<div className="flex flex-col justify-start gap-1">
						<span>Mã giảm giá</span>
						{orderAddress_Payment_Discount.discountCode && (
							<span className="text-[12px] text-zinc-500">
								{orderAddress_Payment_Discount.discountCode}
							</span>
						)}
					</div>
					<p>{ConvertVNDString(checkingOrder.discountAmountVoucher)} đ</p>
				</div>
				<div className="max-lg:sticky max-lg:top-0 max-lg:left-0 text-zinc-700 text-[18px] font-semibold mt-10">
					<p>Tổng cộng</p>
					<p>
						<span className="text-[13px] text-zinc-400 mr-1">VND</span>
						<span>{ConvertVNDString(checkingOrder.total)} đ</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutProducts;
