import { CheckoutContext } from "@/common/context/ContextCheckout";
import { ConvertVNDString } from "@/common/shared/round-number";
import { useContext } from "react";
import ItemInCheckout from "./ItemInCheckout";

const CheckoutProducts = () => {
	const { data: cart } = useContext(CheckoutContext);

	const subtotal = cart?.reduce((acc: number, item: any) => acc + item.product_id.price * item.product_quantity, 0);
	const discountArr = cart?.filter((item: any) => Math.abs(item.product_id.discount) > 0 && item);
	const discount = discountArr?.reduce(
		(acc: number, item: any) =>
			acc + (Math.abs(item.product_id.discount) / 100) * item.product_id.price * item.product_quantity,
		0
	);

	return (
		<div
			className={`
			sticky top-0 left-[54.2%] h-screen
			max-[1000px]:hidden w-[55.5%] max-h-full bg-zinc-50 border-l flex flex-col justify-start items-start p-[30px] md:pr-[5.3%] xl:pr-[13%] 2xl:pr-[21%]`}
		>
			{cart && cart.map((item: ICart, index: number) => <ItemInCheckout key={index} data={item} />)}
			<div className="w-full mt-10 flex flex-col gap-2 *:flex *:justify-between *:items-center">
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Tạm tính</p>
					<p>{ConvertVNDString(subtotal)} đ</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Giảm giá</p>
					<p>{ConvertVNDString(discount)} đ</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Phí vận chuyển</p>
					<p>17.000 đ</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Mã giảm giá</p>
					<p>0.17</p>
				</div>
				<div className="text-zinc-700 text-[18px] font-semibold mt-10">
					<p>Tổng cộng</p>
					<p>
						<span className="text-[13px] text-zinc-400 mr-1">VND</span>
						<span>{ConvertVNDString(subtotal - discount + 17000)} đ</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutProducts;
