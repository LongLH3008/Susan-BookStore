import { CheckoutContext } from "@/common/context/ContextCheckout";
import { getListBank } from "@/services/checkout.service";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

type Props = {};

const Payment = (props: Props) => {
	const [chooseBank, setChooseBank] = useState<any>("");
	const { orderAddress_Payment_Discount, setOrder_A_P_D } = useContext(CheckoutContext);

	const { data: listBank } = useQuery({
		queryKey: ["banks"],
		queryFn: async () => await getListBank(),
	});

	return (
		<div className="relative flex flex-col gap-4">
			<div className="flex flex-col">
				<p className="text-[16px] font-semibold">Phương thức thanh toán</p>
				<p className="text-[14px] text-zinc-500">Mọi giao dịch đều an toàn và được mã hóa.</p>
			</div>
			<div
				onClick={() => {
					setChooseBank("");
					setOrder_A_P_D({ ...orderAddress_Payment_Discount, paymentMethod: "COD" });
				}}
				className="flex items-center justify-between px-3 border border-zinc-300 rounded"
			>
				<label className="w-full cursor-pointer flex items-center p-4 pl-0 ms-2 text-sm font-medium text-gray-900">
					<i className="fa-solid fa-money-bill mr-2 text-[16px]"></i>
					<span>Thanh toán khi nhận hàng</span>
				</label>
				{orderAddress_Payment_Discount.paymentMethod == "COD" && chooseBank == "" && (
					<i className="fa-solid fa-check"></i>
				)}
			</div>
			<div
				onClick={() => {
					// setChooseBank("Ngân hàng NCB");
					setChooseBank("open");
					setOrder_A_P_D({ ...orderAddress_Payment_Discount, paymentMethod: "VNPAY" });
				}}
				className="flex items-center justify-between px-3 border border-zinc-300 rounded"
			>
				<label className="w-full cursor-pointer flex items-center p-4 pl-0 ms-2 text-sm font-medium text-gray-900">
					<i className="fa-solid fa-building-columns mr-2 text-[16px]"></i>
					<span>Chuyển khoản qua ngân hàng</span>
				</label>
				{chooseBank !== "" && chooseBank !== "open" && (
					<div className="flex items-center">
						<span className="text-[12px] w-48">{chooseBank}</span>
						<i className="fa-solid fa-check"></i>
					</div>
				)}
			</div>
			{/* {chooseBank !== "" && listBank && listBank.metadata.length > 0 && ( */}
			<div
				className={`${
					orderAddress_Payment_Discount.paymentMethod == "VNPAY" && chooseBank !== ""
						? "h-[32dvh] opacity-100 translate-y-0"
						: "h-0 opacity-0 -translate-y-3"
				} grid grid-cols-3 duration-500 ease-in-out gap-2 overflow-y-scroll text-zinc-500 overflow-hidden`}
			>
				{listBank &&
					listBank.metadata.length > 0 &&
					listBank.metadata.map((e: any, index: number) => (
						<div
							key={index}
							onClick={() => setChooseBank(e.bank_name)}
							className={`h-[10dvh] ${
								chooseBank == e.bank_name && "border-black"
							} flex flex-col justify-center items-center p-2 text-center rounded-md shadow-md border cursor-pointer`}
						>
							{e.logo_link ? (
								<img src={e.logo_link} className="max-w-40 max-h-10" alt="" />
							) : (
								<i className="fa-solid fa-building-columns mr-2 text-[16px]"></i>
							)}
							<span className="text-[12px] font-[500]">{e.bank_name}</span>
						</div>
					))}
			</div>
			{/* )} */}
		</div>
	);
};

export default Payment;
