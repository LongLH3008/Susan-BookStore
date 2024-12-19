import { userState } from "@/common/hooks/useAuth";
import { cartData } from "@/common/hooks/useCart";
import { useLocalStorageCart } from "@/common/hooks/useLocalStorageCart";
import { getProducttById } from "@/services/product.service";
import { debounce } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ItemCart({
	data,
	isSelected,
	inc,
	dec,
	remove,
	change,
	select,
}: {
	data: ICart;
	isSelected: boolean;
	inc: (arg: string) => void;
	dec: (arg: string) => void;
	change: (e: React.ChangeEvent<HTMLInputElement>, data: ICart) => void;
	remove: (arg: string) => void;
	select: (arg: { _id: string; selected: boolean }) => void;
}) {
	const { product_quantity } = data;
	const { id: user_id } = userState();
	const { coverImage, title, slug, author } = data.product_id;
	const { add } = cartData();
	const { changeQuantity: changeLc, getCart } = useLocalStorageCart();
	const [productStatus, setProductStatus] = useState<{ stock: number; isActive: boolean }>({
		stock: 1,
		isActive: true,
	});

	useEffect(() => {
		(async () => {
			const {
				metadata: { stock: checkStock, isActive },
			} = await getProducttById(data.product_id._id);
			setProductStatus({ stock: checkStock, isActive });
			if (checkStock < 1 || !isActive) select({ _id: data._id, selected: false });
			if (checkStock > 1 && data.product_quantity > checkStock) modifyQuantity(checkStock);
			if (!checkStock || checkStock < 1) modifyQuantity(0);
		})();
	}, []);

	const modifyQuantity = (quantity: number) => {
		if (user_id) {
			const product_quantity = quantity - data.product_quantity;
			add({ product_id: data.product_id._id, product_quantity, user_id });
		} else {
			changeLc(data._id, quantity);
			getCart();
		}
	};

	const Increase = debounce(() => {
		const limit = productStatus.stock > 10 ? 10 : productStatus.stock;
		if (product_quantity + 1 > limit || !productStatus.isActive) return;
		inc(data.product_id._id);
	}, 500);

	const Decrease = debounce(() => {
		if (product_quantity < 2 || product_quantity == 1) {
			return;
		}
		dec(data.product_id._id);
	}, 300);

	const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (productStatus.stock < 1) return;
		if (e.target.value.length > 3) {
			console.log(e.target.value.length);
			return;
		}
		const limit = productStatus.stock > 10 ? 10 : productStatus.stock;
		let value = Number(e.target.value) > limit ? { target: { value: limit } } : e;
		change(value as any, data);
	};

	const checkErr = () => {
		if (!productStatus.isActive) return "Sản phẩm đã ngừng bán";
		if (productStatus.stock < 1) return "Số lượng không có sẵn";
		if (product_quantity + 1 > 10 || product_quantity + 1 > productStatus.stock)
			return "Số lượng đã đạt tối đa cho phép";
		return "";
	};

	return (
		<div
			className={`relative grid md:grid-cols-12 items-center md:border-l-2 md:pl-5 ${
				productStatus.stock > 0 && productStatus.isActive && "hover:border-zinc-900"
			} duration-100 ease-in cursor-pointer ${
				productStatus.stock > 0 && productStatus.isActive && isSelected == true && "border-zinc-900"
			}`}
		>
			<input
				onChange={() => productStatus.stock > 1 && select({ _id: data._id, selected: !data.selected })}
				type="checkbox"
				disabled={productStatus.stock == 0}
				checked={isSelected}
				className={`max-[640px]:absolute top-0 right-5 md:col-span-1 ring-0 ring-offset-0 checked:bg-black checked:text-white bg-white border-zinc-300`}
			/>
			<span className="md:col-span-2 flex justify-center items-center overflow-hidden w-[80px] h-[80px] border border-zinc-300">
				<img src={coverImage} alt={coverImage} />
			</span>
			<span className="md:col-span-5 max-lg:flex max-lg:flex-col max-lg:gap-1 max-lg:py-2 text-zinc-800 font-[400] text-[14px]">
				<Link to={`/san-pham/${slug}`} className="text-wrap">
					{title}
				</Link>
				<p className="text-[12px] text-zinc-500">{author}</p>
				<p className="text-[12px] text-red-500">{checkErr()}</p>
			</span>
			<div className="md:col-span-2 flex justify-between items-center border text-[15px]">
				<span onClick={() => Decrease()} className="p-2 cursor-pointer">
					-
				</span>
				<input
					type="number"
					className="w-14 ring-0 border-0 text-center"
					value={productStatus.stock > 0 && productStatus.isActive ? product_quantity : 0}
					onChange={(e) => changeQuantity(e)}
				/>
				<button
					type="button"
					disabled={product_quantity + 1 > productStatus.stock}
					onClick={() => Increase()}
					className={`p-2 cursor-pointer duration-200 ${
						product_quantity >= productStatus.stock ? "text-red-500 rotate-45" : ""
					}`}
				>
					+
				</button>
			</div>
			<span
				onClick={() => remove(data.product_id._id)}
				className="max-[640px]:absolute -top-1 right-0 md:col-span-2 justify-self-end hover:text-red-500 text-zinc-500"
			>
				<i className="fa-solid fa-xmark"></i>
			</span>
		</div>
	);
}
