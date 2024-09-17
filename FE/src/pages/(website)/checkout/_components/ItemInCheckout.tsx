import { ConvertVNDString } from "@/common/shared/round-number";
import { Skeleton } from "@mui/material";

const ItemInCheckout = ({ data }: { data: ICart }) => {
	return (
		<>
			{data && data.product_id ? (
				<div className="w-full mb-4 relative grid grid-cols-5">
					<span className="bg-[rgba(0,0,0,0.6)] rounded-full p-[7px] py-0 text-white absolute z-10 -top-2 left-[50px]">
						{data.product_quantity}
					</span>
					<div className="w-[62px] h-[62px] flex justify-center overflow-hidden items-center border border-zinc-300 rounded">
						<img src={data.product_id.coverImage} alt={data.product_id.title} />
					</div>
					<span className="col-span-3 flex flex-col justify-center">
						<p className="text-[15px] text-zinc-700">{data.product_id.title}</p>
						<p className="text-zinc-500 text-[12px]">{data.product_id.format}</p>
					</span>
					<div className="flex flex-col justify-center">
						{data.product_id.discount > 0 && (
							<p className="text-[14px] text-zinc-700 text-right line-through">
								{ConvertVNDString(data.product_id.price)} đ
							</p>
						)}

						<p className="text-[14px] text-zinc-700 text-right">
							{data.product_id.discount > 0
								? ConvertVNDString(
										data.product_id.price *
											((100 - data.product_id.discount) / 100)
								  )
								: ConvertVNDString(data.product_id.price)}{" "}
							đ
						</p>
					</div>
				</div>
			) : (
				<Skeleton animation="wave" className="w-full h-16" />
			)}
		</>
	);
};

export default ItemInCheckout;
