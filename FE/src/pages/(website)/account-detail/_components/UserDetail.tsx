import defaultImg from "@/common/assets/img/default.png";
import { userState } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { IUser } from "@/common/interfaces/user";
import CustomFloatingField from "@/components/(website)/floatingfield/CustomFloatingField";
import { instance } from "@/config";
import { getUsers, updateUser } from "@/services/auth.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQueryClient } from "@tanstack/react-query";
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
	const queryClient = useQueryClient();
	const { id } = userState();
	const [user, setUser] = useState<IUser>({} as IUser);
	const [showImg, setShowImg] = useState<string>("");
	const [err, setErr] = useState<string>("");
	const [file, setFile] = useState<FileList | null>(null);
	const { toast } = useToast();

	useEffect(() => {
		(async () => {
			const res = await getUsers(id);
			const user: IUser = res?.metadata;
			setUser(user);
			setValue("user_name", user.user_name);
			setValue("user_birth", user.user_birth);
			setValue("user_gender", user.user_gender);
			setValue("user_avatar", user.user_avatar);
			if (user.user_avatar !== "") {
				setShowImg(user.user_avatar);
			}
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

	const submit = async (data: userUpdate) => {
		console.log("Submitted data:", data);
		console.log(file);

		if (file && file.length > 0) {
			const imagesFormData = new FormData();
			for (const item of file as any) {
				imagesFormData.append("files", item);
			}
			console.log(imagesFormData);

			try {
				const imagesResponse = await instance.post("/upload", imagesFormData);
				setValue("user_avatar", imagesResponse.data.metadata.fileLinks[0]);
			} catch (error) {
				toast({ variant: ToastVariant.ERROR, content: "Cập nhật thất bại, đã có lỗi xảy ra" });
				return;
			}
		}

		try {
			const res = await updateUser({ ...getValues() }, id);
			toast({ variant: ToastVariant.SUCCESS, content: "Cập nhật thành công" });
			queryClient.invalidateQueries({ queryKey: ["userAccount"] });
		} catch (error) {
			toast({ variant: ToastVariant.ERROR, content: "Cập nhật thất bại, đã có lỗi xảy ra" });
		}
	};

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file?.type.match("image/*")) {
			setErr(`File tải lên [ ${file?.name} ] không đúng định dạng`);
			return;
		}
		if (err !== "") setErr("");
		setFile(e.target.files);
		const url = URL.createObjectURL(file as any);
		setShowImg(url);
	};

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-semibold md:text-xl mb-5">Thông tin của bạn</h3>
			<form onSubmit={handleSubmit(submit)}>
				<div className="flex flex-wrap justify-between items-start gap-5 mt-5">
					<div className="flex flex-col justify-center items-center md:w-[30%] gap-5">
						<label
							htmlFor="avatar"
							className="size-36 rounded-full relative cursor-pointer border overflow-hidden grid place-items-center *:w-full *:h-full *:object-cover"
						>
							{showImg !== "" ? (
								<img src={showImg} alt="" />
							) : (
								<img src={defaultImg} className="opacity-50 scale-75" alt="" />
							)}
							<input
								type="file"
								onChange={(e) => changeFile(e)}
								className="opacity-0 size-0 absolute top-0 left-0"
								id="avatar"
							/>
						</label>
						{err !== "" && <span className="text-[12px] text-red-500">{err}</span>}
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
