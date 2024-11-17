import Breadcrumb from "@/components/(website)/breadcrumb/breadcrumb";
import CustomFloatingField from "@/components/(website)/floatingfield/CustomFloatingField";
import { searchOrderByTrackingNumber } from "@/services/order.service";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import OrderItem from "./_components/orderItem";

type Props = {};

const order_schema = Joi.object({
	order_code: Joi.string().min(9).max(9).required().messages({
		"string.empty": "Mã đơn hàng không được để trống",
		"string.required": "Chưa nhập mã đơn hàng",
		"string.min": "Mã đơn hàng không hợp lệ",
		"string.max": "Mã đơn hàng không hợp lệ",
	}),
});

const SearchOrder = (props: Props) => {
	const [order, setOrder] = useState<any>(false);

	const {
		getValues,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: joiResolver(order_schema),
	});

	const searchOrder = async () => {
		try {
			const result = await searchOrderByTrackingNumber(getValues("order_code"));
			console.log(result);
			if (result.metadata.data.length > 0) {
				setOrder(result.metadata.data[0]);
				return;
			}
			setOrder(false);
		} catch (error) {}
	};

	return (
		<>
			<Breadcrumb title="Tra cứu đơn hàng" />
			<section className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[30px] mb-[80px] max-[968px]:pt-[100px] min-[968px]:mb-[100px]">
				<form onSubmit={handleSubmit(searchOrder)} className="flex flex-col w-full col-span-2">
					<div className="h-[70dvh] relative overflow-y-scroll flex flex-col gap-4 pb-5 pr-3">
						<div className="flex justify-between py-2">
							<h3 className="font-semibold text-2xl mb-5">Tra cứu mã đơn hàng</h3>
							<div className="flex items-center w-1/2 gap-2">
								<CustomFloatingField
									rounded
									floating
									register={register}
									field="order_code"
									label="Mã đơn hàng"
									required
									error={errors.order_code as any}
									message={errors.order_code?.message as any}
								/>
								<button
									type="submit"
									className="rounded-md bg-black text-white h-full px-5"
								>
									<i className="fa-solid fa-magnifying-glass"></i>
								</button>
							</div>
						</div>
						{order ? (
							<OrderItem item={order} />
						) : (
							<div className="rounded-md border border-zinc-400 h-[30dvh] flex items-center border-dashed justify-center">
								<span className="text-zinc-500 text-center">
									Không có kết quả tìm thấy
								</span>
							</div>
						)}
					</div>
				</form>
			</section>
		</>
	);
};

export default SearchOrder;
