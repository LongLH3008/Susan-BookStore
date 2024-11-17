import { ConvertVNDString } from "@/common/shared/round-number";

type Props = {};

const ProductOrderItem = ({ product }: { product: any }) => {
	console.log("vcl", product);
	return (
		<div className="max-sm:flex max-sm:flex-col grid grid-cols-7 max-sm:text-[15px] text-[13px] last-of-type:border-0 border-b border-dashed">
			<div className="col-span-2">{product.title}</div>
			<div className="col-span-1">
				{Math.abs(product.discount) > 0 ? "- " + Math.abs(product.discount) + "%" : ""}
			</div>
			<div className="col-span-1 line-through">
				{Math.abs(product.discount) > 0 ? ConvertVNDString(product.price) : ""}
			</div>
			<div className="col-span-1">
				{Math.abs(product.discount) > 0
					? ConvertVNDString(product.price * ((100 - Math.abs(product.discount)) / 100))
					: ConvertVNDString(product.price)}
				đ
			</div>
			<div className="col-span-1">x{product.quantity}</div>
			<div className="col-span-1 font-[500]">{ConvertVNDString(product.total)}đ</div>
		</div>
	);
};

export default ProductOrderItem;
