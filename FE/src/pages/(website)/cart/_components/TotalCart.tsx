import * as icon from "@/common/assets/icon";

const MakeRoundToTwoDigitDecimal = (number?: number) => {
	return number ? Math.round(number * 100) / 100 : 0;
};

const ItemTotal = ({ data }: { data: ICart }) => {
	const { price, discount, title, format } = data.product_id;
	const { product_quantity } = data;
	const calcDiscountPrice = MakeRoundToTwoDigitDecimal(price * ((100 - discount) / 100));
	const totalPriceItem = discount > 0 ? calcDiscountPrice * product_quantity : price * product_quantity;

	return (
		<div className="relative w-full grid grid-cols-4 items-start">
			<span className="col-span-2">
				<p className="text-[15px] text-zinc-700">{title}</p>
				<p className="text-zinc-500 text-[12px]">{format}</p>
			</span>
			<div className="text-[14px] text-zinc-700 flex items-center justify-end gap-x-1">
				{discount == 0 ? (
					<>
						<span className="mr-1 line-through text-transparent">${price}</span>
						<span>${price}</span>
					</>
				) : (
					<>
						<span className="mr-1 line-through text-zinc-500">${price}</span>
						<span>${calcDiscountPrice}</span>
					</>
				)}
				<span>x</span>
				{data.product_quantity}
			</div>
			<p className="ml-[2%] text-[15px] justify-end flex">${MakeRoundToTwoDigitDecimal(totalPriceItem)}</p>
		</div>
	);
};

export default function TotalCart({ dataCart }: { dataCart: ICart[] }) {
	const cart_select = dataCart?.filter((item: ICart) => item.selected);

	const subtotal = cart_select?.reduce(
		(acc: number, item: any) => acc + item.product_id.price * item.product_quantity,
		0
	);
	const discountArr = cart_select?.filter((item: any) => item.product_id.discount > 0 && item);
	const discount = discountArr?.reduce(
		(acc: number, item: any) =>
			acc + (item.product_id.discount / 100) * item.product_id.price * item.product_quantity,
		0
	);

	return (
		<div className="border-zinc-300 flex flex-col justify-between max-[1000px]:mt-5 max-[1000px]:border-t max-[1000px]:pt-5 min-[1000px]:col-span-2 min-[1000px]:border-l min-[1000px]:pl-[30px]">
			<div>
				<div className="flex justify-between justify-items-center mb-10">
					<div className="h-full py-2 text-[20px] font-[400]">Total Cart</div>
					<div className="flex justify-between items-center gap-2 border p-2 rounded-sm border-zinc-500">
						<img className="w-[20px]" src={icon.cartCheckout} alt="" />
						<span>{dataCart?.length}</span>
					</div>
				</div>
				{cart_select?.length && cart_select.length > 0 ? (
					<div className="flex flex-col h-[300px] gap-4 overflow-hidden overflow-y-scroll overscrollHidden">
						{cart_select.map((item: ICart, index: number) => (
							<ItemTotal key={index} data={item} />
						))}
					</div>
				) : (
					<div className="w-full h-[300px] text-sm text-zinc-500 flex items-center justify-center">
						There is no product selected
					</div>
				)}
			</div>
			<div className="border-t border-zinc-300 mt-8 pt-10">
				<div className="flex justify-between items-center text-[15px]">
					<p>Subtotal</p>
					<p>${MakeRoundToTwoDigitDecimal(subtotal)}</p>
				</div>
				<div className="flex justify-between items-center text-[15px]">
					<p>Discount</p>
					<p>- ${MakeRoundToTwoDigitDecimal(discount)}</p>
				</div>
				<div className="flex justify-between items-center text-xl mt-2">
					<p className="">Total</p>
					<p>${MakeRoundToTwoDigitDecimal((subtotal ?? 0) - (discount ?? 0))}</p>
				</div>
			</div>
		</div>
	);
}
