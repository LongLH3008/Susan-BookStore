type Props = {};
import * as img from "@/assets/img";
import { Link } from "react-router-dom";

const ItemCart = () => {
	return (
        <div className="relative grid md:grid-cols-12 items-center border-l-2 pl-5 hover:border-zinc-900 duration-100 ease-in cursor-pointer">
            <input
                type="checkbox"
                name="product1"
                className="max-[640px]:absolute top-0 right-5 md:col-span-1 ring-0 ring-offset-0 checked:bg-black checked:text-white bg-white border-zinc-300"
            />
            <span className="md:col-span-2 flex justify-center items-center overflow-hidden w-[80px] h-[80px] border border-zinc-300">
                <img src={img.demo} alt="" />
            </span>
            <span className="md:col-span-5 text-zinc-800 font-[400] text-[14px]">
                <p className="text-wrap">Name Product</p>
                <p className="text-[12px] text-zinc-500">Attribute</p>
            </span>
            <div className="md:col-span-2 flex justify-between items-center border text-[15px]">
                <span className="p-2">-</span>
                <p>1</p>
                <span className="p-2">+</span>
            </div>
            <span className="max-[640px]:absolute -top-1 right-0 md:col-span-2 justify-self-end hover:text-red-500 text-zinc-500">
                <i className="fa-solid fa-xmark"></i>
            </span>
    </div>
	);
};

const CartProducts = (props: Props) => {
	return (
		<div className="overflow-hidden overscrollHidden overflow-y-scroll min-[1000px]:col-span-3 min-[1000px]:pr-[30px] flex flex-col justify-between gap-3">
			<div className="h-[50vh] flex flex-col gap-8 overflow-hidden overflow-y-scroll overscrollHidden mb-5 scroll-smooth">
                <ItemCart />
                <ItemCart />
                <ItemCart />
                <ItemCart />
                <ItemCart />
                <ItemCart />
			</div>
			<div className="grid grid-cols-2 min-[1000px]:flex min-[1000px]:flex-wrap min-[1000px]:justify-start min-[1000px]:items-center gap-3 *:bg-black *:text-white *:px-[25px] *:py-[10px] *:text-[14px]">
				<button className="hover:bg-zinc-700">Clear</button>
				<button className="hover:bg-zinc-700">Select All</button>
				<Link to={'/shop'} state={{from: location.pathname}} className="hover:bg-zinc-700">Continue Shopping</Link>
				<Link to={'/checkout'} state={{from: location.pathname}} className="hover:bg-zinc-700">Continue Checkout</Link>
			</div>
		</div>
	);
};

export default CartProducts;
