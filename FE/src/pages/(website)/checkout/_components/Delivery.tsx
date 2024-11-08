import CustomFloatingField from "@/components/(website)/floatingfield/CustomFloatingField";
import { useForm } from "react-hook-form";

type Props = {};

const Delivery = (props: Props) => {
	const { register } = useForm();
	return (
		<div className="relative flex flex-col gap-4">
			<p className="text-[16px] font-semibold">Thông tin vận chuyển</p>
			<div className="grid grid-cols-3 gap-3">
				<div className="relative">
					<select className="block rounded-md border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer">
						<option defaultValue="">Chọn</option>
						<option value="US">United States</option>
						<option value="CA">Canada</option>
						<option value="FR">France</option>
						<option value="DE">Germany</option>
					</select>
					<label
						htmlFor="country"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
					>
						Tỉnh / thành phố
					</label>
				</div>
				<div className="relative">
					<select className="block rounded-md border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer">
						<option defaultValue="">Chọn</option>
						<option value="US">United States</option>
						<option value="CA">Canada</option>
						<option value="FR">France</option>
						<option value="DE">Germany</option>
					</select>
					<label
						htmlFor="country"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
					>
						Quận / huyện
					</label>
				</div>
				<div className="relative">
					<select className="block rounded-md border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer">
						<option defaultValue="">Chọn</option>
						<option value="US">United States</option>
						<option value="CA">Canada</option>
						<option value="FR">France</option>
						<option value="DE">Germany</option>
					</select>
					<label
						htmlFor="country"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
					>
						Phường / xã
					</label>
				</div>
			</div>
			<CustomFloatingField
				rounded
				floating
				register={register}
				field="firstname_checkout"
				label="Địa chỉ chi tiết"
				required
				message="Invalid Name"
			/>
		</div>
	);
};

export default Delivery;
