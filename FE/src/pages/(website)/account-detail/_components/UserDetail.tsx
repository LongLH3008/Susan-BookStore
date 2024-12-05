import { userState } from "@/common/hooks/useAuth";
import { IUser } from "@/common/interfaces/user";
import CustomFloatingField from "@/components/(website)/floatingfield/CustomFloatingField";
import { getUsers } from "@/services/auth.service";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type userUpdate = {
	user_name: string;
	user_birth: string;
	user_gender: string;
	user_avatar: string;
};

const updateSchema = Joi.object({
	user_name: Joi.string().min(8).max(35).required().messages({
		"string.empty": "Chưa nhập tên người dùng",
		"string.required": "Chưa nhập tên người dùng",
		"string.min": "Tên người dùng giới hạn 8 - 35 kí tự",
		"string.max": "Tên người dùng giới hạn 8 - 35 kí tự",
	}),
	user_birth: Joi.string().required().messages({
		"string.empty": "Chưa nhập ngày sinh",
		"string.required": "Chưa nhập ngày sinh",
	}),
	user_gender: Joi.string().required().messages({
		"string.empty": "Chưa chọn giới tính",
		"string.required": "Chưa chọn giới tính",
	}),
	user_avatar: Joi.string().allow(""), // Thay avatar thành user_avatar
});

const UserDetail = () => {
	const { id } = userState();
	const [user, setUser] = useState<IUser>({} as IUser);

	useEffect(() => {
		(async () => {
			const res = await getUsers(id);
			const user: IUser = res?.metadata;
			setUser(user);
			setValue("user_name", user.user_name);
			setValue("user_gender", user.user_gender);
		})();
	}, []);

	const {
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
		register,
	} = useForm<userUpdate>({
		resolver: joiResolver(updateSchema),
	});

	const submit = (data: userUpdate) => {
		console.log("Submitted data:", data);
	};

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-semibold md:text-xl mb-5">Thông tin của bạn</h3>
			<form onSubmit={handleSubmit(submit)}>
				<div className="flex flex-wrap justify-between items-start gap-5 mt-5">
					<div className="flex flex-col justify-center items-center md:w-[30%] gap-5">
						<label htmlFor="avatar" className="size-36 rounded-full bg-black overflow-hidden">
							<input type="file" className="opacity-0 size-0" id="avatar" />
							<div className="absolute top-0 left-0"></div>
						</label>
						<span className="text-zinc-600 text-sm">{user?.user_email}</span>
					</div>
					<div className="flex flex-col gap-5 md:w-[60%]">
						<CustomFloatingField
							rounded
							required
							field="user_name"
							label="Tên người dùng"
							register={register}
							error={errors.user_name}
							message={errors.user_name?.message}
							floating
						/>
						<CustomFloatingField
							rounded
							required
							type="date"
							field="user_birth"
							label="Ngày sinh"
							register={register}
							error={errors.user_name}
							message={errors.user_name?.message}
							floating
						/>
						<div className="h-fit relative w-full">
							<span className="absolute z-10 left-3 text-zinc-500 top-[2px] text-[12px]">
								Giới tính
							</span>
							<select
								{...register("user_gender")}
								className="pt-[14px] ring-0 rounded-md w-full border-zinc-300 focus:border-zinc-300 relative"
							>
								<option value="" defaultChecked>
									Chọn
								</option>
								<option value="male">Nam</option>
								<option value="femail">Nữ</option>
							</select>
						</div>
					</div>
				</div>
				<div className="w-full flex justify-center items-center">
					<button type="submit" className="px-4 py-2 bg-black text-white mt-5 rounded-sm">
						Cập nhật
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserDetail;
