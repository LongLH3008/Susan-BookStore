import { cartData } from "@/common/hooks/useCart";
import { useToast } from "@/common/hooks/useToast";
import { IProduct } from "@/common/interfaces/product";
import { ToastVariant } from "@/common/interfaces/toast";
import * as CartService from "@/services/cart.service";
import { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const HandleAmountData = ({ detailProduct, user_id }: { detailProduct: IProduct; user_id: string }) => {
	const [quantity, setQuantity] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { toast } = useToast();
	const { data: cart, add } = cartData();
	const nav = useNavigate();

	const checkExistInCart = cart.find((item) => item.product_id._id == detailProduct._id);

	const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const numericValue = Number(value);
		setQuantity(numericValue);
	};

	const Increase = () => {
		setQuantity(quantity + 1);
	};

	const Decrease = () => {
		if (quantity < 2) return;
		setQuantity(quantity - 1);
	};

	const checkErr = () => {
		const limit = detailProduct.stock > 10 ? 10 : detailProduct.stock;
		if (checkExistInCart && quantity + checkExistInCart?.product_quantity > limit)
			return "Số lượng đã đạt tối đa cho phép";
		if (detailProduct.stock <= 1 || quantity > limit) return "Số lượng không có sẵn";
	};

	const AddProductToCart = async (quantity: number, arg?: { checkout: boolean }) => {
		const limit = detailProduct.stock > 10 ? 10 : detailProduct.stock;
		if (detailProduct.stock == 0 || quantity == 0) return;
		if (checkExistInCart && checkExistInCart.product_quantity + quantity > limit) return;
		if (quantity > detailProduct.stock) return;

		if (arg?.checkout) {
			setIsLoading(true);
			const data_item_cart =
				cart.length > 0
					? cart.map((item) =>
							item.product_id._id == detailProduct._id
								? { _id: item._id, selected: true }
								: { _id: item._id, selected: false }
					  )
					: [{ _id: detailProduct._id, selected: true }];
			const add = await CartService.AddToCart({
				product_id: detailProduct._id,
				user_id,
				product_quantity: quantity,
			});
			if (!add) return;
			const res = await CartService.SelectToCheckout({ user_id, data_item_cart });
			if (!res) return;
			setIsLoading(false);
			setTimeout(() => {
				nav(`/thanh-toan/${user_id}`), setIsLoading(false);
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
					<p className="me-3">SL :</p>
					<div className="relative flex items-center max-w-[8rem] *:p-4">
						<span
							onClick={() => Decrease()}
							className={`bg-transparent text-sm hover:bg-gray-200 border border-gray-300 focus:ring-gray-100  focus:ring-2 focus:outline-none`}
						>
							-
						</span>
						<input
							type="number"
							className="bg-transparent border-x-0 ring-0 outline-0 focus:ring-0 border-gray-300 text-center text-gray-900 text-sm"
							value={quantity}
							min={0}
							max={100}
							onChange={(e) => changeAmount(e)}
						/>
						<span
							onClick={() => Increase()}
							className={`bg-transparent text-sm hover:bg-gray-200 border border-gray-300 focus:ring-gray-100  focus:ring-2 focus:outline-none`}
						>
							<i className={`fa-solid fa-plus duration-200 `}></i>
						</span>
					</div>
				</div>
				<div
					onClick={() => AddProductToCart(quantity)}
					className={`flex cursor-pointer items-center border-2 text-zinc-700 hover:text-[#00BFC5] border-[#000] hover:border-[#00BFC5]
							px-9 h-16`}
				>
					<span className=" flex items-center">
						<AiOutlineShopping className="text-xl mr-1" />
						Thêm vào giỏ hàng
					</span>
				</div>
			</div>
			<div className="mb-5 text-red-500 text-sm">{checkErr()}</div>
			<div className="w-full flex flex-col gap-1">
				<button
					onClick={() => !isLoading && AddProductToCart(quantity, { checkout: true })}
					disabled={isLoading}
					type="button"
					className="w-full py-4 cursor-pointer transition duration-150 bg-black border border-black text-white font-bold hover:border-[#00BFC5] hover:text-[#00BFC5] hover:bg-white"
				>
					{isLoading ? <BeatLoader color="#00bfc5" /> : "Mua ngay"}
				</button>
				<Link
					to="tel:+84346540479"
					className="hover:underline flex items-center gap-2 hover:text-[#00bfc5] my-3"
				>
					<FaPhoneAlt className="text-sm" />
					Liên hệ để đặt số lượng lớn
				</Link>
			</div>
		</>
	);
};

export default HandleAmountData;
