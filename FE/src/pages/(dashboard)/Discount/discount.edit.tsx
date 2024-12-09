import { useToast } from "@/common/hooks/useToast";
import { DiscountType, IVoucher } from "@/common/interfaces/voucher";
import { voucherValidate } from "@/common/schemas/voucher";
import CustomFloatingField from "@/components/(website)/floatingfield/CustomFloatingField";
import { getDetailVoucher, voucherService } from "@/services/voucher.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";
import HandleChooseCategory from "./_components/handleChooseCategory";
import HandleChooseProducts from "./_components/handleChooseProducts";

const DiscountEdit = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const { id } = useParams();

	const [voucherType, setVoucherType] = useState("");
	const [voucherApplies, setVoucherApplies] = useState<"all" | "category" | "specific">("all");

	const {
		reset,
		setValue,
		resetField,
		getValues,
		trigger,
		formState: { errors },
		register,
	} = useForm<IVoucher>({
		resolver: joiResolver(voucherValidate),
		defaultValues: {
			discount_category_ids: [],
			discount_product_ids: [],
			discount_min_order_value: 0,
		},
	});

	useEffect(() => {
		(async () => {
			const res = await getDetailVoucher(id as string);
			const voucher: IVoucher = res?.metadata[0];
			if (voucher.discount_applies_to !== "all") setVoucherApplies(voucher.discount_applies_to);
			setVoucherType(voucher.discount_type);
			console.log(voucher.discount_start_date);
			reset({
				discount_name: voucher.discount_name,
				discount_code: voucher.discount_code,
				discount_type: voucher.discount_type,
				discount_value: voucher.discount_value,
				discount_applies_to: voucher.discount_applies_to,
				discount_product_ids: voucher.discount_product_ids,
				discount_category_ids: voucher.discount_category_ids,
				discount_stock: voucher.discount_stock,
				discount_min_order_value: voucher.discount_min_order_value,
				discount_description: voucher.discount_description,
				discount_max_use_per_user: voucher.discount_max_use_per_user,
				discount_start_date: new Date(voucher.discount_start_date).toISOString().split("T")[0],
				discount_end_date: new Date(voucher.discount_end_date).toISOString().split("T")[0],
				discount_is_active: voucher.discount_is_active,
			});
		})();
	}, []);

	const changeType = (e: any) => {
		console.log(e.target.value);

		setVoucherType(e.target.value);
	};

	const changeApplies = (e: any) => {
		resetField("discount_product_ids");
		resetField("discount_category_ids");
		if (e.target.value !== "all") {
			setValue("discount_min_order_value", 0);
		}
		console.log(e.target.value);
		setVoucherApplies(e.target.value);
	};

	const resetForm = () => {
		reset();
		setVoucherApplies("all");
		setVoucherType("");
	};

	const { onAction: updateVoucher } = voucherService({
		action: "UPDATE",
		onSuccess: (data: any) => {
			toast({ variant: data.status, content: "Cập nhật voucher thành công" });
			navigate("/quan-tri/ma-giam-gia");
		},
		onError: (err: any) => toast({ variant: err.status, content: err.message }),
	});

	const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setValue("discount_is_active", Number(e.target.value) == 1 ? true : false);
	};

	const submit = async () => {
		const check = await trigger();
		console.log(await trigger(), getValues(), errors);
		setValue("discount_stock", getValues("discount_max_use_per_user"));
		setValue("discount_code", getValues("discount_code").toUpperCase().trim().split(" ").join(""));
		if (!check) return;
		updateVoucher({ ...getValues(), _id: id });
	};

	return (
		<form className="text-zinc-700 h-full flex flex-col justify-between">
			<div className="p-5 flex justify-between items-center bg-white shadow-sm rounded-lg">
				<div className="flex items-center gap-3">
					<i className="fa-solid fa-ticket"></i>
					<h2 className={`text-xl font-[500]`}>Thông tin mã giảm giá</h2>
				</div>
				<div className="flex items-center gap-2">
					<button
						type="reset"
						onClick={() => {
							reset();
							navigate("/quan-tri/ma-giam-gia");
						}}
						className="size-10 border border-zinc-500 grid place-items-center rounded-md text-lg hover:scale-110 duration-200"
					>
						<VscDebugRestart />
					</button>
					<button
						type="button"
						onClick={() => submit()}
						className="size-10 bg-[#00bfc5] hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-md hover:scale-110 duration-200"
					>
						<FaCheck />
					</button>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-7 text-sm p-7 bg-white shadow-md rounded-lg">
				<CustomFloatingField
					rounded
					required
					label="Mã giảm giá"
					placeholder="Nhập mã giảm giá"
					register={register}
					error={errors.discount_code}
					field="discount_code"
					message={errors.discount_code?.message}
				/>
				<CustomFloatingField
					rounded
					required
					label="Tên mã giảm giá"
					placeholder="Nhập tên mã giảm giá"
					register={register}
					error={errors.discount_name}
					field="discount_name"
					message={errors.discount_name?.message}
				/>
				<div className="flex flex-col gap-1 relative">
					<label htmlFor="discount_type" className="flex items-center gap-1">
						Trạng thái
					</label>
					<select
						onChange={(e) => changeStatus(e)}
						defaultValue={getValues("discount_is_active") as any}
						className={`focus:border-zinc-400 ring-0 rounded-md border-zinc-300 text-sm *:text-sm *:py-2`}
					>
						<option value={"true"}>Kích hoạt</option>
						<option value={"false"}>Ngừng kích hoạt</option>
					</select>
				</div>
				<div className="flex flex-col gap-1 relative">
					<label htmlFor="discount_type" className="flex items-center gap-1">
						Loại mã khuyển mại
						<span className="text-sm text-red-500">*</span>
					</label>
					<select
						className={`focus:border-zinc-400 ring-0 rounded-md
						${errors.discount_type ? "border-red-500" : "border-zinc-300"}  text-sm *:text-sm *:py-2`}
						{...register("discount_type")}
						defaultValue={""}
						onChange={() => changeType(event)}
					>
						<option value="" defaultChecked>
							Chọn loại
						</option>
						<option value={DiscountType.fix_amount}>Giá trị tiền</option>
						<option value={DiscountType.percentage}>Phần trăm (%)</option>
					</select>
					<p
						className={`${
							errors.discount_type ? "block" : "hidden"
						} text-red-500 -bottom-5 absolute left-0 text-[12px]`}
					>
						{errors.discount_type?.message}
					</p>
				</div>
				<CustomFloatingField
					rounded
					required
					type="number"
					label="Mức khuyến mại (%)"
					placeholder="Nhập mức khuyến mại"
					register={register}
					className="disabled:text-transparent"
					error={voucherType == "percentage" && errors.discount_value}
					field="discount_value"
					message={voucherType == "percentage" ? errors.discount_value?.message : ""}
					disabled={voucherType !== "percentage"}
				/>
				<CustomFloatingField
					rounded
					required
					type="number"
					label="Giá trị tối đa"
					className="disabled:text-transparent"
					placeholder="Nhập giá trị tối đa"
					register={register}
					error={voucherType == "fixed_amount" && errors.discount_value}
					field="discount_value"
					message={voucherType == "fixed_amount" ? errors.discount_value?.message : ""}
					disabled={voucherType !== "fixed_amount"}
				/>
				<div className="flex flex-col gap-1 relative">
					<label htmlFor="discount_applies_to" className="flex items-center gap-1">
						Áp dụng
						<span className="text-sm text-red-500">*</span>
					</label>
					<select
						className={`focus:border-zinc-400 ring-0 rounded-md
						${errors.discount_applies_to ? "border-red-500" : "border-zinc-300"}  text-sm *:text-sm *:py-2`}
						{...register("discount_applies_to")}
						defaultValue={""}
						onChange={() => changeApplies(event)}
					>
						<option value={"all"} defaultChecked>
							Tất cả
						</option>
						<option value={"category"}>Danh mục</option>
						<option value={"specific"}>Sản phẩm</option>
					</select>
					<span
						className={`${
							errors.discount_applies_to ? "block" : "hidden"
						} text-red-500 -bottom-5 absolute left-0 text-[12px]`}
					>
						{errors.discount_applies_to?.message}
					</span>
				</div>
				<div className="flex *:w-full items-center col-span-2">
					{voucherApplies == "all" && (
						<CustomFloatingField
							rounded
							label="Áp dụng cho tất cả sản phẩm"
							placeholder={"Tất cả sản phẩm"}
							register={register}
							className="disabled:text-transparent"
							field="discount_product_ids"
							disabled
						/>
					)}
					{voucherApplies == "category" && (
						<HandleChooseCategory
							dataCategory={getValues("discount_category_ids")?.[0] as string}
							setValue={setValue}
							errors={errors}
						/>
					)}
					{voucherApplies == "specific" && (
						<HandleChooseProducts
							dataProducts={getValues("discount_product_ids") as string[]}
							setValue={setValue}
							errors={errors}
						/>
					)}

					{/* <span
						className={`${
							errors.discount_value ? "block" : "hidden"
						} text-red-500 -bottom-5 absolute left-0 text-[12px]`}
					>
						{errors.discount_value?.message}
					</span> */}
				</div>

				<CustomFloatingField
					rounded
					required
					type="number"
					label="Giá trị đơn hàng tối thiểu"
					placeholder="Nhập giá trị đơn hàng"
					register={register}
					className="disabled:text-transparent"
					error={errors.discount_min_order_value}
					field="discount_min_order_value"
					message={errors.discount_min_order_value?.message}
				/>
				<CustomFloatingField
					rounded
					required
					type="number"
					label="Số lượng đơn hàng sử dụng tối đa"
					placeholder="Nhập số lượng tối đa đơn hàng"
					register={register}
					error={errors.discount_max_use_per_user}
					field="discount_max_use_per_user"
					message={errors.discount_max_use_per_user?.message}
				/>
				<div className="flex items-center justify-between gap-5 relative">
					<CustomFloatingField
						rounded
						required
						type="date"
						label="Ngày bắt đầu"
						register={register}
						error={errors.discount_start_date}
						field="discount_start_date"
					/>
					<CustomFloatingField
						rounded
						required
						type="date"
						label="Ngày kết thúc"
						register={register}
						error={errors.discount_end_date}
						field="discount_end_date"
					/>
					<span
						className={`${
							errors.discount_end_date || errors.discount_start_date ? "block" : "hidden"
						} text-red-500 -bottom-5 absolute left-0 text-[12px]`}
					>
						{errors.discount_end_date
							? errors.discount_end_date?.message
							: errors.discount_start_date?.message}
					</span>
				</div>

				<div className="col-span-3 flex flex-col gap-1">
					<label htmlFor="discount_description" className="flex items-center gap-1">
						Mô tả
					</label>
					<textarea
						placeholder="Nhập mô tả"
						className="h-[20dvh] w-full rounded-md focus:border-zinc-400 ring-0 border-zinc-300 text-sm *:text-sm *:py-2"
						{...register("discount_description")}
					></textarea>
				</div>
			</div>
		</form>
	);
};

export default DiscountEdit;
