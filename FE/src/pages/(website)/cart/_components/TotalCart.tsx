import * as icon from "@/common/assets/icon";
import { ConvertVNDString } from "@/common/shared/round-number";

const MakeRoundToTwoDigitDecimal = (number?: number) => {
	return number ? Math.round(number * 100) / 100 : 0;
};

const ItemTotal = ({ data }: { data: ICart }) => {
	const { price, discount, title, format } = data.product_id;
	const { product_quantity } = data;
	const calcDiscountPrice = MakeRoundToTwoDigitDecimal(price * ((100 - Math.abs(discount)) / 100));
	const totalPriceItem = Math.abs(discount) > 0 ? calcDiscountPrice * product_quantity : price * product_quantity;

	return (
		<div className="relative w-full grid grid-cols-7 items-start">
			<span className="col-span-3 pr-3">
				<p className="text-[14px] text-zinc-700 text-wrap">{title}</p>
				<p className="text-zinc-500 text-[12px]">{format}</p>
			</span>
			<div className="col-span-2 text-[13px] text-zinc-700 flex items-center justify-center gap-x-1">
				{discount == 0 ? (
					<span>{ConvertVNDString(price)}</span>
				) : (
					<div className="flex flex-col">
						<span className="mr-1 line-through text-zinc-500">{ConvertVNDString(price)}</span>
						<span>{ConvertVNDString(calcDiscountPrice)}</span>
					</div>
				)}
				<span>x</span>
				{data.product_quantity}
			</div>
			<div className="col-span-2 ml-[2%] text-[14px] justify-end flex">
				{ConvertVNDString(totalPriceItem)} đ
			</div>
		</div>
	);
};

export default function TotalCart({ dataCart }: { dataCart: ICart[] }) {
	const cart_select = dataCart?.filter((item: ICart) => item.selected);

	const subtotal = cart_select?.reduce(
		(acc: number, item: any) => acc + item.product_id.price * item.product_quantity,
		0
	);
	const discountArr = cart_select?.filter((item: any) => Math.abs(item.product_id.discount) > 0 && item);
	const discount = discountArr?.reduce((acc: number, item: any) => {
		const discountPercent = Math.abs(item?.product_id?.discount);
		const price = Number(item?.product_id?.price);
		const quantity = Number(item?.product_quantity);

		const calc = acc + (discountPercent / 100) * price * quantity;
		return Math.round(calc);
	}, 0);

	return (
		<div className="border-zinc-300 max-lg:border-b-[1px] max-lg:border-b-black max-lg:mb-16 max-lg:pb-10 max-lg:order-first flex flex-col justify-between max-[1000px]:mt-5 max-[1000px]:border-t max-[1000px]:pt-5 min-[1000px]:col-span-2 min-[1000px]:border-l min-[1000px]:pl-[30px]">
			<div>
				<div className="flex justify-between justify-items-center mb-10">
					<div className="h-full py-2 text-[20px] font-[400]">Giá trị giỏ hàng</div>
					<div className="flex justify-between items-center gap-2 border p-2 rounded-sm border-zinc-500">
						<img className="w-[20px]" src={icon.cartCheckout} alt="" />
						<span>{dataCart?.length}</span>
					</div>
				</div>
				{cart_select?.length && cart_select.length > 0 ? (
					<div className="flex flex-col h-[20dvh] lg:h-[300px] gap-4 overflow-hidden overflow-y-scroll cart_scroll pr-3">
						{cart_select.map((item: ICart, index: number) => (
							<ItemTotal key={index} data={item} />
						))}
					</div>
				) : (
					<div className="w-full h-[300px] text-sm text-zinc-500 flex items-center justify-center">
						Chưa có sản phẩm được chọn
					</div>
				)}
			</div>
			<div className="border-t border-zinc-300 mt-8 pt-10">
				<div className="flex justify-between items-center text-[15px]">
					<p>Tạm tính</p>
					<p>{ConvertVNDString(subtotal)} đ</p>
				</div>
				<div className="flex justify-between items-center text-[15px]">
					<p>Giảm giá</p>
					<p>- {ConvertVNDString(discount)} đ</p>
				</div>
				<div className="flex justify-between items-center text-xl mt-2">
					<p className="">Tổng cộng</p>
					<p>{ConvertVNDString((subtotal ?? 0) - (discount ?? 0))} đ</p>
				</div>
			</div>
		</div>
	);
}
