import { CheckoutContext } from "@/common/context/ContextCheckout";
import { getUserAddress } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { MdLocationPin } from "react-icons/md";
import { AddAddress } from "../../account-detail/address/_components/AddAddress";
import { UpdateAddress } from "../../account-detail/address/_components/UpdateAddress";

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

	// useEffect(() => {
	// 	chooseAddress(data?.metadata?.data[0]);
	// 	console.log(data?.metadata?.data[0]);
	// }, []);

	const { data } = useQuery({
		queryKey: ["userAddress"],
		queryFn: async () => await getUserAddress({ user_id }),
	});

	const chooseAddress = async (item: any) => {
		setOrder_A_P_D({ ...orderAddress_Payment_Discount, chooseAddress: renderAddress(item) });
		const splitDistrict = item?.district.split("/");
		const splitWard = item?.ward.split("/");
		form.setValue("address", item?.address);
		form.setValue("district", splitDistrict[0].trim());
		form.setValue("districtId", splitDistrict[1].trim());
		form.setValue("ward", splitWard[0].trim());
		form.setValue("wardCode", splitWard[1].trim());
		form.setValue("province", item?.province.split("/")[0].trim());
		form.setValue("phone", item?.phone);

		const to_district_id = form.getValues("districtId");

		if (to_district_id !== "") {
			const items = cart.map((item: ICart) => ({
				bookId: item?.product_id,
				quantity: item?.product_quantity,
			}));
			setTimeout(async () => {
				await calcFeeShip({ items, to_district_id: Number(splitDistrict[1].trim()) });
			}, 300);
		}

		form.trigger();
	};

	const reset = () => {
		form.resetField("phone");
		form.resetField("address");
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
		return `SĐT: ${item?.phone} / ${item?.address}, ${item?.ward.split("/")[0].trim()}, ${item?.district
			.split("/")[0]
			.trim()}, ${item?.province.split("/")[0].trim()}`;
	};

	return (
		<div className="relative flex flex-col gap-4 group">
			<div className="flex justify-between items-center">
				<p className="text-[16px] font-semibold">Địa chỉ của bạn</p>
				{data?.metadata?.data && data?.metadata?.data.length < 5 && (
					<AddAddress
						trigger={
							<button
								type="button"
								className={`flex gap-1 hover:underline text-[12px] items-center border-0`}
							>
								Thêm đia chỉ
							</button>
						}
					/>
				)}
			</div>
			<div className="flex z-10 items-center justify-between px-3 border border-zinc-300 rounded">
				<label className="w-full cursor-pointer flex items-center p-4 pl-0 ms-2 text-sm font-medium text-gray-900">
					<MdLocationPin className="max-sm:hidden text-xl mr-3" />
					<span className="text-justify">
						{orderAddress_Payment_Discount.chooseAddress !== ""
							? orderAddress_Payment_Discount.chooseAddress
							: "Chọn địa chỉ"}
					</span>
				</label>
				{orderAddress_Payment_Discount.chooseAddress !== "" && (
					<div className="flex flex-col items-end max-sm:gap-5 sm:flex-row sm:items-center">
						<span
							onClick={() => reset()}
							className="text-[#222] z-20 text-[12px] max-sm:order-last underline w-24 sm:mr-3 text-right cursor-pointer"
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
				<div className="flex flex-col *:p-3 *:text-sm text-zinc-500 *:cursor-pointer overflow-hidden overflow-y-scroll">
					{data?.metadata?.data.map((item: any, index: number) => (
						<div
							key={index}
							className={`hover:border-l-[#222] border-l-2 flex gap-1 justify-between border-b last-of-type:border-b-0`}
						>
							<span onClick={() => chooseAddress(item)}>{renderAddress(item)}</span>
							<div className="min-w-[80px] z-10 relative h-fit justify-end flex items-center gap-1">
								<UpdateAddress
									dataAddress={item}
									trigger={
										<span className="text-[12px] hover:underline">
											Cập nhật
										</span>
									}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserAddress;
