import { debounce } from "@mui/material";
import { useEffect } from "react";
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
	const { coverImage, title, slug, author, _id, stock } = data.product_id;

	useEffect(() => {
		stock == 0 && select({ _id: data._id, selected: false });
	}, []);

	const Increase = debounce(() => {
		if (product_quantity + 1 > 10) return;
		inc(_id);
	}, 500);

	const Decrease = debounce(() => {
		if (product_quantity < 2 || product_quantity == 1) {
			return;
		}
		dec(_id);
	}, 300);

	return (
		<div
			className={`relative grid md:grid-cols-12 items-center md:border-l-2 md:pl-5 ${
				stock > 0 && "hover:border-zinc-900"
			} duration-100 ease-in cursor-pointer ${stock > 0 && isSelected == true && "border-zinc-900"}`}
		>
			<input
				onChange={() => stock > 1 && select({ _id: data._id, selected: !data.selected })}
				type="checkbox"
				disabled={stock == 0}
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
				{product_quantity + 1 > 10 && (
					<p className="text-[12px] text-red-500">Số lượng sản phẩm đã đạt tối đa cho phép</p>
				)}
				{stock == 0 && <p className="text-[12px] text-red-500">Số lượng không có sẵn</p>}
			</span>
			<div className="md:col-span-2 flex justify-between items-center border text-[15px]">
				<span onClick={() => Decrease()} className="p-2 cursor-pointer">
					-
				</span>
				<input
					type="number"
					className="w-14 ring-0 border-0 text-center"
					value={stock > 0 ? product_quantity : 0}
					onChange={(e) => stock > 1 && change(e, data)}
				/>
				<button
					type="button"
					disabled={product_quantity + 1 > stock}
					onClick={() => Increase()}
					className={`p-2 cursor-pointer duration-200 ${
						product_quantity >= stock ? "text-red-500 rotate-45" : ""
					}`}
				>
					+
				</button>
			</div>
			<span
				onClick={() => remove(_id)}
				className="max-[640px]:absolute -top-1 right-0 md:col-span-2 justify-self-end hover:text-red-500 text-zinc-500"
			>
				<i className="fa-solid fa-xmark"></i>
			</span>
		</div>
	);
}
