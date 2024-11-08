import { useForm } from "react-hook-form";
import CustomFloatingField from "../../../../components/(website)/floatingfield/CustomFloatingField";

type Props = {};

const Contact = (props: Props) => {
	const { register } = useForm();

	return (
		<div className="relative flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<p className="text-[16px] font-semibold">Thông tin liên hệ</p>
			</div>
			<CustomFloatingField
				rounded
				floating
				register={register}
				field="firstname_checkout"
				label="Họ và tên"
				required
				message="Invalid Name"
			/>
			<CustomFloatingField
				floating
				field="contact_checkout"
				rounded
				label="Email / Số điện thoại của bạn"
				register={register}
				message="Wrong Email"
				required
			/>
			<div className="flex items-center">
				<input
					id="default-checkbox"
					type="checkbox"
					defaultValue=""
					className="w-4 h-4 ring-0 outline-none ring-offset-0 text-zinc-900 border-zinc-900 rounded"
				/>
				<label htmlFor="default-checkbox" className="ms-2 text-sm text-gray-900">
					Nhận thông báo đơn hàng
				</label>
			</div>
		</div>
	);
};

export default Contact;
