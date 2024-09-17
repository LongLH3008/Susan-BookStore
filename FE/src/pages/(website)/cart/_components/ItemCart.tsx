import { Link } from "react-router-dom";

export default function ItemCart({
	data,
	isSelected,
	inc,
	dec,
	remove,
	select,
}: {
	data: ICart;
	isSelected: boolean;
	inc: (arg: string) => void;
	dec: (arg: string) => void;
	remove: (arg: string) => void;
	select: (arg: { _id: string; selected: boolean }) => void;
}) {
	const { product_quantity } = data;
	const { coverImage, title, slug, author, _id, stock } = data.product_id;

	return (
		<div
			className={`relative grid md:grid-cols-12 items-center border-l-2 pl-5 hover:border-zinc-900 duration-100 ease-in cursor-pointer ${
				isSelected == true && "border-zinc-900"
			}`}
		>
			<input
				onChange={() => select({ _id: data._id, selected: !data.selected })}
				type="checkbox"
				checked={isSelected}
				className="max-[640px]:absolute top-0 right-5 md:col-span-1 ring-0 ring-offset-0 checked:bg-black checked:text-white bg-white border-zinc-300"
			/>
			<span className="md:col-span-2 flex justify-center items-center overflow-hidden w-[80px] h-[80px] border border-zinc-300">
				<img src={coverImage} alt={coverImage} />
			</span>
			<span className="md:col-span-5 text-zinc-800 font-[400] text-[14px]">
				<Link to={`/book-detail/${slug}`} className="text-wrap">
					{title}
				</Link>
				<p className="text-[12px] text-zinc-500">{author}</p>
				{product_quantity == 10 && (
					<p className="text-[12px] text-red-500">Số lượng đã đạt tối đa cho phép</p>
				)}
				{product_quantity == stock && <p className="text-[12px] text-red-500">Sản phẩm đã hết</p>}
			</span>
			<div className="md:col-span-2 flex justify-between items-center border text-[15px]">
				<span
					onClick={() => {
						product_quantity == 1 ? remove(_id) : dec(_id);
					}}
					className="p-2 cursor-pointer"
				>
					-
				</span>
				<p>{product_quantity}</p>
				<button
					type="button"
					disabled={product_quantity == 10}
					onClick={() => product_quantity < stock && inc(_id)}
					className={`p-2 cursor-pointer duration-200 ${
						product_quantity == 10 || product_quantity == stock ? "text-red-500 rotate-45" : ""
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
