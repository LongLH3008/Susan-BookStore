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

	const [isError, setError] = useState(false);

	const { data: city } = useQuery({
		queryKey: ["city"],
		queryFn: async () => await getAllCity(),
	});

	const getDistrict = async (province_id: number) => {
		if (isError) setError(false);
		const { data } = await getAllDistrict(province_id);
		const province = city.data.find((item: any) => item.ProvinceID == province_id);
		form.setValue("province", province.ProvinceName);
		form.resetField("district");
		form.resetField("districtId");
		form.resetField("ward");
		form.resetField("wardCode");
		setLocationInfo({ ward: [], district: data });
		form.trigger("city");
		setOrder_A_P_D({ ...orderAddress_Payment_Discount, chooseAddress: "" });
		setcheckingOrder({
			...checkingOrder,
			feeShip: 0,
			total: checkingOrder.subtotal - checkingOrder.discountAmount - checkingOrder.discountAmountVoucher,
		});
	};

	const getWard = async (district_id: number) => {
		if (isError) setError(false);
		const { data } = await getWards(district_id);
		const district = locationInfo.district.find((item: any) => item.DistrictID == district_id);
		form.setValue("district", district.DistrictName);
		form.resetField("ward");
		form.resetField("wardCode");
		setLocationInfo({ ...locationInfo, ward: data });
		form.trigger("district");
	};

	const chooseWard = async (wardCode: string) => {
		if (isError) setError(false);
		const ward = locationInfo.ward.find((item: any) => item.WardCode == wardCode.toString());
		form.setValue("ward", ward.WardName);
		form.trigger("ward");

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
			<div className="grid grid-cols-3 gap-3">
				<div className="relative flex flex-col gap-1">
					{orderAddress_Payment_Discount.chooseAddress == "" ? (
						<select
							defaultValue=""
							aria-placeholder="Chọn"
							onChange={(e) =>
								orderAddress_Payment_Discount.chooseAddress == "" &&
								getDistrict(e.target.value as any)
							}
							className="block rounded-md border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
						>
							{city &&
								city.data.map((item: any, index: number) => (
									<option key={index} value={item.ProvinceID}>
										{item.ProvinceName}
									</option>
								))}
							<option value="" defaultChecked>
								Chọn
							</option>
						</select>
					) : (
						<div className="block rounded-md border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer border">
							{form.getValues("province")}
						</div>
					)}
					<label
						htmlFor="country"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
					>
						Tỉnh / thành phố
					</label>
					<span className="text-[12px] text-red-600">
						{form.formState.errors.province?.message}
					</span>
				</div>
				<div className="relative flex flex-col gap-1">
					{orderAddress_Payment_Discount.chooseAddress == "" ? (
						<select
							defaultValue=""
							aria-placeholder="Chọn"
							{...form.register("districtId")}
							onChange={(e) =>
								orderAddress_Payment_Discount.chooseAddress == "" &&
								getWard(e.target.value as any)
							}
							className="block rounded-md border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
						>
							<option value="" defaultChecked>
								Chọn
							</option>
							{locationInfo.district.length > 0 &&
								locationInfo.district.map((item: any, index: number) => (
									<option key={index} value={item.DistrictID}>
										{item.DistrictName}
									</option>
								))}
						</select>
					) : (
						<div className="block rounded-md border border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer">
							{form.getValues("district")}
						</div>
					)}
					<label
						htmlFor="country"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
					>
						Quận / huyện
					</label>
					<span className="text-[12px] text-red-600">
						{form.formState.errors.district?.message}
					</span>
				</div>
				<div className="relative flex flex-col gap-1">
					{orderAddress_Payment_Discount.chooseAddress == "" ? (
						<select
							defaultValue=""
							aria-placeholder="Chọn"
							{...form.register("wardCode")}
							onChange={(e) =>
								orderAddress_Payment_Discount.chooseAddress == "" &&
								chooseWard(e.target.value.toString() as any)
							}
							className="block rounded-md border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
						>
							{locationInfo.ward.length > 0 &&
								locationInfo.ward.map((item: any, index: number) => (
									<option key={index} value={item.WardCode}>
										{item.WardName}
									</option>
								))}
							<option value="" defaultChecked>
								Chọn
							</option>
						</select>
					) : (
						<div className="block border rounded-md border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer">
							{form.getValues("ward")}
						</div>
					)}
					<label
						htmlFor="country"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
					>
						Phường / xã
					</label>
					<span className="text-[12px] text-red-600">{form.formState.errors.ward?.message}</span>
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
