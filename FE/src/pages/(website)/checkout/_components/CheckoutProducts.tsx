import { getCartByUser } from "@/services/cart";
import ItemInCheckout from "./ItemInCheckout";
import { useQuery } from "@tanstack/react-query";
import { userState } from "@/common/hooks/useAuth";
import { MakeRoundToTwoDigitDecimal } from "@/common/shared/round-number";

const CheckoutProducts = () => {
	const { id } = userState();

	const { data } = useQuery({
		queryKey: ["cart"],
		queryFn: async () => await getCartByUser(id),
	});

	const cart = data?.metadata.cart_products.filter((item: ICart) => item.selected);
	const subtotal = data?.metadata.cart_products.reduce(
		(acc: number, item: any) => acc + item.product_id.price * item.product_quantity,
		0
	);
	const discountArr = data?.metadata.cart_products.filter((item: any) => item.product_id.discount > 0 && item);
	const discount = discountArr?.reduce(
		(acc: number, item: any) =>
			acc + (item.product_id.discount / 100) * item.product_id.price * item.product_quantity,
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
					<p>Subtotal</p>
					<p>${MakeRoundToTwoDigitDecimal(subtotal)}</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Discount</p>
					<p>${MakeRoundToTwoDigitDecimal(discount)}</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Shipping</p>
					<p>0.17</p>
				</div>
				<div className="text-zinc-700 text-[14px] font-[500]">
					<p>Voucher</p>
					<p>0.17</p>
				</div>
				<div className="text-zinc-700 text-[18px] font-semibold mt-10">
					<p>Total</p>
					<p>
						<span className="text-[13px] text-zinc-400 mr-1">USD</span>
						<span>${MakeRoundToTwoDigitDecimal(subtotal - discount + 0.17)}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutProducts;
