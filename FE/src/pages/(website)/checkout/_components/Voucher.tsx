import { getAllVoucher } from "@/services/voucher.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {};

const Voucher = (props: Props) => {
	const [chooseVoucher, setChooseVoucher] = useState({ open: false, choose: "" });

	const { data } = useQuery({
		queryKey: ["vouchers"],
		queryFn: async () => await getAllVoucher(),
	});

	console.log(data?.metadata?.discounts);

	return (
		<div className="relative flex flex-col gap-4">
			<p className="text-[16px] font-semibold">Mã giảm giá</p>
			<div
				onClick={() => setChooseVoucher({ choose: chooseVoucher.choose, open: true })}
				className="flex z-10 items-center justify-between px-3 border border-zinc-300 rounded"
			>
				<label className="w-full cursor-pointer flex items-center p-4 pl-0 ms-2 text-sm font-medium text-gray-900">
					<i className="fa-solid fa-ticket mr-2 text-[16px]"></i>
					<span>{chooseVoucher.choose == "" ? "Sử dụng mã giảm giá" : chooseVoucher.choose}</span>
				</label>
				{chooseVoucher.choose !== "" && (
					<div className="flex items-center">
						<span
							onClick={() => {
								() => setChooseVoucher({ choose: "", open: false });
							}}
							className="text-[#222] z-20 text-[12px] underline w-24 cursor-pointer"
						>
							Loại bỏ
						</span>
						<i className="fa-solid fa-check"></i>
					</div>
				)}
			</div>
			<div
				onMouseLeave={() => setChooseVoucher({ choose: chooseVoucher.choose, open: false })}
				className={`${
					chooseVoucher.open
						? "h-[30dvh] opacity-100 translate-y-0"
						: "h-0 opacity-0 -translate-y-1"
				} flex flex-col p-2 min-h-0 max-h-[30dvh] duration-500 ease-in-out pr-[2px] border rounded-md overflow-hidden border-[#222] gap-1`}
			>
				<input
					type="search"
					onKeyDown={(e) => e.key == "Enter" && e.preventDefault()}
					className="ring-0 border-0 text-sm rounded-sm py-2"
					placeholder="Nhập mã giảm giá"
				/>
				<div className="border-t border-zinc-300 pt-2 mt-1 relative h-[25dvh] flex flex-col *:p-3 *:text-sm text-zinc-500 *:cursor-pointer *:border-b overflow-hidden overflow-y-scroll">
					{data?.metadata?.discounts.map((item: any, index: number) => (
						<div
							key={index}
							onClick={() =>
								setChooseVoucher({
									choose:
										chooseVoucher.choose == item.discount_code
											? ""
											: item.discount_code,
									open: chooseVoucher.choose == item.discount_code,
								})
							}
							className={`hover:border-l-[#222] ${
								chooseVoucher.choose == item.discount_code
									? "border-l-[#00BFC5] hover:border-l-red-500"
									: "border-l-transparent"
							} border-l-2 flex justify-between last-of-type:border-b-0`}
						>
							<span>{item.discount_code}</span>
							<span>- 2.000 đ</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Voucher;
