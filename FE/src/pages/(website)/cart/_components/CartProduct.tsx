import { useCart } from "@/common/hooks/useCart";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";

export default function CartProducts({ dataCart, user_id }: { dataCart: ICart[]; user_id: string }) {
	const { onAction: Remove } = useCart({ action: "REMOVE" });
	const { onAction: IncreaseAmount } = useCart({ action: "INCREASE" });
	const { onAction: DecreaseAmount } = useCart({ action: "DECREASE" });
	const { onAction: Select } = useCart({ action: "SELECT_TO_CHECKOUT" });

	const selectedProducts = dataCart?.map(({ _id, selected }) => ({ _id, selected }));
	console.log(selectedProducts);

	const removeProduct = (product_id: string) => {
		Remove({ user_id, product_id });
	};

	const Increase = (product_id: string) => {
		IncreaseAmount({ user_id, product_id });
	};

	const Decrease = (product_id: string) => {
		DecreaseAmount({ user_id, product_id });
	};

	const SelectSingle = (arg: { _id: string; selected: boolean }) => {
		const data_item_cart = selectedProducts.map((item: TCartSelectItem) =>
			item._id == arg._id ? { ...arg } : item
		);
		Select({ user_id, data_item_cart });
	};

	const removeAllSelect = () => {
		const data_item_cart = selectedProducts.map((item: TCartSelectItem) => ({ ...item, selected: false }));
		Select({ user_id, data_item_cart });
	};

	const selectAll = () => {
		const data_item_cart = selectedProducts.map((item: TCartSelectItem) => ({ ...item, selected: true }));
		Select({ user_id, data_item_cart });
	};

	return (
		<div className="overflow-hidden overscrollHidden overflow-y-scroll min-[1000px]:col-span-3 min-[1000px]:pr-[30px] flex flex-col justify-between gap-3">
			{dataCart?.length && dataCart.length > 0 ? (
				<div className="h-[50vh] flex flex-col gap-8 overflow-hidden overflow-y-scroll overscrollHidden mb-5 scroll-smooth">
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
			<div className="grid grid-cols-2 min-[1000px]:flex min-[1000px]:flex-wrap min-[1000px]:justify-start min-[1000px]:items-center gap-3 *:bg-black *:text-white *:px-[25px] *:py-[10px] *:text-[14px]">
				{dataCart?.filter((item: TCartSelectItem) => item.selected == true).length > 0 && (
					<button onClick={() => removeAllSelect()} className="hover:bg-zinc-700">
						Bỏ chọn tất cả
					</button>
				)}
				{dataCart?.filter((item: TCartSelectItem) => item.selected == false).length > 0 && (
					<button onClick={() => selectAll()} className="hover:bg-zinc-700">
						Chọn tất cả
					</button>
				)}
				<Link to={"/shop"} state={{ from: location.pathname }} className="hover:bg-zinc-700">
					Tiếp tục mua hàng
				</Link>
				{dataCart?.filter((item: TCartSelectItem) => item.selected == true).length > 0 && (
					<Link to={"/checkout"} state={{ from: location.pathname }} className="hover:bg-zinc-700">
						Thanh toán
					</Link>
				)}
			</div>
		</div>
	);
}
