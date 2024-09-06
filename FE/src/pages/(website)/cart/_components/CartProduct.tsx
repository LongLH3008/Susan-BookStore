type Props = {};
import * as img from "@/common/assets/img";
import { useCart } from "@/common/hooks/useCart";
import { Link } from "react-router-dom";

const ItemCart = ({
	data,
	inc,
	dec,
	remove,
}: {
	data: ICart;
	inc: (arg: string) => void;
	dec: (arg: string) => void;
	remove: (arg: string) => void;
}) => {
	const { product_quantity } = data;
	const { coverImage, title, slug, _id } = data.product_id;

	return (
		<div className="relative grid md:grid-cols-12 items-center border-l-2 pl-5 hover:border-zinc-900 duration-100 ease-in cursor-pointer">
			<input
				type="checkbox"
				name="product1"
				className="max-[640px]:absolute top-0 right-5 md:col-span-1 ring-0 ring-offset-0 checked:bg-black checked:text-white bg-white border-zinc-300"
			/>
			<span className="md:col-span-2 flex justify-center items-center overflow-hidden w-[80px] h-[80px] border border-zinc-300">
				<img src={coverImage} alt={coverImage} />
			</span>
			<span className="md:col-span-5 text-zinc-800 font-[400] text-[14px]">
				<p className="text-wrap">{title}</p>
				<p className="text-[12px] text-zinc-500">Attribute</p>
			</span>
			<div className="md:col-span-2 flex justify-between items-center border text-[15px]">
				<span
					onClick={() => {
						product_quantity == 1 ? remove(_id) : dec(_id);
					}}
					className="p-2"
				>
					-
				</span>
				<p>{product_quantity}</p>
				<span onClick={() => inc(_id)} className="p-2">
					+
				</span>
			</div>
			<span
				onClick={() => remove(_id)}
				className="max-[640px]:absolute -top-1 right-0 md:col-span-2 justify-self-end hover:text-red-500 text-zinc-500"
			>
				<i className="fa-solid fa-xmark"></i>
			</span>
		</div>
	);
};

const CartProducts = ({ dataCart, user_id }: { dataCart: ICart[]; user_id: string }) => {
	const { onAction: Remove } = useCart({
		action: "REMOVE",
		onError: (err: any) => console.log(err),
	});

	const { onAction: IncreaseAmount } = useCart({
		action: "INCREASE",
		onError: (err: any) => console.log(err),
	});

	const { onAction: DecreaseAmount } = useCart({
		action: "DECREASE",
		onError: (err: any) => console.log(err),
	});

	const removeProduct = (product_id: string) => {
		Remove({ user_id, product_id });
	};

	const Increase = (product_id: string) => {
		IncreaseAmount({ user_id, product_id });
	};

	const Decrease = (product_id: string) => {
		DecreaseAmount({ user_id, product_id });
	};

	return (
		<div className="overflow-hidden overscrollHidden overflow-y-scroll min-[1000px]:col-span-3 min-[1000px]:pr-[30px] flex flex-col justify-between gap-3">
			{dataCart?.length && dataCart.length > 0 ? (
				<div className="h-[50vh] flex flex-col gap-8 overflow-hidden overflow-y-scroll overscrollHidden mb-5 scroll-smooth">
					{dataCart.map((item: ICart, index: number) => (
						<ItemCart
							key={index}
							inc={Increase}
							dec={Decrease}
							remove={removeProduct}
							data={item}
						/>
					))}
				</div>
			) : (
				<div className="h-[50dvh] w-full flex items-center justify-center">Your cart is empty</div>
			)}
			<div className="grid grid-cols-2 min-[1000px]:flex min-[1000px]:flex-wrap min-[1000px]:justify-start min-[1000px]:items-center gap-3 *:bg-black *:text-white *:px-[25px] *:py-[10px] *:text-[14px]">
				<button className="hover:bg-zinc-700">Clear</button>
				<button className="hover:bg-zinc-700">Select All</button>
				<Link to={"/shop"} state={{ from: location.pathname }} className="hover:bg-zinc-700">
					Continue Shopping
				</Link>
				<Link to={"/checkout"} state={{ from: location.pathname }} className="hover:bg-zinc-700">
					Continue Checkout
				</Link>
			</div>
		</div>
	);
};

export default CartProducts;
