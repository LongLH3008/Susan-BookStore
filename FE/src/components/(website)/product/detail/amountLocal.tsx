import { useLocalStorageCart } from "@/common/hooks/useLocalStorageCart";
import { useToast } from "@/common/hooks/useToast";
import { IProduct } from "@/common/interfaces/product";
import { ToastVariant } from "@/common/interfaces/toast";
import { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AmountLocal = ({ detailProduct }: { detailProduct: IProduct }) => {
	const [quantity, setQuantity] = useState<number>(1);
	const { toast } = useToast();
	const { cart_products: cart, add, removeSelectAllLocal, select } = useLocalStorageCart();
	const nav = useNavigate();

	const checkExistInCart = cart.find((item) => item.product_id._id == detailProduct._id);

	const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const numericValue = Number(value);
		if (checkExistInCart && numericValue + checkExistInCart.product_quantity > 10) {
			e.preventDefault();
			return setQuantity(10 - checkExistInCart.product_quantity);
		}
		if (checkExistInCart && numericValue + checkExistInCart.product_quantity > detailProduct.stock) {
			e.preventDefault();
			return setQuantity(detailProduct.stock - checkExistInCart.product_quantity);
		}
		if (numericValue > 10) {
			e.preventDefault();
			return setQuantity(10);
		}
		if (numericValue > detailProduct.stock) {
			e.preventDefault();
			return setQuantity(detailProduct.stock);
		}
		if (numericValue <= 1) {
			e.preventDefault();
			return setQuantity(0);
		}
		setQuantity(numericValue);
	};

	const Increase = () => {
		if (checkExistInCart && Number(quantity) + checkExistInCart.product_quantity > 10) return;
		if (checkExistInCart && Number(quantity) + checkExistInCart.product_quantity > detailProduct.stock) return;
		if (quantity + 1 > 10) return;
		if (quantity + 1 > detailProduct.stock) return;
		setQuantity(quantity + 1);
	};

	const Decrease = () => {
		if (quantity < 2) return;
		setQuantity(quantity - 1);
	};

	const AddProductToCart = (quantity: number, arg?: { checkout: boolean }) => {
		if (checkExistInCart && checkExistInCart.product_quantity + quantity > detailProduct.stock) return;
		if (quantity > detailProduct.stock || quantity == 0) return;
		add({ ...detailProduct }, quantity);

		if (arg?.checkout) {
			removeSelectAllLocal();
			select({ _id: detailProduct._id, selected: true });
			setTimeout(() => nav("/thanh-toan"), 400);
			return;
		}

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
			{quantity >= detailProduct.stock && (
				<p className="text-red-500 text-sm mb-3">Số lượng không có sẵn</p>
			)}
			{checkExistInCart && Number(quantity) + checkExistInCart.product_quantity > 10 && (
				<p className="text-red-500 text-sm mb-3">Số lượng sản phẩm trong giỏ đã đạt tối đa cho phép</p>
			)}
			{checkExistInCart && Number(quantity) + checkExistInCart.product_quantity > detailProduct.stock && (
				<p className="text-red-500 text-sm mb-3">Số lượng không có sẵn</p>
			)}
		</>
	);
};

export default AmountLocal;
