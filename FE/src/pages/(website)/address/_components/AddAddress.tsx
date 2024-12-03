"use client";

import { userState } from "@/common/hooks/useAuth";
import CustomFloatingField from "@/components/(website)/floatingfield/CustomFloatingField";
import { getAllCity, getAllDistrict, getWards } from "@/services/location.service";
import { createUserAddress } from "@/services/user.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import Joi from "joi";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

type TAddress = {
	address: string;
	province: string;
	district: string;
	ward: string;
	phone: string;
};

const schemaAddress = Joi.object({
	phone: Joi.string().required().pattern(new RegExp(`^(84|0[3|5|7|8|9])[0-9]{8}$`)).messages({
		"any.required": "Số điện thoại bắt buộc",
		"string.empty": "Số điện thoại không được để trống",
		"string.pattern.base": "Số điện thoại không đúng",
	}),
	address: Joi.string().required().messages({
		"any.required": "Địa chỉ bắt buộc",
		"string.empty": "Địa chỉ không được để trống",
	}),
	province: Joi.string().required().messages({
		"any.required": "Chưa chọn tỉnh / thành phố",
		"string.empty": "Chưa chọn tỉnh / thành phố",
	}),
	district: Joi.string().required().messages({
		"any.required": "Chưa chọn quận / huyện",
		"string.empty": "Chưa chọn quận / huyện",
	}),
	ward: Joi.string().required().messages({
		"any.required": "Chưa chọn phường / xã",
		"string.empty": "Chưa chọn phường / xã",
	}),
});

export function AddAddress({ trigger }: { trigger?: ReactNode }) {
	const queryClient = useQueryClient();
	const [openModal, setOpenModal] = useState(false);
	const { id: userId } = userState();
	const [locationInfo, setLocationInfo] = useState<any>({ district: [], ward: [] });
	const [detail, setDetail] = useState({ province: "", district: "", ward: "" });

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

	const form = useForm<TAddress>({
		resolver: joiResolver(schemaAddress),
	});

	const getDistrict = async (item: any) => {
		form.setValue("province", `${item.ProvinceName} / ${item.ProvinceID}`);
		form.resetField("district");
		form.resetField("ward");
		form.trigger("province");
		setDetail({ district: "", province: item.ProvinceName, ward: "" });
		const { data } = await getAllDistrict(item.ProvinceID);
		setLocationInfo({ ward: [], district: data });
	};

	const getWard = async (item: any) => {
		form.setValue("district", `${item.DistrictName} / ${item.DistrictID}`);
		form.resetField("ward");
		const { data } = await getWards(item.DistrictID);
		setLocationInfo({ ...locationInfo, ward: data });
		setDetail({ ...detail, district: item.DistrictName, ward: "" });
		form.trigger("district");
	};

	const chooseWard = async (item: any) => {
		form.setValue("ward", `${item.WardName} / ${item.WardCode}`);
		form.trigger("ward");
		setDetail({ ...detail, ward: item.WardName });
		setLocationInfo({ district: [], ward: [] });
	};

	const submit = async () => {
		const check = form.trigger();
		if (!check) return;
		const payload = {
			...form.getValues(),
			userId,
		};

		const res = await createUserAddress(payload);
		queryClient.invalidateQueries({ queryKey: ["userAddress"], exact: true });
		close();
	};

	const close = () => {
		setOpenModal(false);
		form.reset();
		setDetail({ district: "", province: "", ward: "" });
	};

	return (
		<>
			<div onClick={() => setOpenModal(true)} className="w-fit h-fit border-0">
				{trigger}
			</div>

			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Body className="px-7 py-4 h-fit overflow-visible">
					<form action="" className="py-5 flex flex-col gap-7">
						<h3 className="text-xl font-semibold sm:text-2xl">Thêm địa chỉ mới</h3>
						<CustomFloatingField
							floating
							field="phone"
							rounded
							label="Số điện thoại của bạn"
							register={form.register}
							error={form.formState.errors.phone}
							message={form.formState.errors.phone?.message}
						/>
						<div className="grid sm:grid-cols-3 gap-7 sm:gap-3">
							<div className="relative border h-[6dvh] flex items-center group rounded-md border-zinc-300 p-2">
								<span className="text-[10px] text-zinc-500 absolute top-[2px] left-1">
									Tỉnh / thành phố
								</span>
								<span className="text-sm translate-y-1">
									{detail.province !== "" ? detail.province : "Chọn"}
								</span>
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
								{form.formState.errors.province && (
									<span className="text-[12px] text-red-500 absolute left-0 -bottom-5">
										{form.formState.errors.province.message}
									</span>
								)}
							</div>
							<div className="relative border h-[6dvh] flex items-center group rounded-md border-zinc-300 p-2">
								<span className="text-[10px] text-zinc-500 absolute top-[2px] left-1">
									Quận / huyện
								</span>
								<span className="text-sm translate-y-1">
									{detail.district !== "" ? detail.district : "Chọn"}
								</span>
								{locationInfo.district.length > 0 && (
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
							<div className="relative border h-[6dvh] flex items-center group rounded-md border-zinc-300 p-2">
								<span className="text-[10px] text-zinc-500 absolute top-[2px] left-1">
									Phường / xã
								</span>
								<span className="text-sm translate-y-1">
									{detail.ward !== "" ? detail.ward : "Chọn"}
								</span>
								{locationInfo.ward.length > 0 && (
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
						<CustomFloatingField
							rounded
							floating
							register={form.register}
							field="address"
							label="Địa chỉ chi tiết"
							error={form.formState.errors.address}
							message={form.formState.errors.address?.message}
						/>
						<span
							onClick={form.handleSubmit(submit)}
							className="w-full rounded-md  border text-center py-3 cursor-pointer hover:bg-black hover:text-white"
						>
							Thêm mới
						</span>
					</form>
				</Modal.Body>
				<span
					onClick={() => close()}
					className="absolute top-2 right-2 rounded-md hover:bg-zinc-100 cursor-pointer p-2 flex items-center justify-center"
				>
					<IoMdClose />
				</span>
			</Modal>
		</>
	);
}
