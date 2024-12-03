import { CheckoutContext } from "@/common/context/ContextCheckout";
import { getUserAddress } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { MdLocationPin } from "react-icons/md";

const UserAddress = ({ user_id }: { user_id: string }) => {
	const {
		data: cart,
		form,
		calcFeeShip,
		checkingOrder,
		setcheckingOrder,
		setOrder_A_P_D,
		orderAddress_Payment_Discount,
	} = useContext(CheckoutContext);

	const { data } = useQuery({
		queryKey: ["userAddress"],
		queryFn: async () => await getUserAddress({ user_id }),
	});

	const chooseAddress = async (item: any) => {
		setOrder_A_P_D({ ...orderAddress_Payment_Discount, chooseAddress: renderAddress(item) });
		const splitDistrict = item.district.split("/");
		const splitWard = item.ward.split("/");
		form.setValue("address", item.address);
		form.setValue("district", splitDistrict[0].trim());
		form.setValue("districtId", splitDistrict[1].trim());
		form.setValue("ward", splitWard[0].trim());
		form.setValue("wardCode", splitWard[1].trim());
		form.setValue("province", item.province.split("/")[0].trim());
		form.setValue("phone", item.phone);
		form.trigger();

		const to_district_id = form.getValues("districtId");

		if (to_district_id !== "") {
			const items = cart.map((item: ICart) => ({
				bookId: item.product_id,
				quantity: item.product_quantity,
			}));
			await calcFeeShip({ items, to_district_id: Number(to_district_id) });
		}
	};

	const reset = () => {
		form.resetField("phone");
		form.resetField("province");
		form.resetField("district");
		form.resetField("districtId");
		form.resetField("ward");
		form.resetField("wardCode");
		setOrder_A_P_D({ ...orderAddress_Payment_Discount, chooseAddress: "" });
		setcheckingOrder({
			...checkingOrder,
			feeShip: 0,
			total: checkingOrder.subtotal - checkingOrder.discountAmount - checkingOrder.discountAmountVoucher,
		});
	};

	const renderAddress = (item: any) => {
		return `SĐT: ${item.phone} / ${item.address}, ${item.ward.split("/")[0].trim()}, ${item.district
			.split("/")[0]
			.trim()}, ${item.province.split("/")[0].trim()}`;
	};

	const handleHeight = () => {
		if (data?.metadata?.data.length == 0) return 16;
		if (data?.metadata?.data.length > 3) return 30;
		return data?.metadata?.data.length * 16;
	};

	return (
		<div className="relative flex flex-col gap-4 group">
			<p className="text-[16px] font-semibold">Địa chỉ của bạn</p>
			<div className="flex z-10 items-center justify-between px-3 border border-zinc-300 rounded">
				<label className="w-full cursor-pointer flex items-center p-4 pl-0 ms-2 text-sm font-medium text-gray-900">
					<MdLocationPin className="text-xl mr-3" />
					<span>
						{orderAddress_Payment_Discount.chooseAddress !== ""
							? orderAddress_Payment_Discount.chooseAddress
							: "Chọn địa chỉ"}
					</span>
				</label>
				{orderAddress_Payment_Discount.chooseAddress !== "" && (
					<div className="flex items-center">
						<span
							onClick={() => reset()}
							className="text-[#222] z-20 text-[12px] underline w-24 cursor-pointer"
						>
							Loại bỏ
						</span>
						<i className="fa-solid fa-check"></i>
					</div>
				)}
			</div>
			<div
				className={`group-hover:h-fit
				group-hover:opacity-100 group-hover:translate-y-0 h-0 opacity-0 -translate-y-1
				flex flex-col p-2 min-h-0 max-h-[30dvh] duration-300 ease-in-out pr-[2px] border rounded-md overflow-hidden border-[#222] gap-1`}
			>
				<div className="flex flex-col *:p-3 *:text-sm text-zinc-500 *:cursor-pointer *:border-b overflow-hidden overflow-y-scroll">
					{data?.metadata?.data.map((item: any, index: number) => (
						<div
							key={index}
							onClick={() => chooseAddress(item)}
							className={`hover:border-l-[#222] border-l-2 flex flex-col gap-1 justify-between last-of-type:border-b-0`}
						>
							<span>{renderAddress(item)}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserAddress;
