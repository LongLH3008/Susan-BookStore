import { useToast } from "@/common/hooks/useToast";
import {
  DiscountApplyTo,
  DiscountType,
  IVoucher,
} from "@/common/interfaces/voucher";
import { voucherValidate } from "@/common/schemas/voucher";
import CustomFloatingField from "@/components/(website)/floatingfield/CustomFloatingField";
import { voucherService } from "@/services/voucher.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
type Props = {};

const DiscountAdd = (props: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [voucherType, setVoucherType] = useState("");
  const [voucherApplies, setVoucherApplies] = useState("");

  const changeType = (e: any) => {
    console.log(e.target.value);
    setVoucherType(e.target.value);
  };

  const changeApplies = (e: any) => {
    console.log(e.target.value);
    setVoucherApplies(e.target.value);
  };

  const resetForm = () => {
    reset();
    setVoucherApplies("");
    setVoucherType("");
  };

  const {
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IVoucher>({ resolver: joiResolver(voucherValidate) });

  const { onAction: createVoucher } = voucherService({
    action: "CREATE",
    onSuccess: (data: any) =>
      toast({ variant: data.status, content: "Tạo mới voucher thành công" }),
    onError: (err: any) => toast({ variant: err.status, content: err.message }),
  });

  return (
    <form
      onSubmit={handleSubmit(createVoucher)}
      className="text-zinc-700 h-full flex flex-col justify-between"
    >
      <div className="p-5 flex justify-between items-center bg-white shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-ticket"></i>
          <h2 className={`text-xl font-[500]`}>Thêm mã giảm giá</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="reset"
            className="size-10 border border-zinc-500 grid place-items-center rounded-md text-lg hover:scale-110 duration-200"
          >
            <VscDebugRestart />
          </button>
          <button
            type="submit"
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
          type="number"
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
            className={`focus:border-zinc-400 ring-0 rounded-md border-zinc-300 text-sm *:text-sm *:py-2`}
            {...register("discount_is_active")}
          >
            <option value={true} defaultChecked>
              Hoạt động
            </option>
            <option value={false}>Không hoạt động</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="discount_type" className="flex items-center gap-1">
            Loại mã khuyển mại
            <span className="text-sm text-red-500">*</span>
          </label>
          <select
            className={`focus:border-zinc-400 ring-0 rounded-md
						${
              errors.discount_type ? "border-red-500" : "border-zinc-300"
            }  text-sm *:text-sm *:py-2`}
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
          error={voucherType == "percentage" && errors.discount_value}
          field="discount_value"
          message={errors.discount_value?.message}
          disabled={voucherType !== "percentage"}
        />
        <CustomFloatingField
          rounded
          required
          type="number"
          label="Giá trị tối đa"
          placeholder="Nhập giá trị tối đa"
          register={register}
          error={voucherType == "fixed_amount" && errors.discount_value}
          field="discount_value"
          message={errors.discount_value?.message}
          disabled={voucherType !== "fixed_amount"}
        />
        <div className="flex flex-col gap-1 relative">
          <label
            htmlFor="discount_applies_to"
            className="flex items-center gap-1"
          >
            Áp dụng
            <span className="text-sm text-red-500">*</span>
          </label>
          <select
            className={`focus:border-zinc-400 ring-0 rounded-md
						${
              errors.discount_applies_to ? "border-red-500" : "border-zinc-300"
            }  text-sm *:text-sm *:py-2`}
            {...register("discount_applies_to")}
            defaultValue={""}
            onChange={() => changeApplies(event)}
          >
            <option value="" defaultChecked>
              Chọn loại
            </option>
            <option value={DiscountApplyTo.all}>Tất cả</option>
            <option value={DiscountApplyTo.category}>Danh mục</option>
            <option value={DiscountApplyTo.specific}>Sản phẩm</option>
          </select>
          <p
            className={`${
              errors.discount_applies_to ? "block" : "hidden"
            } text-red-500 -bottom-5 absolute left-0 text-[12px]`}
          >
            {errors.discount_applies_to?.message}
          </p>
        </div>
        <div className="flex items-center col-span-2">
          {voucherApplies !== DiscountApplyTo.category ? (
            <CustomFloatingField
              rounded
              required
              type="number"
              label="Áp dụng cho sản phẩm"
              placeholder={
                voucherApplies == "all"
                  ? "Tất cả sản phẩm"
                  : "Chọn các sản phẩm áp dụng"
              }
              register={register}
              error={errors.discount_product_ids as any}
              field="discount_product_ids"
              message={errors.discount_product_ids?.message}
              disabled={voucherApplies !== "specific"}
            />
          ) : (
            <CustomFloatingField
              rounded
              required
              type="number"
              label="Áp dụng cho danh mục"
              placeholder="Chọn các danh mục áp dụng"
              register={register}
              error={errors.discount_category_ids as any}
              field="discount_category_ids"
              message={errors.discount_category_ids?.message}
            />
          )}
          <p
            className={`${
              errors.discount_value ? "block" : "hidden"
            } text-red-500 -bottom-5 absolute left-0 text-[12px]`}
          >
            {errors.discount_value?.message}
          </p>
        </div>

        <CustomFloatingField
          rounded
          required
          type="number"
          label="Giá trị đơn hàng tối thiểu"
          placeholder="Nhập giá trị đơn hàng"
          register={register}
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
          <p
            className={`${
              errors.discount_end_date || errors.discount_start_date
                ? "block"
                : "hidden"
            } text-red-500 -bottom-5 absolute left-0 text-[12px]`}
          >
            {errors.discount_end_date
              ? errors.discount_end_date?.message
              : errors.discount_start_date?.message}
          </p>
        </div>

        <div className="col-span-3 flex flex-col gap-1">
          <label
            htmlFor="discount_description"
            className="flex items-center gap-1"
          >
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

export default DiscountAdd;
