import * as img from "@/common/assets/img";
type Props = {};

const ItemInCheckout = (props: Props) => {
	return (
		<div className="w-full mb-4 relative flex justify-between items-center">
			<span className="bg-[rgba(0,0,0,0.6)] rounded-full p-[7px] py-0 text-white absolute z-10 -top-2 left-[50px]">
				1
			</span>
			<div className="w-[62px] h-[62px] flex justify-center overflow-hidden items-center border border-zinc-300 rounded">
				<img src={img.demo} alt="" />
			</div>
			<span className="min-[320px]:mr-[10%] sm:mr-[50%] lg:mr-[30%] ">
				<p className="text-[15px] text-zinc-700">6. Variable with soldout</p>
				<p className="text-zinc-500 text-[12px]">s / green</p>
			</span>
			<p className="text-[14px] :text-zinc-700">$55.00</p>
		</div>
	);
};

export default ItemInCheckout;
