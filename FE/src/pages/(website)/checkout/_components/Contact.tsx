import { CheckoutContext } from "@/common/context/ContextCheckout";
import { useContext } from "react";
import CustomFloatingField from "../../../../components/(website)/floatingfield/CustomFloatingField";

const Contact = () => {
	const { form, orderAddress_Payment_Discount } = useContext(CheckoutContext);

	return (
		<div className="relative flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<p className="text-[16px] font-semibold">Thông tin liên hệ</p>
			</div>
			<CustomFloatingField
				rounded
				floating
				register={form.register}
				field="name"
				label="Họ và tên"
				required
				error={form.formState.errors.name}
				message={form.formState.errors.name?.message}
			/>
			<CustomFloatingField
				floating
				field="email"
				rounded
				label="Email"
				register={form.register}
				error={form.formState.errors.email}
				message={form.formState.errors.email?.message}
				className="disabled:bg-transparent"
				required
			/>
			<CustomFloatingField
				floating
				field="phone"
				rounded
				label="Số điện thoại của bạn"
				register={form.register}
				error={form.formState.errors.phone}
				message={form.formState.errors.phone?.message}
				disabled={orderAddress_Payment_Discount.chooseAddress !== ""}
				className="disabled:bg-transparent"
				required
			/>
		</div>
	);
};

export default Contact;
