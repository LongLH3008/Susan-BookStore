import * as icon from "@/common/assets/icon";
import { useLocalStorageCart } from "@/common/hooks/useLocalStorageCart";
import { ConvertVNDString } from "@/common/shared/round-number";
import { Link } from "react-router-dom";
import ItemMiniCart from "./ItemCart";

const LocalStorageCart = () => {
	const { cart_products, remove } = useLocalStorageCart();

	const removeProduct = (product_id: string) => {
		remove(product_id);
	};

	const subtotal = cart_products.reduce(
		(acc: number, item: any) => acc + item.product_id.price * item.product_quantity,
		0
	);
	const discountArr = cart_products.filter((item: any) => Math.abs(item.product_id.discount) > 0 && item);

	const discount = discountArr?.reduce((acc: number, item: any) => {
		const discountPercent = Math.abs(item?.product_id?.discount);
		const price = Number(item?.product_id?.price);
		const quantity = Number(item?.product_quantity);

		const calc = acc + (discountPercent / 100) * price * quantity;
		return Math.round(calc);
	}, 0);

	return (
		<div className="relative group">
			<span className="max-[1000px]:hidden h-full flex items-center relative">
				<img className="w-[38px] max-[1000px]:w-[20px]" src={icon.miniCart} alt="" />
				<p id="amount_books_in_miniCart" className="text-[#00BFC5] absolute bottom-1/2 -right-2">
					{cart_products.length}
				</p>
			</span>
			<div
				className={`w-[370px] -right-1/4 translate-x-1/4 absolute group-hover:top-[110%] -z-50 group-hover:z-10 opacity-0 group-hover:opacity-100 top-[50%] h-fit duration-200 shadow-lg bg-white p-[35px]`}
			>
				{cart_products.length && cart_products.length > 0 ? (
					<>
						<div className="text-zinc-600 w-full pb-5 grid gap-y-5 border-b cart_scroll pr-3 overflow-y-scroll scroll-smooth max-h-[200px]">
							{cart_products.map((item: any, index: number) => (
								<ItemMiniCart
									key={index}
									data={item.product_id}
									amount={item.product_quantity}
									remove={removeProduct}
								/>
							))}
						</div>
						<ul className="py-5 border-b *:flex *:justify-between *:items-center *:py-2 *:text-zinc-800">
							<li className="text-[12px]">
								<p>Tạm tính :</p>
								<span className="font-semibold">{ConvertVNDString(subtotal)}</span>
							</li>
							<li className="text-[12px]">
								<p>Giảm giá :</p>
								<span className="font-semibold">- {ConvertVNDString(discount)}</span>
							</li>
							<li>
								<p>Tổng cộng :</p>
								<span className="font-semibold">
									{ConvertVNDString((subtotal ?? 0) - (discount ?? 0))}
								</span>
							</li>
						</ul>
						<Link to={"/gio-hang"} state={{ from: location.pathname }}>
							<button className="mt-5 border-2 text-[13px] font-semibold border-zinc-900 w-full uppercase h-[55px] hover:bg-zinc-900 hover:text-white">
								chi tiết giỏ hàng
							</button>
						</Link>
					</>
				) : (
					<div className="flex items-center justify-center">Giỏ hàng chưa có sản phẩm</div>
				)}
			</div>
		</div>
	);
};

export default LocalStorageCart;
