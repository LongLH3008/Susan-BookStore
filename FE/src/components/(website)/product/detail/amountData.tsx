import { cartData } from "@/common/hooks/useCart";
import { useToast } from "@/common/hooks/useToast";
import { IProduct } from "@/common/interfaces/product";
import { ToastVariant } from "@/common/interfaces/toast";
import * as CartService from "@/services/cart.service";
import { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AmountData = ({ detailProduct, user_id }: { detailProduct: IProduct; user_id: string }) => {
	const [quantity, setQuantity] = useState<number>(1);
	const { toast } = useToast();
	const { data: cart, add } = cartData();
	const nav = useNavigate();

	const checkExistInCart = cart.find((item) => item.product_id._id == detailProduct._id);

	const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const numericValue = Number(value);
		const limit = detailProduct.stock > 10 ? 10 : detailProduct.stock;
		if (numericValue > limit) {
			e.preventDefault();
			return setQuantity(limit);
		}
		if (numericValue <= 1) {
			e.preventDefault();
			return setQuantity(0);
		}
		if (checkExistInCart && numericValue + checkExistInCart.product_quantity > limit) {
			e.preventDefault();
			return setQuantity(limit - checkExistInCart.product_quantity);
		}
		setQuantity(numericValue);
	};

	const Increase = () => {
		if (checkExistInCart && Number(quantity) + checkExistInCart.product_quantity >= 10) return;
		if (checkExistInCart && Number(quantity) + checkExistInCart.product_quantity >= detailProduct.stock) return;
		if (quantity + 1 >= 10) return;
		if (quantity + 1 >= detailProduct.stock) return;
		setQuantity(quantity + 1);
	};

	const Decrease = () => {
		if (quantity < 2) return;
		setQuantity(quantity - 1);
	};

	const AddProductToCart = async (quantity: number, arg?: { checkout: boolean }) => {
		if (detailProduct.stock == 0 || quantity == 0) return;
		if (checkExistInCart && checkExistInCart.product_quantity + quantity > detailProduct.stock) return;
		if (quantity > detailProduct.stock) return;

		if (arg?.checkout) {
			const data_item_cart = cart.map((item) =>
				item.product_id._id == detailProduct._id
					? { _id: item._id, selected: true }
					: { _id: item._id, selected: false }
			);
			const add = await CartService.AddToCart({
				product_id: detailProduct?._id as string,
				user_id,
				product_quantity: quantity,
			});
			if (!add) return;
			const res = await CartService.SelectToCheckout({ user_id, data_item_cart });
			if (!res) return;
			setTimeout(() => {
				nav(`/thanh-toan/${user_id}`);
			}, 1000);
			return;
		}

		add({
			product_id: detailProduct?._id as string,
			user_id,
			product_quantity: quantity,
		});

		toast({
			variant: ToastVariant.ADD_TO_CART,
			content: "Đã thêm vào giỏ hàng",
			duration: 1500,
		});
		setQuantity(1);
	};

	return (
		<>
			<div className="flex items-center sm:flex-wrap *:sm:mt-4 mb-4 justify-between mt-8 mr-0 w-full">
				<div className="flex items-center ">
					<div className="relative flex items-center max-w-[8rem] *:p-4">
						<span
							onClick={() => Decrease()}
							className={`bg-transparent text-sm hover:bg-gray-200 border border-gray-300 focus:ring-gray-100  focus:ring-2 focus:outline-none`}
						>
							-
						</span>
						<input
							type="number"
							className="bg-transparent w-12 border-x-0 ring-0 outline-0 focus:ring-0 border-gray-300 text-center text-gray-900 text-sm"
							value={quantity}
							min={0}
							max={100}
							onChange={(e) => changeAmount(e)}
						/>
						<span
							onClick={() => Increase()}
							className={`bg-transparent text-sm hover:bg-gray-200 border border-gray-300 focus:ring-gray-100  focus:ring-2 focus:outline-none`}
						>
							<i
								className={`fa-solid fa-plus duration-200 ${
									quantity <= detailProduct.stock ||
									(checkExistInCart &&
										Number(quantity) + checkExistInCart.product_quantity <=
											detailProduct.stock &&
										Number(quantity) + checkExistInCart.product_quantity <= 10)
										? ""
										: "rotate-45 text-red-500"
								}`}
							></i>
						</span>
					</div>
				</div>
				<div
					onClick={() => AddProductToCart(quantity)}
					className={`flex cursor-pointer items-center border-2 text-zinc-700 hover:text-[#00BFC5] border-[#000] hover:border-[#00BFC5]
							px-5 h-14`}
				>
					<span className=" flex items-center">
						<AiOutlineShopping className="text-xl mr-1" />
						Thêm vào giỏ hàng
					</span>
				</div>
			</div>
			{quantity == 10 ||
			(checkExistInCart && Number(quantity) + checkExistInCart.product_quantity >= 10) ? (
				<p className="text-red-500 text-sm mb-3">Số lượng đã đạt tối đa cho phép</p>
			) : (
				""
			)}
			{quantity > detailProduct.stock ||
			(checkExistInCart && Number(quantity) + checkExistInCart.product_quantity > detailProduct.stock) ? (
				<p className="text-red-500 text-sm mb-3">Số lượng không có sẵn</p>
			) : (
				""
			)}
		</>
	);
};

export default AmountData;
