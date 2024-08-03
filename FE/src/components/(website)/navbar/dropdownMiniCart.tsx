import { Link } from "react-router-dom";
import * as icon from "@/common/assets/icon";
import * as img from "@/common/assets/img";
import { CustomDropDownMiniCart } from "@/common/ui/CustomDropDownNavbar";
import { Dropdown } from "flowbite-react";

const ItemMiniCart = () => {
	return (
		<div className="grid grid-cols-7 h-[80px]">
			<span className="col-span-2 flex justify-center items-center overflow-hidden border">
				<img className="" src={img.bannerDropdownShop} alt="" />
			</span>
			<div className="ps-[15px] col-span-5 flex flex-col justify-center overflow-hidden relative">
				<Link
					to={"/"}
					state={{ from: location.pathname }}
					className="text-[12px] text-wrap hover:text-[#00BFC5]"
				>
					Name
				</Link>
				<span className="absolute right-0 top-1/4 hover:text-[#00BFC5]">
					<i className="fa-solid fa-xmark"></i>
				</span>
				<p className="text-[14px]">
					<span>amount</span> x <span>$ price</span>
				</p>
			</div>
		</div>
	);
};

const DropdownMiniCart = () => {
	return (
		<>
			<Link to={"/cart"} state={{ from: location.pathname }} className="min-[1000px]:hidden relative ">
				<img className="w-[20px]" src={icon.miniCart} alt="" />
				<p id="amount_books_in_miniCart" className="text-[#00BFC5] absolute -top-3 -right-2">
					0
				</p>
			</Link>
			<Dropdown
				className=""
				theme={CustomDropDownMiniCart}
				inline
				placement="bottom-end"
				label={
					<span className="max-[1000px]:hidden relative">
						<img className="w-[38px] max-[1000px]:w-[20px]" src={icon.miniCart} alt="" />
						<p
							id="amount_books_in_miniCart"
							className="text-[#00BFC5] absolute -top-3 -right-2"
						>
							0
						</p>
					</span>
				}
			>
				<div className="text-zinc-600 w-full pb-5 grid gap-y-5 border-b overscrollHidden overflow-y-scroll scroll-smooth h-[200px]">
					<ItemMiniCart />
					<ItemMiniCart />
					<ItemMiniCart />
					<ItemMiniCart />
				</div>
				<ul className="py-5 border-b *:flex *:justify-between *:items-center *:py-2 *:text-zinc-800 *:text-[14px] ">
					<li>
						<p>Subtotal :</p>
						<span className="font-semibold">$ total</span>
					</li>
					<li>
						<p>Total :</p>
						<span className="font-semibold">$ total</span>
					</li>
				</ul>
				<Link to={"/cart"} state={{ from: location.pathname }}>
					<button className="mt-5 border-2 text-[13px] font-semibold border-zinc-900 w-full uppercase h-[55px] hover:bg-zinc-900 hover:text-white">
						view cart
					</button>
				</Link>
				<Link target="_blank" to={"/checkout"}>
					<button className="mt-5 border-2 text-[13px] font-semibold border-zinc-900 w-full uppercase h-[55px] hover:bg-zinc-900 hover:text-white">
						checkout
					</button>
				</Link>
			</Dropdown>
		</>
	);
};

export default DropdownMiniCart;
