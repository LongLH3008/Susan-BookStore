import { quantityHandle } from "@/common/hooks/useCart";
import { ConvertVNDString } from "@/common/shared/round-number";
import { Link } from "react-router-dom";

const ItemMiniCart = ({ data, amount, remove }: { data: any; amount: number; remove: (product_id: string) => any }) => {
	const { setItemQuantity } = quantityHandle();
	return (
		<div className="grid grid-cols-7 min-h-[80px]">
			<span className="col-span-2 flex justify-center items-center overflow-hidden border">
				<img className="" src={data?.coverImage} alt="" />
			</span>
			<div className="ps-[15px] col-span-5 flex flex-col justify-center overflow-hidden pr-2 relative">
				<Link
					to={`/san-pham/${data?.slug}`}
					state={{ from: location.pathname }}
					className="text-[12px] text-wrap hover:text-[#00BFC5]"
				>
					{data?.title}
				</Link>
				<span
					className="absolute right-0 top-1/4 hover:text-[#00BFC5]"
					onClick={() => {
						remove(data?._id);
						setItemQuantity(0);
					}}
				>
					<i className="fa-solid fa-xmark"></i>
				</span>
				<div className="text-[14px] ml-1">
					<span className="">{amount}</span>
					<span className="mx-1">x</span>
					{Math.abs(data?.discount) == 0 ? (
						<span>{ConvertVNDString(data?.price)}</span>
					) : (
						<>
							<span className="ml-1">
								{ConvertVNDString(
									Math.round(
										data?.price * ((100 - Math.abs(data?.discount)) / 100) * 100
									) / 100
								)}
							</span>
							<span className="ml-1 line-through text-[13px] text-[#00bfc5]">
								{ConvertVNDString(data?.price)}
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ItemMiniCart;
