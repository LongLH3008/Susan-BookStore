import { CheckoutContext } from "@/common/context/ContextCheckout";
import CustomFloatingField from "@/components/(website)/floatingfield/CustomFloatingField";
import { getAllCity, getAllDistrict, getWards } from "@/services/location.service";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

const Delivery = () => {
	const {
		form,
		data,
		calcFeeShip,
		orderAddress_Payment_Discount,
		setOrder_A_P_D,
		checkingOrder,
		setcheckingOrder,
	} = useContext(CheckoutContext);

	const [locationInfo, setLocationInfo] = useState<any>({ district: [], ward: [] });
	const [detail, setDetail] = useState({ province: "", district: "", ward: "" });
	const [isError, setError] = useState(false);

	const { data: province } = useQuery({
		queryKey: ["cc"],
		queryFn: async () => {
			const { data } = await getAllCity();
			return sortByKey("ProvinceName", data);
		},
	});

	const sortByKey = (key: string, array: any[]) => {
		const res = array.sort((a: any, b: any) => {
			if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
			if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
			return 0;
		});
		return res;
	};

	const getDistrict = async (item: any) => {
		if (isError) setError(false);
		form.setValue("province", item.ProvinceName);
		form.resetField("district");
		form.resetField("districtId");
		form.resetField("ward");
		form.resetField("wardCode");
		form.trigger("province");
		setDetail({ district: "", province: item.ProvinceName, ward: "" });
		const { data } = await getAllDistrict(item.ProvinceID);
		setLocationInfo({ ward: [], district: data });
		setOrder_A_P_D({ ...orderAddress_Payment_Discount, chooseAddress: "" });
		setcheckingOrder({
			...checkingOrder,
			feeShip: 0,
			total: checkingOrder.subtotal - checkingOrder.discountAmount - checkingOrder.discountAmountVoucher,
		});
	};

	const getWard = async (item: any) => {
		if (isError) setError(false);
		form.setValue("district", item.DistrictName);
		form.setValue("districtId", item.DistrictID);
		form.resetField("ward");
		form.resetField("wardCode");
		const { data } = await getWards(item.DistrictID);
		setLocationInfo({ ...locationInfo, ward: data });
		setDetail({ ...detail, district: item.DistrictName, ward: "" });
		form.trigger("district");
	};

	const chooseWard = async (item: any) => {
		form.setValue("ward", item.WardName);
		form.setValue("wardCode", item.WardCode);
		form.trigger("ward");
		setDetail({ ...detail, ward: item.WardName });
		setLocationInfo({ district: [], ward: [] });

		const to_ward_code = form.getValues("wardCode");
		const to_district_id = form.getValues("districtId");

		if (to_ward_code !== "" && to_district_id !== "") {
			const items = data.map((item: ICart) => ({
				bookId: item.product_id,
				quantity: item.product_quantity,
			}));
			try {
				await calcFeeShip({ items, to_district_id: Number(to_district_id), to_ward_code });
			} catch (error) {
				form.resetField("districtId");
				setError(true);
			}
		}
	};

	return (
		<div className="relative flex flex-col gap-4">
			<input type="hidden" {...form.register("province")} />
			<input type="hidden" {...form.register("district")} />
			<input type="hidden" {...form.register("ward")} />

			<p className="text-[16px] font-semibold">Thông tin vận chuyển</p>
			<div className="flex flex-col sm:grid sm:grid-cols-3 gap-7 sm:gap-3">
				<div className="relative flex flex-col gap-1">
					<div className="relative border h-[6dvh] flex items-center group overflow-hidden hover:overflow-visible rounded-md border-zinc-300 p-2">
						<span className="text-[10px] text-zinc-500 absolute top-[2px] left-1">
							Tỉnh / thành phố
						</span>
						<span className="text-sm translate-y-1">
							{form.getValues("province") ?? "Chọn"}
						</span>
						{orderAddress_Payment_Discount.chooseAddress == "" && (
							<div className="h-0 group-hover:h-[20dvh] group-hover:z-50 w-full bg-white rounded-md border text-zinc-700 -z-50 overflow-y-scroll flex flex-col *:py-[6px] *:px-2 *:text-sm absolute top-[103%] left-0">
								{province &&
									province.length > 0 &&
									province?.map((item: any, index: number) => (
										<span
											className="hover:bg-zinc-100 cursor-pointer"
											key={index}
											onClick={() => getDistrict(item)}
										>
											{item.ProvinceName}
										</span>
									))}
							</div>
						)}
						{form.formState.errors.province && (
							<span className="text-[12px] text-red-500 absolute left-0 -bottom-5">
								{form.formState.errors.province.message}
							</span>
						)}
					</div>
				</div>
				<div className="relative flex flex-col gap-1">
					<div className="relative border h-[6dvh] flex items-center group overflow-hidden hover:overflow-visible rounded-md border-zinc-300 p-2">
						<span className="text-[10px] text-zinc-500 absolute top-[2px] left-1">
							Quận / huyện
						</span>
						<span className="text-sm translate-y-1">
							{form.getValues("district") ?? "Chọn"}
						</span>
						{orderAddress_Payment_Discount.chooseAddress == "" &&
							locationInfo.district.length > 0 && (
								<div className="h-0 group-hover:h-[20dvh] group-hover:z-50 w-full bg-white rounded-md border text-zinc-700 -z-50 overflow-y-scroll flex flex-col *:py-[6px] *:px-2 *:text-sm absolute top-[103%] left-0">
									{sortByKey("DistrictName", locationInfo.district)?.map(
										(item: any, index: number) => (
											<span
												className="hover:bg-zinc-100 cursor-pointer"
												key={index}
												onClick={() => getWard(item)}
											>
												{item.DistrictName}
											</span>
										)
									)}
								</div>
							)}
						{form.formState.errors.district && (
							<span className="text-[12px] text-red-500 absolute left-0 -bottom-5">
								{form.formState.errors.district.message}
							</span>
						)}
					</div>
				</div>
				<div className="relative flex flex-col gap-1">
					<div className="relative border h-[6dvh] flex items-center group overflow-hidden hover:overflow-visible rounded-md border-zinc-300 p-2">
						<span className="text-[10px] text-zinc-500 absolute top-[2px] left-1">
							Phường / xã
						</span>
						<span className="text-sm translate-y-1">{form.getValues("ward") ?? "Chọn"}</span>
						{orderAddress_Payment_Discount.chooseAddress == "" &&
							locationInfo.ward.length > 0 && (
								<div className="h-0 group-hover:h-[20dvh] group-hover:z-50 w-full bg-white rounded-md border text-zinc-700 -z-50 overflow-y-scroll flex flex-col *:py-[6px] *:px-2 *:text-sm absolute top-[103%] left-0">
									{sortByKey("WardName", locationInfo.ward)?.map(
										(item: any, index: number) => (
											<span
												className="hover:bg-zinc-100 cursor-pointer"
												key={index}
												onClick={() => chooseWard(item)}
											>
												{item.WardName}
											</span>
										)
									)}
								</div>
							)}
						{form.formState.errors.ward && (
							<span className="text-[12px] text-red-500 absolute left-0 -bottom-5">
								{form.formState.errors.ward.message}
							</span>
						)}
					</div>
				</div>
				<span className="text-[12px] col-span-3 text-red-600">
					{isError && "Địa chỉ giao hàng chưa được hỗ trợ, vui lòng chon địa chỉ khác"}
				</span>
			</div>
			<CustomFloatingField
				rounded
				floating
				register={form.register}
				field="address"
				label="Địa chỉ chi tiết"
				disabled={orderAddress_Payment_Discount.chooseAddress !== ""}
				required
				className="disabled:bg-transparent"
				error={form.formState.errors.address}
				message={form.formState.errors.address?.message}
			/>
		</div>
	);
};

export default Delivery;
