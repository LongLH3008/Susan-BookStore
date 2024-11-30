import { userState } from "@/common/hooks/useAuth";
import { useCart } from "@/common/hooks/useCart";
import { useLocalStorageCart } from "@/common/hooks/useLocalStorageCart";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";

export default function CartProducts({ dataCart }: { dataCart: ICart[] }) {
	const { id: user_id } = userState();
	const { decrease, increase, remove, select, selectAllLocal, removeSelectAllLocal } = useLocalStorageCart();
	const { onAction: Remove } = useCart({ action: "REMOVE" });
	const { onAction: IncreaseAmount } = useCart({ action: "INCREASE" });
	const { onAction: DecreaseAmount } = useCart({ action: "DECREASE" });
	const { onAction: Select } = useCart({ action: "SELECT_TO_CHECKOUT" });

	const selectedProducts = dataCart?.map(({ _id, selected }) => ({ _id, selected }));

	const removeProduct = (product_id: string) => {
		user_id ? Remove({ user_id, product_id }) : remove(product_id);
	};

	const Increase = (product_id: string) => {
		user_id ? IncreaseAmount({ user_id, product_id }) : increase(product_id);
	};

	const Decrease = (product_id: string) => {
		user_id ? DecreaseAmount({ user_id, product_id }) : decrease(product_id);
	};

	const SelectSingle = (arg: { _id: string; selected: boolean }) => {
		const data_item_cart = selectedProducts.map((item: TCartSelectItem) =>
			item._id == arg._id ? { ...arg } : item
		);
		user_id ? Select({ user_id, data_item_cart }) : select({ _id: arg._id, selected: arg.selected });
	};

	const removeAllSelect = () => {
		const data_item_cart = selectedProducts.map((item: TCartSelectItem) => ({ ...item, selected: false }));
		user_id ? Select({ user_id, data_item_cart }) : removeSelectAllLocal();
	};

	const selectAll = () => {
		const data_item_cart = selectedProducts.map((item: TCartSelectItem) => ({ ...item, selected: true }));
		user_id ? Select({ user_id, data_item_cart }) : selectAllLocal();
	};

	return (
		<div className="overflow-hidden overscrollHidden overflow-y-scroll min-[1000px]:col-span-3 min-[1000px]:pr-1 flex flex-col justify-between gap-3">
			{dataCart?.length && dataCart.length > 0 ? (
				<div className="h-[50vh] flex flex-col gap-8 overflow-hidden overflow-y-scroll cart_scroll pr-5 mb-5 scroll-smooth">
					{dataCart.map((item: ICart, index: number) => (
						<ItemCart
							key={index}
							isSelected={item.selected}
							select={SelectSingle}
							inc={Increase}
							dec={Decrease}
							remove={removeProduct}
							data={item}
						/>
					))}
				</div>
			) : (
				<div className="h-[50dvh] w-full flex items-center justify-center">
					Giỏ hàng chưa có sản phẩm
				</div>
			)}
			<div className="grid lg:grid-cols-2 min-[1000px]:flex min-[1000px]:flex-wrap min-[1000px]:justify-start min-[1000px]:items-center gap-3 *:bg-black *:text-white *:px-[25px] *:py-[10px] *:text-[14px]">
				{dataCart?.filter((item: TCartSelectItem) => item.selected == true).length > 0 && (
					<button onClick={() => removeAllSelect()} className="hover:bg-zinc-700 text-center">
						Bỏ chọn tất cả
					</button>
				)}
				{dataCart?.filter((item: TCartSelectItem) => item.selected == false).length > 0 && (
					<button onClick={() => selectAll()} className="hover:bg-zinc-700 text-center">
						Chọn tất cả
					</button>
				)}
				<Link
					to={"/cua-hang"}
					state={{ from: location.pathname }}
					className="hover:bg-zinc-700 text-center"
				>
					Tiếp tục mua hàng
				</Link>
				{dataCart?.filter((item: TCartSelectItem) => item.selected == true).length > 0 && (
					<Link
						to={`/thanh-toan/${user_id}`}
						state={{ from: location.pathname }}
						className="hover:bg-zinc-700 text-center"
					>
						Thanh toán
					</Link>
				)}
			</div>
		</div>
	);
}
