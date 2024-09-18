import * as icon from "@/common/assets/icon";
import { userState } from "@/common/hooks/useAuth";
import { useCart } from "@/common/hooks/useCart";
import { ConvertVNDString } from "@/common/shared/round-number";
import { CustomDropDownMiniCart } from "@/common/ui/CustomDropDownNavbar";
import { getCartByUser } from "@/services/cart";
import { useQuery } from "@tanstack/react-query";
import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ItemMiniCart = ({ data, amount, remove }: { data: any; amount: number; remove: (product_id: string) => any }) => {
	return (
		<div className="grid grid-cols-7 h-[80px]">
			<span className="col-span-2 flex justify-center items-center overflow-hidden border">
				<img className="" src={data.coverImage} alt="" />
			</span>
			<div className="ps-[15px] col-span-5 flex flex-col justify-center overflow-hidden relative">
				<Link
					to={`/book-detail/${data.slug}`}
					state={{ from: location.pathname }}
					className="text-[12px] text-wrap hover:text-[#00BFC5]"
				>
					{data.title}
				</Link>
				<span
					className="absolute right-0 top-1/4 hover:text-[#00BFC5]"
					onClick={() => remove(data._id)}
				>
					<i className="fa-solid fa-xmark"></i>
				</span>
				<div className="text-[14px] ml-1">
					<span className="">{amount}</span>
					<span className="mx-1">x</span>
					{data.discount == 0 ? (
						<span>{ConvertVNDString(data.price)}</span>
					) : (
						<>
							<span className="ml-1">
								{ConvertVNDString(
									Math.round(data.price * ((100 - data.discount) / 100) * 100) / 100
								)}
							</span>
							<span className="ml-1 line-through text-[13px] text-[#00bfc5]">
								{ConvertVNDString(data.price)}
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const MiniCart = () => {
	const { onAction } = useCart({ action: "REMOVE" });
	const { id } = userState();
	const [open, setOpen] = useState<boolean>(false);

	const { data: cart } = useQuery({
		queryKey: ["cart"],
		queryFn: async () => await getCartByUser(id),
	});

	console.log(cart);

	const removeProduct = (product_id: string) => {
		onAction({ user_id: id, product_id });
	};

	const subtotal = cart?.metadata.cart_products.reduce(
		(acc: number, item: any) => acc + item.product_id.price * item.product_quantity,
		0
	);
	const discountArr = cart?.metadata.cart_products.filter((item: any) => item.product_id.discount > 0 && item);
	const discount = discountArr?.reduce(
		(acc: number, item: any) =>
			acc + (item.product_id.discount / 100) * item.product_id.price * item.product_quantity,
		0
	);

	return (
		<div className="relative">
			<span
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				className="max-[1000px]:hidden h-full flex items-center relative"
			>
				<img className="w-[38px] max-[1000px]:w-[20px]" src={icon.miniCart} alt="" />
				<p id="amount_books_in_miniCart" className="text-[#00BFC5] absolute bottom-1/2 -right-2">
					{cart?.metadata.cart_products.length}
				</p>
			</span>
			{open && (
				<div
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}
					className={`w-[320px] -right-1/4 translate-x-1/4 absolute top-[110%] h-fit duration-200 shadow-lg bg-white p-[35px]`}
				>
					{cart?.metadata.cart_products.length && cart.metadata.cart_products.length > 0 ? (
						<>
							<div className="text-zinc-600 w-full pb-5 grid gap-y-5 border-b overscrollHidden overflow-y-scroll scroll-smooth max-h-[200px]">
								{cart?.metadata.cart_products.map((item: any, index: number) => (
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
									<span className="font-semibold">
										{ConvertVNDString(subtotal)}
									</span>
								</li>
								<li className="text-[12px]">
									<p>Giảm giá :</p>
									<span className="font-semibold">
										- {ConvertVNDString(discount)}
									</span>
								</li>
								<li>
									<p>Tổng cộng :</p>
									<span className="font-semibold">
										{ConvertVNDString((subtotal ?? 0) - (discount ?? 0))}
									</span>
								</li>
							</ul>
							<Link
								onClick={() => setOpen(false)}
								to={"/gio-hang"}
								state={{ from: location.pathname }}
							>
								<button className="mt-5 border-2 text-[13px] font-semibold border-zinc-900 w-full uppercase h-[55px] hover:bg-zinc-900 hover:text-white">
									chi tiết giỏ hàng
								</button>
							</Link>
						</>
					) : (
						<div className="flex items-center justify-center">Giỏ hàng chưa có sản phẩm</div>
					)}
				</div>
			)}
		</div>
	);
};

const DropdownMiniCart = () => {
	const { id } = userState();
	return (
		<>
			{id ? (
				<MiniCart />
			) : (
				<Dropdown
					className="w-full pt-2 flex items-start justify-end bg-transparent border-none shadow-none min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]"
					theme={CustomDropDownMiniCart}
					inline
					placement="bottom"
					label={
						<span className="max-[1000px]:hidden relative">
							<img className="w-[38px] max-[1000px]:w-[20px]" src={icon.miniCart} alt="" />
						</span>
					}
				>
					<div className="w-[320px] h-fit shadow-lg bg-white border p-[35px] flex items-center">
						<Link
							to={"/dang-nhap"}
							state={{ from: location.pathname }}
							className="flex items-center text-center justify-center border-2 text-[13px] font-semibold border-zinc-900 w-full uppercase h-[55px] hover:bg-zinc-900 hover:text-white p-2"
						>
							Vui lòng đăng nhập
						</Link>
					</div>
				</Dropdown>
			)}
		</>
	);
};

export default DropdownMiniCart;
